<script>
    /**
     * @module Image_Viewer
     * 
     * Determines image type, renders an Image_Viewer for a standard image and an image tile viewer (OpenSeadragon) for large images
     */
    import OpenSeadragon_Content from './OpenSeadragon_Content.svelte';
    import * as Logger from '../libs/logger.js';

    export let args;

    let {
        url = null,
        altText = null,
        isTileImage = false,
        onErrorImage = null

    } = args;

    let sourceUrl = null;
    let viewer = null;

    const HTML_VIEWER = "html";
    const TILE_VIEWER = "openseadragon";

    const render = () => {
        if(!url) Logger.module().error("Missing resource url");

        if(isTileImage) {
            viewer = TILE_VIEWER;
        }
        else {
            viewer = HTML_VIEWER;
        }

        sourceUrl = url;
    }

    const onImageLoadError = (event) => {
        sourceUrl = null;
    }

    $: render();
</script>

<div class="image-viewer">
    <div class="image">
        {#if sourceUrl}

            {#if viewer == HTML_VIEWER}
                <div class="content">
                    <img src={sourceUrl} alt={altText ? altText : undefined} title={altText ? altText : undefined} on:error={onImageLoadError}/>
                </div>

            {:else if viewer == TILE_VIEWER}
                <OpenSeadragon_Content url={sourceUrl} {altText} on:loaded on:load-error />

            {:else}
                <h6>Error</h6>

            {/if}

        {:else}
            <div class="placeholder-image">
                <img src={onErrorImage || "./error"} alt="load error" />
            </div>
        {/if}
    </div>
</div>

<style>
    .image-viewer, .image, img {
        width: 100%;
        height: 100%;
    }
</style>