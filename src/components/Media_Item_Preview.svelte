<script>
    'use strict' 
    
    import axios from 'axios';
    import { createEventDispatcher } from 'svelte';
    import ResourceUrl from '../libs/ResourceUrl.js';
    import { isHttpUrl } from '../libs/media_helpers';
    import * as Logger from '../libs/logger.js';
    import { Settings } from '../config/settings';
    import { Configuration } from '../config/config';
    import { getInnerText } from '../libs/exhibits_data_helpers';

    import {ITEM_TYPE} from '../config/global-constants';

    export let item = {};
    export let args = {};
    export let width = null;
    export let height = null;

    const dispatch = createEventDispatcher();

    const RESOURCE = new ResourceUrl(item.is_member_of_exhibit);
    const DEFAULT_ITEM_TITLE = Settings.exhibitItemDefaultTitle;

    const VERIFY_IMAGE_WIDTH = true; // will get image width from iiif info api and use it in image api request if < specified width
    const IMAGE_PREVIEW_WIDTH = 800; // will override dimensions value
    const LARGE_IMAGE_PREVIEW_WIDTH = 1800;

    let {resourceLocation} = Configuration;
    let {placeholderImage, placeholderImageWidth} = Settings; 

    let previewImageElement;

    let itemId;
    let itemType;
    let resource;
    let mediaWidth;
    let thumbnail;
    //let caption;
    let title;
    let altText;

    let preview;
    let isPlaceholderImage;

    let { 
        isInteractive = true,
        link = null,
        overlay = true

     } = args;

    $: init();

    const init = async () => {
        itemId = item.uuid || "";
        itemType = item.item_type || null;
        resource = item.media || null;
        mediaWidth = item.media_width || null;
        thumbnail = item.thumbnail || null;
        title = item.title ? getInnerText(item.title) : null;
        altText = item.is_alt_text_decorative ? null : (item.alt_text || null);

        preview = null;
        isPlaceholderImage = false;

        // has thumbnail, is local resource (not a url)
        if(thumbnail && isHttpUrl(thumbnail) == false) {
            preview = RESOURCE.getFileUrl(thumbnail);
        }

        // has thumbnail, is url
        else if(thumbnail && isHttpUrl(thumbnail) == true) {
            preview = thumbnail;
        }

        // no thumbnail, resource value is a url
        else if(isHttpUrl(resource) == true) {
            preview = resource;
        }

        // no thumbnail, resource value is not a url (is either kaltura id, repository item id, or local resource filename)
        else {
            preview = itemType ? await getPreviewUrl(itemType, resource, width, height) : RESOURCE.getItemPlaceholderImageUrl(null);
        }
    }

    const getPreviewUrl = async (itemType="null", media="null", width=null, height=null) => {
        let url = "";
        
        switch(itemType) {

            case ITEM_TYPE.IMAGE:
            case ITEM_TYPE.LARGE_IMAGE:

                if(!width) width = (mediaWidth >= 75) ? LARGE_IMAGE_PREVIEW_WIDTH : IMAGE_PREVIEW_WIDTH;

                if(VERIFY_IMAGE_WIDTH && width) {
                    try {
                        let imageWidth = (await axios.get(RESOURCE.getIIIFInfoUrl(media))).data.width;
                        if(imageWidth < width) width = imageWidth;
                    }
                    catch(error) {
                        Logger.module().error(`Could not get iiif data for image, Image id: ${media} Message: ${error.message}`);
                    }
                }

                url = RESOURCE.getIIIFImageUrl(media, width || IMAGE_PREVIEW_WIDTH, null);

                if(!url) {
                    url = RESOURCE.getItemPlaceholderImageUrl(ITEM_TYPE.IMAGE);
                    isPlaceholderImage = true; 
                }

                break;

            case ITEM_TYPE.AUDIO:
                url = RESOURCE.getAudioPreviewImageUrl(item, width, height);

                if(!url) {
                    url = RESOURCE.getItemPlaceholderImageUrl(ITEM_TYPE.AUDIO);
                    isPlaceholderImage = true; 
                }

                break;

            case ITEM_TYPE.VIDEO:
                url = RESOURCE.getVideoPreviewImageUrl(item, width, height);

                if(!url) {
                    url = RESOURCE.getItemPlaceholderImageUrl(ITEM_TYPE.VIDEO);
                    isPlaceholderImage = true; 
                }

                break;

            case ITEM_TYPE.PDF:
                url = RESOURCE.getPdfPreviewImageUrl(media, width, height);

                if(!url) {
                    url = RESOURCE.getItemPlaceholderImageUrl(ITEM_TYPE.PDF);
                    isPlaceholderImage = true; 
                }

                break;

            case ITEM_TYPE.TEXT:
                url = RESOURCE.getItemPlaceholderImageUrl(null);
                break;

            case ITEM_TYPE.EXTERNAL_SOURCE:
                url = media;
                break;

            default:
                Logger.module().error(`Invalid item type: ${itemType} Item: ${item.uuid}`);
                break;
        }
        
        return url;
    }

    const onClickItem = (event) => {
        let itemId = event.target.getAttribute('data-item-id');
        if(itemId) dispatch('click-item', {itemId});
        if(link) window.location.replace(link);
    }

    const onImageLoadError = (event) => {
        Logger.module().error(`Preview image load error. Url: ${preview}`);
        let placeholderImageUrl = `${resourceLocation}/${placeholderImage[itemType || 'DEFAULT']}`;

        if(event.target.src.includes(placeholderImageUrl) == false) {
            previewImageElement.src = placeholderImageUrl;
            if(altText) previewImageElement.alt = altText;
            isPlaceholderImage = true;
        }
    }
</script>

{#if preview}
    <div class="item-preview-wrapper {itemType == ITEM_TYPE.AUDIO || itemType == ITEM_TYPE.VIDEO ? 'audio-video-preview' : ''}">

        <div class="item-preview {isPlaceholderImage ? 'placeholder-image' : ''}">
            <button data-item-id={itemId} on:click={onClickItem} tabindex={isInteractive ? undefined : '-1'} aria-label={`click to open item viewer`}>
                <img crossorigin="anonymous" src={preview} alt={altText || undefined} on:error={onImageLoadError} bind:this={previewImageElement}>
            </button>

            {#if overlay}
                <div class="overlay"></div>
                <div class="overlay-text">
                    <!-- magnifying glass icon -->
                    <!-- <i class="las la-search"></i> -->
                    <p>Click to enlarge</p>
                </div>
            {/if}
        </div>

        <!-- {#if caption}<div class="caption">{@html caption}</div>{/if} -->
    </div>

{:else}
    <div class="load-message">
        Loading preview image...
    </div>
    
{/if}

<style>
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }

    img {
        width: 100%;
        pointer-events: none;
    }

    .item-preview {
        margin-bottom: 1em;
        margin: 0 auto;
        position: relative;
    }

    .item-preview button {
        margin: 0;
        padding: 0;
        width: 100%;
    }

    .item-preview.placeholder-image {
        margin-top: unset;
        margin-left: unset;
        margin-right: unset;
        max-width: 200px;
    }

    /* .caption {
        margin-top: 1rem;
        text-decoration: none;
        color: inherit;
        line-height: 1.5em;
    } */

    .item-preview:hover .overlay,
    .item-preview:hover .overlay-text {
        display: block;
    }

    .overlay {
        display: none;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        background-color: #181818;
        opacity: 0.3;
        pointer-events: none;
    }

    .overlay-text {
        display: none;
        width: 100%;
        height: 100%;
        position: absolute;
        top: calc(50% - 13px);
        left: 0;
        z-index: 11;
        color: white;
        text-align: center;
        pointer-events: none;

    }

    .overlay-text p {
        font-size: 18px;
        font-family: 'IBM Plex Mono', Arial;
        animation: fadeIn 1s;
    }

    .overlay-text i {
        font-size: 34px;
    }


</style>