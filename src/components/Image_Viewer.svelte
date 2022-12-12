<script>
    import { onMount } from 'svelte';
    import { Configuration } from '../config/config';
    import { getItemTypeForFileExtension } from '../libs/media_helpers';

    import OpenSeadragonViewer from './OpenSeadragon_Viewer.svelte';

    export let args;

    console.log("Image viewer data in:", args)

    let type = null;
    let sourceUrl = null;
    let imageType = null;
    let altText = "Image";

    $: {
        if(!type) type = args.type || null;
    }

    const render = () => {
        let {url="", caption=""} = args;

        const urlPattern = /^https?:\/\//;
        const filenamePattern = /^[\w,\s-]+\.[A-Za-z]{3}$/;
        
        if(urlPattern.test(url)) sourceUrl = url;
        else if(filenamePattern.test(url)) sourceUrl = getImageFilePath(url);
        else console.error("Image item could not be rendered. Source file or url is invalid or not present");

        if(sourceUrl) {
            imageType = type || getItemTypeForFileExtension(sourceUrl) || "image";
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
    <div class="image">
        {#if sourceUrl && imageType}
            {#if imageType == "image"}
                <h6>Small image viewer</h6>
                <img src={sourceUrl} alt={altText} title={altText}/>
            {:else if imageType == "large_image"}
                <h6>Large image tile viewer</h6>
                <OpenSeadragonViewer url={sourceUrl} {altText}/>
            {:else}
                <h6>Error</h6>>
            {/if}
        {:else}
            <h5>Loading image...</h5>
        {/if}
    </div>
</div>

<style>
    .image-viewer, .image, img {
        width: 100%;
        height: 100%;
    }
</style>