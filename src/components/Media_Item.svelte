<script>
    /**
     * Media_Item
     * Responsible for extracting data from the exhibit item and converting it to data for the presentation components
    */
    import { onMount } from 'svelte';
    
    import Image_Viewer from './Image_Viewer.svelte';
    import Audio_Player from './Audio_Player.svelte';
    import Video_Player from './Video_Player.svelte';
    import PDF_Viewer from './PDF_Viewer.svelte';
    import Embed_Iframe_Viewer from './Embed_Iframe_Viewer.svelte';

    export let item = {}; // data layer
    export let args = {};

    var url = null;
    var mimeType;
    var caption;
    var type = null;
    var component = null;

    /* args object for child components */
    var params = {};

    console.log("Media_Item data in:", item, type)

    $: {
        if(!url) url = args.url || item.url || "";
        if(!type) type = args.type || item.item_type || "undefined";
        
        mimeType = args.mimeType || item.mime_type || null;
        caption = args.caption || null;

        init();
    }

    const init = () => {
        switch(type) {
            case "image":
                renderImageViewer();
                break;

            case "audio":
                renderAudioPlayer();
                break;

            case "video":
                renderVideoPlayer();
                break;

            case "pdf":
                renderPdfViewer();
                break;

            case "external":
                renderIframeViewer();
                break;

            default:
                console.error(`Invalid item type: ${type}`)
                break;
        }
    }

    const renderImageViewer = () => {
        let url = item.image || url;

        params = {url, caption};
        component = Image_Viewer;
    }

    const renderAudioPlayer = () => {
        let kalturaId = item.kaltura_id || null;
        let embedCode = item.code || null;
        let mimeType = item.mime_type || null;

        params = {url, kalturaId, embedCode, caption, mimeType}; 
        component = Audio_Player;
    }

    const renderVideoPlayer = () => {
        let kalturaId = item.kaltura_id || null;
        let embedCode = item.code || null;
        let mimeType = item.mime_type || null;
        
        params = {url, kalturaId, embedCode, caption, mimeType}; 
        component = Video_Player;
    }

    const renderPdfViewer = () => {
        params = {url, caption}; 
        component = PDF_Viewer;
    }

    const renderIframeViewer = () => {
        params = {url, caption}; 
        component = Embed_Iframe_Viewer;
    }

    onMount(async () => {
        init();
    });
</script>

<h6>Media Item</h6>

{#if component}
    <div class="item">
        <svelte:component this={component} args={params} />
    </div>
{:else}
    <h5>Loading media item...</h5>
{/if}