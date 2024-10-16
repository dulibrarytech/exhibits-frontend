<script>
    /**
     * Media_Item
     * Responsible for extracting data from the exhibit item and converting it to data for the presentation components
     * 
    */
    import { Resource } from '../libs/resource';
    import {createEventDispatcher} from 'svelte';
    
    import Image_Viewer from './Image_Viewer.svelte';
    import Audio_Player from './Audio_Player.svelte';
    import Video_Player from './Video_Player.svelte';
    import PDFJS_Viewer from './PDFJS_Viewer.svelte';
    import Embed_Iframe_Viewer from './Embed_Iframe_Viewer.svelte';

    import { stripHtmlTags } from '../libs/data_helpers';

    import {ITEM_TYPE, VIEWER_TYPE, MEDIA_POSITION} from '../config/global-constants';

    export let item = {};
    export let args = {};

    const dispatch = createEventDispatcher();

    let mediaElement;

    let resource;
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

    const init = () => { // init()
        filename = null;
        component = null;

        resource = args.media || item.media || null;
        itemType = args.type || item.item_type || null;
        mimeType = args.mimeType || item.mime_type || null;
        title = args.title || item.title || null;
        caption = args.caption || item.caption || null;
        viewerType = args.viewerType || VIEWER_TYPE.STATIC;
        layout = item.layout || null;

        if(title) title = stripHtmlTags(title);

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

        /* If resource value is not a url, it should be a filename with extension (filename.ext) construct the url to the resource using the filename */
        if(URL_PATTERN.test(resource) == false) { // TODO data.helper::isUrlFormat()
            filename = resource;
            resource = Resource.getFileUrl(resource);
        }
        /* else: just pass on the resource url to the viewer */

        if(!resource) console.error(`Missing path or url to resource. Item: ${item.uuid}`)
        else render();
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
                console.error(`Invalid item type: ${itemType}`)
                break;
        }
    }

    const renderStandardImageViewer = () => {
        let url = resource;
        let imageType = itemType;
        let isTileImage = false;

        if(viewerType == VIEWER_TYPE.STATIC) {
            isTileImage = false;
        }
        else if(viewerType == VIEWER_TYPE.INTERACTIVE) {
            if(URL_PATTERN.test(resource) == false) {
                url = Resource.getImageTileSourceUrl(filename);
            }
            isTileImage = true;
            message = "Loading, please wait...";
		    messageDisplay = true;
        }

        params = {url, title, caption, isTileImage, imageType};
        component = Image_Viewer;
    }

    const renderLargeImageViewer = () => {
        let url = null;
        let imageType = itemType;
        let isTileImage = true;

        if(URL_PATTERN.test(resource) == false) {
            if(viewerType == VIEWER_TYPE.STATIC) {
                isTileImage = false;

                /* get jpg derivative to display on the page */
                url = Resource.getImageDerivativeUrl({
                    filename,
                    height: LARGE_IMAGE_PREVIEW_HEIGHT
                })
            }
            else if(viewerType == VIEWER_TYPE.INTERACTIVE) {
                url = Resource.getImageTileSourceUrl(filename);
                isTileImage = true;
                message = "Loading, please wait...";
		        messageDisplay = true;
            }
        }
        else {
            url = resource;
        }
        
        params = {url, title, caption, isTileImage, imageType};
        component = Image_Viewer;
    }

    const renderAudioPlayer = () => {
        let url = resource;
        let embedCode = item.code || null;
        let mimeType = item.mime_type || null;
        let kalturaId = item.kaltura_id || null;
        //let kalturaId = item.is_kaltura_item ? item.media : null;

        params = {url, embedCode, caption, mimeType, kalturaId, ...args}; 
        component = Audio_Player;
    }

    const renderVideoPlayer = () => {
        let url = resource;
        let embedCode = item.code || null;
        let mimeType = item.mime_type || null;
        let kalturaId = item.kaltura_id || null;
        //let kalturaId = item.is_kaltura_item ? item.media : null;
        
        params = {url, embedCode, caption, mimeType, kalturaId, ...args}; 
        component = Video_Player;
    }

    const renderPdfViewer = () => {
        let url = resource;
        let page = item.pdf_open_to_page || null;

        params = {url, caption, page};
        component = PDFJS_Viewer; 
    }

    const renderIframeViewer = () => {
        let url = resource;
        let height = viewerHeight;
        
        params = {url, caption, height}; 
        component = Embed_Iframe_Viewer;
    }

    const onLoadMedia = (event) => {
		messageDisplay = false;
        dispatch('load-media', {});
	}

	const onLoadMediaFail = (event) => {
		message = "Error loading file";
		console.log(`Item viewer error: ${event?.detail?.error || ""}`);
        dispatch('load-media-fail', {});
	}
</script>

{#if component}
    <div class="media-item" bind:this={mediaElement}>
        <svelte:component this={component} args={params} on:loaded={onLoadMedia} on:load-error={onLoadMediaFail} height={viewerHeight}/>
    
        <div class="message" style="display: {messageDisplay ? "block" : "none"}" >
            <div class="message-text">{message}</div>
        </div>
    </div>
{:else}
    <h5>Loading media item...</h5>
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
        font-size: 1.4em;
		width:100%;
    }
</style>