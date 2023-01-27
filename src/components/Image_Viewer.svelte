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
        url = null,
        imageType = null,
        caption = ""

    } = args;

    let sourceUrl = null;
    let viewer = HTML_VIEWER;
    let placeholder = false;
    let altText = "Image";

    const URL_PATTERN = /^https?:\/\//;

    const HTML_VIEWER = "html";
    const TILE_VIEWER = "openseadragon";
    const STANDARD_IMAGE = "standard";
    const TILE_IMAGE = "tile";

    const STANDARD_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif"];
    const TILE_IMAGE_EXTENSIONS = ["tif", "tiff"];

    const render = () => {
        if(!url) console.error("Missing resource url");
        else if(!imageType) imageType = getImageType(url || "");

        /* Get the source url for the image based on the image type and url format. */
        if(imageType == STANDARD_IMAGE) {
            if(URL_PATTERN.test(url) == false) {
                sourceUrl = getImageFilePath(url);
            }
            else sourceUrl = url;
        }
        /* Use the Openseadragon viewer for large files */
        else if(imageType == TILE_IMAGE) {
            if(URL_PATTERN.test(url) == false) {
                sourceUrl = getImageServerUrl(url);
                viewer = "openseadragon";
            }
            else sourceUrl = url;
        }
        else {
            placeholder = true;
            console.error(`Invalid image type: ${imageType} Resource url: ${url}`);
        }

        if(caption) altText = caption;
    }

    const getImageFilePath = (filename) => {
        return `${Configuration.resourceLocation}/${filename}`;
    }

    const getImageServerUrl = (filename) => {
        return `${Configuration.imageServerUrl}/iiif/2/${filename}/info.json`;
    }

    const getImageType = (filename) => {
        let type = null;
        
        if(filename.indexOf('.') < 0) console.error(`Image source url or filename must contain a file extension. Resource: ${filename}`); // Determine type by head request/content type?
        else {
            let extension = filename.substring( (filename.lastIndexOf('.')+1) );
            if(STANDARD_IMAGE_EXTENSIONS.includes(extension)) type = STANDARD_IMAGE;
            else if (TILE_IMAGE_EXTENSIONS.includes(extension)) type = TILE_IMAGE;
        }

        return type;
    }

    onMount(async () => {
        render();
    });
</script>

<div class="image-viewer">
    <h6>Image viewer</h6>
    <div class="image">
        {#if sourceUrl}

            {#if viewer == HTML_VIEWER}
                <div class="content">
                    <img src={sourceUrl} alt={altText} title={altText}/>
                    <span class="caption">{caption}</span>
                </div>

            {:else if viewer == TILE_VIEWER}
                <OpenSeadragon_Content url={sourceUrl} {altText}/>

            {:else}
                <h6>Error</h6>>

            {/if}
        {:else if placeholder}
            <img src="/error" alt="error" />
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