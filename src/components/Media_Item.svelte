<script>
    import { onMount } from 'svelte';
    import { getItemTypeForFileExtension } from '../libs/media_helpers';
    
    import Image_Viewer from './Image_Viewer.svelte';
    import Audio_Player from './Audio_Player.svelte';
    import Video_Player from './Video_Player.svelte';
    import PDF_Viewer from './PDF_Viewer.svelte';
    import Embed_Iframe_Content from './Embed_Iframe_Content.svelte'; // Uses "url" value

    export let item = {}; // data layer
    export let args = {};

    var url = null;
    var type = null;
    var component = null;

    /* args object for child components */
    var params = {};

    console.log("Media_Item data in:", item, type)

    $: {
        if(!url) url = args.url || item.url || "";
        if(!type) type = args.type || item.item_type || "undefined";
        if(!mimeType) mimeType = args.mimeType || item.mime_type || "undefined";
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
        let imageType = getItemTypeForFileExtension(url) == "large_image" ? "large" : "standard";
        let url = item.image || url || item.url || null;
        let caption = item.caption || "";
        
        params = {imageType, url, caption};
        component = Image_Viewer;
    }

    const renderAudioPlayer = () => {
        let url = url || item.url || null;
        let kalturaId = item.kaltura_id || null;
        let embedCode = item.code || null;
        let caption = item.caption || "";
        let mimeType = item.mime_type || null;
        
        params = {url, kalturaId, embedCode, caption, mimeType}; 
        component = Audio_Player;
    }

    const renderVideoPlayer = () => {
        // TODO Get kaltura_id as kalturaId, code as embedCode, url as url, caption as caption from item{} and create params{} for component render

        // let url = url || item.url || null;
        // let kalturaId = item.kaltura_id || null;
        // let embedCode = item.code || null;
        // let caption = item.caption || "";
    }

    const renderPdfViewer = () => {
        // TODO Get url from item{} as url, caption as caption create params{} for component render
    }

    const renderIframeViewer = () => {
        // TODO Get url from item{} as url, caption as caption create params{} for component render
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