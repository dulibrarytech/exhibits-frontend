<script>
    /**
     * Media_Item
     * Responsible for extracting data from the exhibit item and converting it to data for the presentation components
    */
    import { onMount } from 'svelte';
    import { Resource } from '../libs/resource';
    
    import Image_Viewer from './Image_Viewer.svelte';
    import Audio_Player from './Audio_Player.svelte';
    import Video_Player from './Video_Player.svelte';
    import PDF_Viewer from './PDF_Viewer.svelte';
    import Embed_Iframe_Viewer from './Embed_Iframe_Viewer.svelte';

    import {ITEM_TYPE} from '../config/global-constants';

    export let item = {}; // data layer
    export let args = {};

    let mediaElement;

    var resource = null;
    var filename = null;
    var mimeType;
    var caption;
    var type = null;
    var component = null;
    var styles = null;

    /* args object for child components */
    var params = {};

    const URL_PATTERN = /^https?:\/\//;

    $: {
        resource = args.url || item.url || null;
        type = args.type || item.item_type || "undefined";
        mimeType = args.mimeType || item.mime_type || null;
        caption = args.caption || item.caption || null;
        styles = item.styles?.item_media || null;

        if(URL_PATTERN.test(resource) == false) {
            filename = resource;
            resource = Resource.getUrl(filename);
        }

        if(!resource) console.error(`Missing path to resource. Item: ${item.uuid}`)
        else render();
    }

    const setTheme = () => {
        for(let style in styles) {
            mediaElement.style[style] = styles[style];  
        }
    }

    const render = () => {
        switch(type) {
            case ITEM_TYPE.IMAGE:
            case ITEM_TYPE.LARGE_IMAGE:
                renderImageViewer();
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
                console.error(`Invalid item type: ${type}`)
                break;
        }
    }

    const renderImageViewer = () => {
        let url = resource;

        params = {url, filename, caption};
        component = Image_Viewer;
    }

    const renderAudioPlayer = () => {
        let url = resource;
        let kalturaId = item.kaltura_id || null;
        let embedCode = item.code || null;
        let mimeType = item.mime_type || null;

        params = {url, kalturaId, embedCode, caption, mimeType}; 
        component = Audio_Player;
    }

    const renderVideoPlayer = () => {
        let url = resource;
        let kalturaId = item.kaltura_id || null;
        let embedCode = item.code || null;
        let mimeType = item.mime_type || null;
        
        params = {url, kalturaId, embedCode, caption, mimeType}; 
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

    onMount(async () => {
        if(styles) setTheme();
    });
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