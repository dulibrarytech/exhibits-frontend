<script>
    /**
     * Media_Item
     * Responsible for extracting data from the exhibit item and converting it to data for the presentation components
     * 
    */
    import { createEventDispatcher } from 'svelte';
    import ResourceUrl from '../libs/ResourceUrl.js';
    import * as Logger from '../libs/logger.js';

    import Image_Viewer from './Image_Viewer.svelte';
    import Audio_Player from './Audio_Player.svelte';
    import Video_Player from './Video_Player.svelte';
    import PDFJS_Viewer from './PDFJS_Viewer.svelte';
    import Embed_Iframe_Viewer from './Embed_Iframe_Viewer.svelte';

    import { stripHtmlTags } from '../libs/data_helpers';
    import {ITEM_TYPE, VIEWER_TYPE, MEDIA_POSITION} from '../config/global-constants';

    export let item = {};
    export let args = {};

    const RESOURCE = new ResourceUrl(item.is_member_of_exhibit);
    // const RESOURCE = new ResourceUrl(Cache.getExhibitId());

    const dispatch = createEventDispatcher();

    let mediaElement;

    let media;
    let itemType;
    let mimeType;
    let viewerType;
    let viewerHeight;
    let title;
    let caption;
    let layout;

    var filename;
    var component;
    var message;
	var messageDisplay;

    /* args object for child components */
    var params = {};

    const URL_PATTERN = /^https?:\/\//;
    const LARGE_IMAGE_PREVIEW_HEIGHT = "600";
    const VIEWER_HEIGHT_SMALL = "350";
    const VIEWER_HEIGHT_LARGE = "700";

    $: init();

    const init = () => {
        filename = null;
        component = null;

        media = args.media || item.media || null;
        itemType = args.type || item.item_type || null;
        mimeType = args.mimeType || item.mime_type || null;
        title = args.title || item.title || null;
        caption = args.caption || item.caption || null;
        viewerType = args.viewerType || VIEWER_TYPE.STATIC;
        layout = item.layout || null;

        if(title) title = stripHtmlTags(title);

        if(!itemType && item.is_kaltura_item) {
            itemType = ITEM_TYPE.VIDEO;
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

        if(!media) {
            Logger.module().error(`Missing path or url to resource. Item: ${item.uuid}`);
        }

        /* If resource value is not a url, it should be a filename with extension (filename.ext) construct the url to the resource using the filename */
        else if(URL_PATTERN.test(media) == false) { // TODO data.helper::isUrlFormat()
            filename = media;
            media = RESOURCE.getFileUrl(media);
            render();
        }
        else {
            render();
        }
    }

    const render = () => {
        switch(itemType) {
            case ITEM_TYPE.IMAGE:
                renderStandardImageViewer();
                break;

            case ITEM_TYPE.LARGE_IMAGE:
                renderLargeImageViewer();
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

    const renderStandardImageViewer = () => {
        let url = media;
        let imageType = itemType;
        let isTileImage = false;

        if(viewerType == VIEWER_TYPE.STATIC) {
            isTileImage = false;
        }
        else if(viewerType == VIEWER_TYPE.INTERACTIVE) {
            if(URL_PATTERN.test(url) == false) {
                url = RESOURCE.getImageTileSourceUrl(filename);
            }
            isTileImage = true;
            message = "Loading, please wait...";
		    messageDisplay = true;
        }

        params = {url, title, caption, isTileImage, imageType};
        component = Image_Viewer;
    }

    const renderLargeImageViewer = () => {
        let url = media;
        let imageType = itemType;
        let isTileImage = true;

        if(URL_PATTERN.test(url) == false) {
            if(viewerType == VIEWER_TYPE.STATIC) {
                isTileImage = false;

                /* get jpg derivative to display on the page */
                url = RESOURCE.getImageDerivativeUrl(filename, {
                    height: LARGE_IMAGE_PREVIEW_HEIGHT
                })
            }
            else if(viewerType == VIEWER_TYPE.INTERACTIVE) {
                url = RESOURCE.getImageTileSourceUrl(filename);
                isTileImage = true;
                message = "Loading, please wait...";
		        messageDisplay = true;
            }
        }
        
        params = {url, title, caption, isTileImage, imageType};
        component = Image_Viewer;
    }

    const renderAudioPlayer = () => {
        let url = media;
        let embedCode = item.code || null;
        let mimeType = item.mime_type || null;
        let kalturaId = item.is_kaltura_item ? item.media : null;
        let thumbnailImage = item.thumbnail ? RESOURCE.getFileUrl(item.thumbnail) : null;

        params = {url, embedCode, caption, mimeType, kalturaId, thumbnailImage, ...args}; 
        component = Audio_Player;
    }

    const renderVideoPlayer = () => {
        let url = media;
        let embedCode = item.code || null;
        let mimeType = item.mime_type || null;
        let kalturaId = item.is_kaltura_item ? item.media : null;
        let thumbnailImage = item.thumbnail ? RESOURCE.getFileUrl(item.thumbnail) : null;
        
        params = {url, embedCode, caption, mimeType, kalturaId, thumbnailImage, ...args}; 
        component = Video_Player;
    }

    const renderPdfViewer = () => {
        let url = media;
        let page = item.pdf_open_to_page || null;

        params = {url, caption, page};
        component = PDFJS_Viewer; 
    }

    const renderIframeViewer = () => {
        let url = media;
        let height = viewerHeight;
        
        params = {url, caption, height}; 
        component = Embed_Iframe_Viewer;
    }

    const onLoadMedia = (event) => {
		messageDisplay = false;
        dispatch('load-media', {});
	}

	const onLoadMediaFail = (event) => {
        mediaElement.style.visibility = "hidden";
		message = "Error loading file";
        Logger.module().error(`Item viewer error: ${event?.detail?.error || ""}`);
        dispatch('load-media-fail', {});
	}
</script>

{#if component}
    <div class="media-item" bind:this={mediaElement}>
        <svelte:component this={component} args={params} on:loaded={onLoadMedia} on:load-error={onLoadMediaFail} height={viewerHeight}/>
    </div>

    <div class="message" style="display: {messageDisplay ? "block" : "none"}" >
        <div class="message-text">{message}</div>
    </div>
{:else}
    <div class="load-message">
        <h5>Loading media item...</h5>
    </div>
{/if}

<style>
    .media-item {
        margin: 0 auto;
    }

    .message {
        text-align: center;
        position: absolute;
        top: 50%;
		left: 0;
		width:100%;
    }
</style>