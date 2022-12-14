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
        //component = Audio_Player; // f(): "url"->use [Audio_Player]<audio> html element src=url; "code"->use [Embed_Code_Item]; "kaltura_id" use [Kaltura_Player]
    }

    const renderVideoPlayer = () => {
        //component = Video_Player; // <-- * Just return component here, and add logic within component? (simplify/consolidate tasks to related component)
    }

    const renderPdfViewer = () => {
        //component = PDF_Viewer;
    }

    const renderIframeViewer = () => {
        //component = Embed_Iframe_Item;
    }

    onMount(async () => {
        init();
    });
</script>

<h5>Media Item</h5>

{#if component}
    <svelte:component this={component} args={data} />
{:else}
    <h5>Loading content...</h5>
{/if}