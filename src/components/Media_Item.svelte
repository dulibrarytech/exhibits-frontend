<script>
    import { onMount } from 'svelte';
    
    import Image_Viewer from './Image_Viewer.svelte';
    import Audio_Player from './Audio_Player.svelte';
    import Video_Player from './Video_Player.svelte';
    import PDF_Viewer from './PDF_Viewer.svelte';
    import Embed_Iframe_Content from './Embed_Iframe_Content.svelte'; // Uses "url" value

    export let item = {}; // data layer
    export let args = {};

    var data = {};
    var url = null;
    var type = null;
    var component = null;

    console.log("Media_Item data in:", item, type)

    $: {
        if(!url) url = args.url || item.url || "";
        if(!type) type = args.type || item.item_type || "undefined";
        init();
    }

    const init = () => {
        switch(type) {
            case "image":
            case "large_image":
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
        let url = item.image || url || item.url || null;
        let caption = item.caption || "";
        
        data = {type, url, caption};
        component = Image_Viewer;
    }

    const renderAudioPlayer = () => {
        let url = url || item.url || null;
        let kalturaId = item.kaltura_id || null;
        let embedCode = item.code || null;
        let caption = item.caption || "";
        
        data = {url, kalturaId, embedCode, caption}; 
        component = Audio_Player;
    }

    const renderVideoPlayer = () => {
        // TODO Get kaltura_id as kalturaId, code as embedCode, url as url, caption as caption from item{} and create data{} for component render

        // let url = url || item.url || null;
        // let kalturaId = item.kaltura_id || null;
        // let embedCode = item.code || null;
        // let caption = item.caption || "";
    }

    const renderPdfViewer = () => {
        // TODO Get url from item{} as url, caption as caption create data{} for component render
    }

    const renderIframeViewer = () => {
        // TODO Get url from item{} as url, caption as caption create data{} for component render
    }

    onMount(async () => {
        init();
    });
</script>

<h5>Media Item</h5>

{#if component}
    <div class="item">
        <svelte:component this={component} args={data} />
    </div>
{:else}
    <h5>Loading media item...</h5>
{/if}