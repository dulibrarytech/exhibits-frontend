<script>
    /**
     * Media_Item
     * Responsible for extracting data from the exhibit item and converting it to data for the presentation components
    */
    import { onMount } from 'svelte';
    import { Configuration } from '../config/config';
    import { Settings } from '../config/settings.js';
    
    import Image_Viewer from './Image_Viewer.svelte';
    import Audio_Player from './Audio_Player.svelte';
    import Video_Player from './Video_Player.svelte';
    import PDF_Viewer from './PDF_Viewer.svelte';
    import Embed_Iframe_Viewer from './Embed_Iframe_Viewer.svelte';

    export let item = {}; // data layer
    export let args = {};

    var resource = null;
    var filename = null;
    var mimeType;
    var caption;
    var type = null;
    var component = null;

    /* args object for child components */
    var params = {};

    let {itemTypes} = Settings;

    const URL_PATTERN = /^https?:\/\//;

    console.log("Media_Item data in:", item, type)

    $: {
        resource = args.url || item.url || null;
        type = args.type || item.item_type || "undefined";
        mimeType = args.mimeType || item.mime_type || null;
        caption = args.caption || item.caption || null;

        if(URL_PATTERN.test(resource) == false) {
            filename = resource;
            resource = `${Configuration.resourceLocation}/${resource}` // filename
        }

        if(!resource) console.error(`Missing path to resource. Item: ${item.uuid}`)
        else render();
    }

    const render = () => {
        switch(type) {
            case itemTypes.IMAGE:
            case itemTypes.LARGE_IMAGE:
                renderImageViewer();
                break;

            case itemTypes.AUDIO:
                renderAudioPlayer();
                break;

            case itemTypes.VIDEO:
                renderVideoPlayer();
                break;

            case itemTypes.PDF:
                renderPdfViewer();
                break;

            case itemTypes.EXTERNAL_SOURCE:
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
</script>

{#if component}
    <div class="item">
        <svelte:component this={component} args={params} />
    </div>
{:else}
    <h5>Loading...</h5>
{/if}