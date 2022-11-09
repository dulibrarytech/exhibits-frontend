<script>
    import { onMount } from 'svelte';
    
    import IIIF_Viewer from './IIIF_Viewer.svelte';
    import Image_Viewer from './Image_Viewer.svelte';
    import Audio_Player from './Audio_Player.svelte';
    import Video_Player from './Video_Player.svelte';
    import PDF_Viewer from './PDF_Viewer.svelte';
    import Embed_Item from './Embed_Item.svelte';

    export let item;

    var mediaElement = null;

    console.log("Media_Item item in:", item)

    const init = () => {
        let type = item.item_type || null;

        switch(type) {
            case "repo":
                mediaElement = IIIF_Viewer;
                break;

            case "image":
                mediaElement = Image_Viewer;
                break;

            case "audio":
                mediaElement = Audio_Player;
                break;

            case "video":
                mediaElement = Video_Player;
                break;

            case "pdf":
                mediaElement = PDF_Viewer;
                break;

            case "external":
                mediaElement = Embed_Item;
                break;
        }

        if(mediaElement) console.log("Selected media element", mediaElement)
        else console.error("Invalid item type, could not determine media element");
    }

    onMount(async () => {
        init();
    });
</script>

<h5>Media Item</h5>

{#if mediaElement}
    <svelte:component this={mediaElement} {item} />
{:else}
    <h3>Loading content...</h3>
{/if}