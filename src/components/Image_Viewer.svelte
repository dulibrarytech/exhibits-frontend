<script>
    /**
     * @module Image_Viewer
     */
    import { onMount } from 'svelte';
    import { getItemTypeForFileExtension } from '../libs/media_helpers';

    import OpenSeadragon_Content from './OpenSeadragon_Content.svelte';

    export let args;

    console.log("Image viewer data in:", args)

    let type = null;
    let sourceUrl = null;
    let imageType = null;
    let altText = "Image";

    $: {
        if(!type) type = args.type || null;
        console.log("Image type in is:", type)
    }

    const render = () => {
        let {url="", caption=""} = args;
        
        /* If the url value is a filename, get the path to the storage location */
        const urlPattern = /^https?:\/\//;
        const filenamePattern = /^[\w,\s-]+\.[A-Za-z]{3}$/;
        if(urlPattern.test(url)) sourceUrl = url;
        else if(filenamePattern.test(url)) sourceUrl = getImageFilePath(url);
        else console.error(`Image item could not be rendered. Source file or url is invalid or not present. Url: ${url}`);
        console.log("Image src url:", sourceUrl)

        if(sourceUrl) {
            /* Get the image type by file extension if none was specified */
            imageType = type || getItemTypeForFileExtension(sourceUrl) || "image";
            console.log("Determined type:", imageType)
            if(!imageType) console.error("Image type could not be determined");
        }

        if(caption) altText = caption;
    }

    const getImageFilePath = (filename) => {
        return "/storage/" + filename; // TODO get path from config*
    }

    onMount(async () => {
        render()
    });
</script>

<div class="image-viewer">
    <h6>Image viewer</h6>
    <div class="image content">
        {#if sourceUrl && imageType}
            {#if imageType == "image"}
                <h6>Small image viewer</h6>
                <img src={sourceUrl} alt={altText} title={altText}/>
            {:else if imageType == "large_image"}
                <h6>Large image tile viewer</h6>
                <OpenSeadragon_Content url={sourceUrl} {altText}/>
            {:else}
                <h6>Error</h6>>
            {/if}
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