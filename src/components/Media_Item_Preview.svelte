<script>
    'use strict' 
    
    import { createEventDispatcher } from 'svelte';
    import ResourceUrl from '../libs/ResourceUrl.js';
    import { stripHtmlTags } from '../libs/data_helpers';
    import * as Logger from '../libs/logger.js';
    import { Settings } from '../config/settings';
    import { Configuration } from '../config/config';

    import {ITEM_TYPE} from '../config/global-constants';

    export let item = {};
    export let args = {};
    export let width = null;
    export let height = null;

    let {resourceLocation} = Configuration;
    let {placeholderImage, placeholderImageWidth} = Settings; 

    let itemPreviewElement;
    let previewImageElement;

    let itemId;
    let itemType;
    let resource;
    let thumbnail;
    let caption;
    let altText;
    let styles;

    let link;
    let isPlaceholderImage;
    let preview;

    const dispatch = createEventDispatcher();

    const RESOURCE = new ResourceUrl(item.is_member_of_exhibit);

    const LARGE_IMAGE_PREVIEW_WIDTH = 1000;
    const URL_PATTERN = /^https?:\/\//;

    $: init();

    const init = async () => {
        itemId = item.uuid || "";
        itemType = item.item_type || null;
        resource = item.media || null;
        thumbnail = item.thumbnail || null;
        caption = item.caption || null;
        styles = item.styles || null;
        altText = stripHtmlTags(item.title) || caption || item.description || "Untitled Image";

        link = args.link || null;
        isPlaceholderImage = false;
        preview = null;

        if(thumbnail && URL_PATTERN.test(thumbnail) == false) {
            preview = RESOURCE.getFileUrl(thumbnail);
        }
        else if(thumbnail && URL_PATTERN.test(thumbnail) == true) {
            preview = thumbnail;
        }
        else if(URL_PATTERN.test(resource) == true) {
            preview = resource;
        }
        else {
            preview = itemType ? await getPreviewUrl(itemType, resource, width, height) : RESOURCE.getItemPlaceholderImageUrl(null);
        }

        if(!preview) {
            Logger.module().error(`Could not determine preview source url for item: ${itemId}`);
        }
    }

    const getPreviewUrl = async (itemType, media, width=null, height=null) => {
        let url = "";

        switch(itemType) {
            case ITEM_TYPE.IMAGE:
                url = RESOURCE.getIIIFImageUrl(media, width, height);

                if(!url) {
                    url = RESOURCE.getItemPlaceholderImageUrl(ITEM_TYPE.IMAGE);
                    isPlaceholderImage = true; 
                }

                break;

            case ITEM_TYPE.LARGE_IMAGE:
                let data = {
                    width: width || LARGE_IMAGE_PREVIEW_WIDTH,
                    height: height || undefined
                }

                url = RESOURCE.getImageDerivativeUrl(media, data);

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

    const onImageLoadError = () => {
        previewImageElement.src = `${resourceLocation}/${placeholderImage[itemType || 'DEFAULT']}`;
        isPlaceholderImage = true;
    }
</script>

{#if preview}
    <div class="item-preview-wrapper {itemType == ITEM_TYPE.AUDIO || itemType == ITEM_TYPE.VIDEO ? 'audio-video-preview' : ''}">
        <a href data-item-id={itemId} on:click|stopPropagation|preventDefault={onClickItem}>
            <div class="item-preview {isPlaceholderImage ? 'placeholder-image' : ''}" bind:this={itemPreviewElement} >
                <img crossorigin="anonymous" src={preview} alt={altText} title={altText} on:error={onImageLoadError} bind:this={previewImageElement}>
            </div>
        </a>
        {#if caption}<div class="caption">{caption}</div>{/if}
    </div>

{:else}
    <div class="load-message">
        Loading preview image...
    </div>
    
{/if}

<style>
    img {
        width: 100%;
        pointer-events: none;
    }

    .item-preview {
        margin-bottom: 1em;
        margin: 0 auto;
        pointer-events: none;
    }

    .item-preview.placeholder-image {
        margin-top: unset;
        margin-left: unset;
        margin-right: unset;
    }

    .caption {
        margin-top: 1rem;
        text-decoration: none;
        color: inherit;
        line-height: 1.5em;
    }
</style>