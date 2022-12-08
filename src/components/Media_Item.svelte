<script>
    import { onMount } from 'svelte';
    
    import Image_Viewer from './Image_Viewer.svelte';
    import Audio_Player from './Audio_Player.svelte';
    import Video_Player from './Video_Player.svelte';
    import PDF_Viewer from './PDF_Viewer.svelte';
    import IIIF_Viewer from './IIIF_Viewer.svelte';
    import Embed_Iframe_Item from './Embed_Iframe_Item.svelte'; // Uses "url" value

    export let data = {};
    export let type = null;
    export let url = null;

    let args = {};

    var component = null;
    console.log("Media_Item data in:", data, type)

    const init = () => {
        type = data.is_iiif ? "iiif" : type || data.item_type || "undefined";
        // type = data.is_iiif ? "iiif" : type || media_helper.getItemType(data); <-- IF item_type is image, use large_image if file ext is tif (use settings for assnmt) RET null if type cant be determined
        // OR type = getItemType(data) // import from helper

        switch(type) {
            case "image":
                component = Image_Viewer; // In-component Determine src url: if "image" field construct uri to storage, if "url" field, use uri provided
                args = ({url, image, caption} = data);
                break;

            case "audio":
                component = Audio_Player; // f(): "url"->use [Audio_Player]<audio> html element src=url; "code"->use [Embed_Code_Item]; "kaltura_id" use [Kaltura_Player]
                // url = ? Set here? Would req more logic. Or, set global in above f()
                break;

            case "video":
                component = Video_Player; // <-- * Just return component here, and add logic within component? (simplify/consolidate tasks to related component)
                break;

            case "pdf":
                component = PDF_Viewer;
                break;

            case "external":
                component = Embed_Iframe_Item;
                break;

            case "iiif":
                component = IIIF_Viewer;
                break;

            default:
                console.error(`Invalid item type: ${type}`)
                break;
        }
    }

    onMount(async () => {
        init();
    });
</script>

<h5>Media Item</h5>

{#if component}
    <svelte:component this={component} {args} />
{:else}
    <h3>Loading content...</h3>
{/if}