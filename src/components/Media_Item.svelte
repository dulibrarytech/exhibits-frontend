<script>
    /**
     * Media_Item
     * Responsible for extracting data from the exhibit item and converting it to data for the presentation components
     * 
    */
    import { Resource } from '../libs/resource';
    
    import Image_Viewer from './Image_Viewer.svelte';
    import Audio_Player from './Audio_Player.svelte';
    import Video_Player from './Video_Player.svelte';
    import PDF_Viewer from './PDF_Viewer.svelte';
    import Embed_Iframe_Viewer from './Embed_Iframe_Viewer.svelte';

    import {ITEM_TYPE, VIEWER_TYPE} from '../config/global-constants';

    export let item = {};
    export let args = {};

    let mediaElement;

    var resource;
    var filename;
    var itemType;
    var mimeType;
    var viewerType;
    var caption;

    var filename = null;
    var component = null;

    /* args object for child components */
    var params = {};

    const URL_PATTERN = /^https?:\/\//;

    $: init();

    const init = () => { // init()
        resource = args.media || item.media || null;
        itemType = args.type || item.item_type || null;
        mimeType = args.mimeType || item.mime_type || null;
        caption = args.caption || item.caption || null;
        viewerType = args.viewerType || VIEWER_TYPE.STATIC;

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
        }

        params = {url, caption, isTileImage, imageType};
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
                    height: "600"
                })
            }
            else if(viewerType == VIEWER_TYPE.INTERACTIVE) {
                isTileImage = true;

                // get tile source url */
                url = Resource.getImageTileSourceUrl(filename);
            }
        }
        else {
            url = resource;
        }
        
        params = {url, caption, isTileImage, imageType};
        component = Image_Viewer;
    }

    const renderAudioPlayer = () => {
        let url = resource;
        let embedCode = item.code || null;
        let mimeType = item.mime_type || null;

        params = {url, embedCode, caption, mimeType}; 
        component = Audio_Player;
    }

    const renderVideoPlayer = () => {
        let url = resource;
        let embedCode = item.code || null;
        let mimeType = item.mime_type || null;
        
        params = {url, embedCode, caption, mimeType}; 
        component = Video_Player;
    }

    const renderPdfViewer = () => {
        let url = resource;

        params = {url, caption}; 
        component = PDF_Viewer;
    }

    const renderIframeViewer = () => {
        let url = resource;
        
        params = {url, caption}; 
        component = Embed_Iframe_Viewer;
    }
</script>

{#if component}
    <div class="media-item" bind:this={mediaElement}>
        <svelte:component this={component} args={params} />
    </div>
{:else}
    <h5>Loading...</h5>
{/if}

<style>
    .media-item {
        margin: 0 auto;
    }
</style>