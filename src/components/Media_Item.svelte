<script>
    /**
     * Media_Item
     * Responsible for extracting data from the exhibit item and converting it to data for the presentation components
     * 
    */
    import { createEventDispatcher } from 'svelte';
    import { Settings } from '../config/settings';
    import ResourceUrl from '../libs/ResourceUrl.js';
    import * as Logger from '../libs/logger.js';

    import Image_Viewer from './Image_Viewer.svelte'; // emit loaded
    import Audio_Player from './Audio_Player.svelte'; // emit loaded (via kaltura)
    import Video_Player from './Video_Player.svelte'; // emit loaded (via kaltura)
    import PDFJS_Viewer from './PDFJS_Viewer.svelte'; // emit loaded
    import IIIF_Viewer from './IIIF_Viewer.svelte';
    import Embed_Iframe_Viewer from './Embed_Iframe_Viewer.svelte';

    import {
        ITEM_TYPE, 
        VIEWER_TYPE, 
        MEDIA_POSITION
    } from '../config/global-constants';

    export let item = {};
    export let args = {};

    const dispatch = createEventDispatcher();

    const RESOURCE = new ResourceUrl(item.is_member_of_exhibit);

    const DEFAULT_ITEM_TITLE = Settings.exhibitItemDefaultTitle;
    const LOAD_MESSAGE = "Loading media...";

    // component options
    const URL_PATTERN = /^https?:\/\//;
    const LARGE_IMAGE_PREVIEW_HEIGHT = "600";
    const VIEWER_HEIGHT_SMALL = "350";
    const VIEWER_HEIGHT_LARGE = "700";

    // args
    let viewerType;
    let viewerHeight;

    const {
        item_type: itemType = null,
        title: title = DEFAULT_ITEM_TITLE,
        alt_text: altText = null,
        caption: caption = null,
        layout: layout = null,
        is_embedded: isEmbedded = false,
        media_iiif: mediaIIIF = null,
    } = item;

    let {
        media: media = null,
        thumbnail: thumbnail = null,
    } = item;

    // module variables
    var _mediaElement;
    var _filename;
    var _component;
    var _message;
	var _messageDisplay;

    // args object for child components 
    var params = {};
        
    $: init();

    const init = () => {
        Logger.module().info(`Initializing media item component. Item: ${item.uuid}`);

        // module variables
        _filename = null;
        _component = null;
        _message = LOAD_MESSAGE;
		_messageDisplay = true;

        // always use a static viewer (not interactive, such as tile or iiif) for embedded items on the page
        if(isEmbedded) {
            viewerType = VIEWER_TYPE.STATIC;
        }
        else {
            viewerType = args.viewerType || VIEWER_TYPE.STATIC;
        }

        switch(layout) {
            case MEDIA_POSITION.LEFT:
            case MEDIA_POSITION.RIGHT:
                viewerHeight = VIEWER_HEIGHT_SMALL;
                break;
            
            case MEDIA_POSITION.TOP:
            case MEDIA_POSITION.BOTTOM:
            case MEDIA_POSITION.MEDIA_ONLY:
                viewerHeight = VIEWER_HEIGHT_LARGE;
                break;

            default:
                viewerHeight = VIEWER_HEIGHT_SMALL;
        }

        if(media) {
            if(URL_PATTERN.test(media) == false) {
                _filename = media;
                media = RESOURCE.getFileUrl(media);
            }
        }

        if(thumbnail) {
            if(URL_PATTERN.test(thumbnail) == false) {
                thumbnail = RESOURCE.getFileUrl(thumbnail);
            }
        }

        render();
    }

    const render = () => {
        switch(itemType) {
            case ITEM_TYPE.IMAGE:
                renderStandardImageViewer();
                break;

            case ITEM_TYPE.AUDIO:
                renderAudioPlayer();
                break;

            case ITEM_TYPE.VIDEO:
                renderVideoPlayer();
                break;

            case ITEM_TYPE.PDF:
                renderPdfViewer();
                break;

            case ITEM_TYPE.EXTERNAL_SOURCE:
                renderIframeViewer();
                break;

            default:
                Logger.module().error(`Invalid item type: ${itemType}`);
                break;
        }
    }

    /*
     * static viewer: Image_Viewer: display image file directly without tiles (for small images and embedded media)
     * interactive viewer: Image_Viewer: display image tile viewer (e.g. OpenSeadragon) for large images
     * iiif viewer: IIIF_Viewer (UniversalViewer): display iiif manifest content
     */
    const renderStandardImageViewer = () => {

        let url = media;
        let imageType = itemType;
        let isTileImage = !isEmbedded; // default to set this based on 'isEmbedded' value. The viewerType (component arg) may update the tile image flag.
        let onErrorImage = isEmbedded ? RESOURCE.getItemPlaceholderImageUrl(ITEM_TYPE.IMAGE) : null;

        if(viewerType == VIEWER_TYPE.STATIC) {
            isTileImage = false;

            params = {url, title, altText, caption, isTileImage, imageType, onErrorImage};
            _component = Image_Viewer;
        }
        else if(viewerType == VIEWER_TYPE.INTERACTIVE) {
            isTileImage = true;

            if(mediaIIIF) {
                const {service_url: serviceUrl = null} = mediaIIIF;

                if(serviceUrl) {
                    url = serviceUrl.indexOf("info.json") == -1 ? `${serviceUrl}/info.json` : serviceUrl;
                }
            }
            else if(URL_PATTERN.test(url) == false) {
                url = RESOURCE.getImageTileSourceUrl(_filename);
            }

            params = {url, title, altText, caption, isTileImage, imageType, onErrorImage};
            _component = Image_Viewer;
        }
        else if(viewerType == VIEWER_TYPE.IIIF) {
            const {manifest_url: manifestUrl = null} = mediaIIIF || {};
            params = {manifestUrl: manifestUrl, type: itemType};
            _component = IIIF_Viewer;
        }
    }

    /* 
     * this function is not in use
     * 
     * static viewer: Image_Viewer: display image derivative (for embedding on page) without tiles (for small images and embedded media)
     * interactive viewer: Image_Viewer: display image tile viewer (e.g. OpenSeadragon) for large images
     * iiif viewer: IIIF_Viewer (UniversalViewer): display iiif manifest content
     */
    const renderLargeImageViewer = () => {

        let url = media;
        let imageType = itemType;
        let isTileImage = !isEmbedded; // default to set this based on 'isEmbedded' value. The viewerType (component arg) may update the tile image flag.
        let onErrorImage = isEmbedded ? RESOURCE.getItemPlaceholderImageUrl(ITEM_TYPE.IMAGE) : null;

        if(URL_PATTERN.test(url) == false) {
            if(viewerType == VIEWER_TYPE.STATIC) {
                isTileImage = false;

                url = RESOURCE.getImageDerivativeUrl(_filename, {
                    height: LARGE_IMAGE_PREVIEW_HEIGHT
                });

                _messageDisplay = false; // on loaded only (IV must emit)
            }
            else if(viewerType == VIEWER_TYPE.INTERACTIVE) {
                isTileImage = true;

                url = RESOURCE.getImageTileSourceUrl(_filename);

                _message = "Loading, please wait...";
		        _messageDisplay = true;  // on loaded only (IV must emit)
            }

            params = {url, title, altText, caption, isTileImage, imageType, onErrorImage};
            _component = Image_Viewer;
        }
        else if(viewerType == VIEWER_TYPE.IIIF) {
            const {manifest_url: manifestUrl = null} = mediaIIIF || {}; 
            params = {manifestUrl, type: itemType};
            _component = IIIF_Viewer;
        }
    }

    /*
     * interactive viewer: Audio_Player: display audio player for audio files * if this is a kaltura item, the Audio_Player will embed a kaltura player 
     * iiif viewer: IIIF_Viewer (UniversalViewer): display iiif manifest content
     */
    const renderAudioPlayer = () => {

        let url = media;
        let embedCode = item.code || null;
        let mimeType = item.mime_type || null;
        let kalturaId = item.is_kaltura_item ? item.kaltura_id || null : null;
        let thumbnailImage = thumbnail;

        if(viewerType == VIEWER_TYPE.IIIF && kalturaId == null) {
            const {manifest_url: manifestUrl = null} = item.media_iiif || {}; 
            params = {manifestUrl};
            _component = IIIF_Viewer;
        }
        else {
            params = {url, embedCode, title, altText, mimeType, kalturaId, thumbnailImage, ...args}; 
            _component = Audio_Player; 
        }
    }

    /*
     * interactive viewer: Video_Player: display video player for video files * if this is a kaltura item, the Video_Player will embed a kaltura player 
     * iiif viewer: IIIF_Viewer (UniversalViewer): display iiif manifest content
     */
    const renderVideoPlayer = () => {

        let url = media;
        let embedCode = item.code || null;
        let mimeType = item.mime_type || null;
        let kalturaId = item.is_kaltura_item ? item.kaltura_id || null : null;
        let thumbnailImage = thumbnail;

        if(viewerType == VIEWER_TYPE.IIIF && kalturaId == null) {
            const {manifest_url: manifestUrl = null} = item.media_iiif || {}; 
            params = {manifestUrl};
            _component = IIIF_Viewer;
        }
        else {
            params = {url, embedCode, title, altText, mimeType, kalturaId, thumbnailImage, ...args}; 
            _component = Video_Player; 
        }
    }

    /*
     * interactive viewer: PDFJS_Viewer: display pdf viewer for pdf files 
     * iiif viewer: IIIF_Viewer (UniversalViewer): display iiif manifest content (pdf_open_to_page parameter can't be used to open to a specific page in universalviewer, not yet implemented)
     */
    const renderPdfViewer = () => {

        let url = media;
        let page = item.pdf_open_to_page || null;

        if(viewerType == VIEWER_TYPE.IIIF) {
            const {manifest_url: manifestUrl = null} = item.media_iiif || {}; 
            params = {manifestUrl, type: itemType, page}; // can UV open to pdf page? If not, maybe just ust the pdf viewer (will use source from manifest if iiif item)
            _component = IIIF_Viewer;
        }
        else {
            _messageDisplay = false;
            params = {url, altText, caption, page};
            _component = PDFJS_Viewer; 
        }
    }

    const renderIframeViewer = () => {
        let url = media;
        let height = viewerHeight;
        
        params = {url, altText, caption, height}; 
        _component = Embed_Iframe_Viewer;
    }

    const onLoadMedia = (event) => {
		_messageDisplay = false;
        dispatch('load-media', {});
	}

	const onLoadError = (event) => {
        _mediaElement.style.visibility = "hidden";
		_message = "Error loading media";
        Logger.module().error(`Item viewer error: ${event?.detail?.error || ""}`);
        dispatch('load-error', {url: media});
	}
</script>

{#if _component}
    <div class="media-item" bind:this={_mediaElement}>
        <svelte:component this={_component} args={params} on:loaded={onLoadMedia} on:load-error={onLoadError} height={viewerHeight}/>
    </div>

    <div class="message" style="display: {_messageDisplay ? "block" : "none"}" >
        <div class="message-text">{_message}</div>
    </div>
{:else}
    <div class="load-message">
        <h5>Loading media...</h5>
    </div>
{/if}

<style>
    .message {
        text-align: center;
        position: absolute;
        top: 50%;
		left: 0;
		width:100%;
        color: #555555;
    }
</style>