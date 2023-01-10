<script>
    /**
     * @module Image_Viewer
     * 
     * Renders an image in <img> element or OpenSeadragon zoomable viewer (tif files only)
     * 
     * Currently no OpenSeadragon viewing of remote tiff images. Only local images can be served as tiled images due to functionality of tile server (Cantaloupe)
     */
    import { onMount } from 'svelte';
    import { Configuration } from '../config/config';
    import { getItemTypeForFileExtension } from '../libs/media_helpers';

    import OpenSeadragon_Content from './OpenSeadragon_Content.svelte';

    export let args;

    console.log("Image viewer data in:", args)

    const URL_PATTERN = /^https?:\/\//;
    //const FILENAME_PATTERN = /^[\w,\s-]+\.[A-Za-z]{3}$/;

    let type = null;
    let sourceUrl = null;
    let imageType = null;
    let placeholder = null;
    let altText = "Image";
    let viewer = "html";

    $: {
        if(!type) type = args.type || null;
        console.log("TEST Image type in is:", type)
    }

    const render = () => {
        let {url="", caption=""} = args;

        imageType = type || getItemTypeForFileExtension(url);
        if(!imageType) console.error(`Image type could not be determined. Resource: ${url}`);

        /* Get the source url for the image based on the image type and url format. */
        /* Use the openseadragon viewer for large files present in resource storage */
        if(imageType == "image") {
            if(URL_PATTERN.test(url) == false) {
                sourceUrl = getImageFilePath(url);
            }
            else sourceUrl = url;
        }
        else if(imageType == "large_image") {
            if(URL_PATTERN.test(url) == false) {
                sourceUrl = getImageServerUrl(url);
                viewer = "openseadragon";
            }
            else sourceUrl = url;
        }
        else console.error(`Invalid image type: ${imageType}`);

        if(caption) altText = caption;
    }

    const getImageFilePath = (filename) => {
        return `${Configuration.resourceLocation}/${filename}`;
    }

    const getImageServerUrl = (filename) => {
        return `${Configuration.imageServerUrl}/iiif/2/${filename}/info.json`;
    }

    onMount(async () => {
        render()
    });
</script>

<div class="image-viewer">
    <h6>Image viewer</h6>
    <div class="image">
        {#if sourceUrl}
            {#if viewer == "html"}
                <div class="content">
                    <img src={sourceUrl} alt={altText} title={altText}/>
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
</style>