<script>
    /**
     * @module Image_Viewer
     * 
     * Determines image type, renders an Image_Viewer for a standard image and an image tile viewer (OpenSeadragon) for large images
     */
    import OpenSeadragon_Content from './OpenSeadragon_Content.svelte';

    export let args;

    let {
        url = null,
        title = null,
        caption = null,
        isTileImage = false

    } = args;

    let sourceUrl = null;
    let viewer = null;
    let placeholder = false;
    let altText;

    const HTML_VIEWER = "html";
    const TILE_VIEWER = "openseadragon";

    const render = () => {
        if(!url) console.error("Missing resource url");

        if(isTileImage) {
            viewer = TILE_VIEWER;
        }
        else {
            viewer = HTML_VIEWER;
        }

        altText = title || caption || "Image";
        sourceUrl = url;
    }

    $: render();
</script>

<div class="image-viewer">
    <div class="image">
        {#if sourceUrl}

            {#if viewer == HTML_VIEWER}
                <div class="content">
                    <img src={sourceUrl} alt={altText} title={altText}/>
                </div>

            {:else if viewer == TILE_VIEWER}
                <OpenSeadragon_Content url={sourceUrl} {altText} on:loaded on:load-error />

            {:else}
                <h6>Error</h6>

            {/if}
        {:else if placeholder}
            <img src="/error" alt="error" />
        {:else}
            <h5>Initializing...</h5>
        {/if}
    </div>
</div>

<style>
    .image-viewer, .image, img {
        width: 100%;
        height: 100%;
    }

    .caption {
        font-style: italic;
        font-size: 0.8em;
    }
</style>