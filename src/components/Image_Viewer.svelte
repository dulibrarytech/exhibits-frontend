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

    let {
        url = null,
        filename = null,
        imageType = null,
        caption = null

    } = args;

    let sourceUrl = null;
    let viewer = null;
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

        if(imageType == STANDARD_IMAGE) {
            sourceUrl = url;
            viewer = HTML_VIEWER;
        }
        else if(imageType == TILE_IMAGE) {
            sourceUrl = filename ? getImageServerUrl(filename) : url;
            viewer = TILE_VIEWER;
        }
        else {
            placeholder = true;
            console.error(`Invalid image type: ${imageType} Resource url: ${url}`);
        }

        if(caption) altText = caption;
    }

    const getImageServerUrl = (filename) => {
        return `${Configuration.iiifImageServerUrl}/iiif/2/${filename}/info.json`;
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
    <div class="image">
        {#if sourceUrl}

            {#if viewer == HTML_VIEWER}
                <div class="content">
                    <img src={sourceUrl} alt={altText} title={altText}/>
                    {#if caption}<span class="caption">{caption}</span>{/if}
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