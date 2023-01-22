<script>
    /**
     * @module Image_Viewer
     * 
     * Determines image type, renders an Image_Viewer for a standard image and an image tile viewer (OpenSeadragon) for large images
     * 
     * Currently no OpenSeadragon viewing of remote tiff images. Only local images can be served as tiled images due to functionality of tile server (Cantaloupe)
     */
    import { onMount } from 'svelte';
    import { Configuration } from '../config/config';
    import OpenSeadragon_Content from './OpenSeadragon_Content.svelte';

    export let args;

    console.log("Image viewer data in:", args)

    let {
        url = "",
        imageType = "standard",
        caption = ""

    } = args;

    let sourceUrl = null;
    let viewer = "html";
    let placeholder = false;
    let altText = "Image";

    const URL_PATTERN = /^https?:\/\//;

    const render = () => {
        /* Get the source url for the image based on the image type and url format. */
        /* Use the openseadragon viewer for large files present in resource storage */
        if(imageType == "standard") {
            if(URL_PATTERN.test(url) == false) {
                sourceUrl = getImageFilePath(url);
            }
            else sourceUrl = url;
        }
        else if(imageType == "large") {
            if(URL_PATTERN.test(url) == false) {
                sourceUrl = getImageServerUrl(url);
                viewer = "openseadragon";
            }
            else sourceUrl = url;
        }
        else {
            placeholder = true;
            console.error(`Invalid image type: ${type} Resource: ${url}`);
        }

        if(caption) altText = caption;
    }

    const getImageFilePath = (filename) => {
        return `${Configuration.resourceLocation}/${filename}`;
    }

    const getImageServerUrl = (filename) => {
        return `${Configuration.imageServerUrl}/iiif/2/${filename}/info.json`;
    }

    onMount(async () => {
        render();
    });
</script>

<div class="image-viewer">
    <h6>Image viewer</h6>
    <div class="image">
        {#if sourceUrl}
            {#if viewer == "standard"}
                <div class="content">
                    <img src={sourceUrl} alt={altText} title={altText}/>
                    <span class="caption">{caption}</span>
                </div>
            {:else if viewer == "openseadragon"}
                <OpenSeadragon_Content url={sourceUrl} {altText}/>
            {:else}
                <h6>Error</h6>>
            {/if}
        {:else if placeholder}
            <img src="/error" />
        {:else}
            <h5>Loading image content...</h5>
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