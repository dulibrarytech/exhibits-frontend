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
    export let width = "800";
    export let height = null;

    const dispatch = createEventDispatcher();

    const RESOURCE = new ResourceUrl(item.is_member_of_exhibit);
    const DEFAULT_IMAGE_ALT_TEXT = Settings.exhibitItemImageAltText;

    const DEFAULT_IMAGE_TITLE = "Untitled Item";
    const VERIFY_IMAGE_WIDTH = true; // will get image width from iiif info api and use it in image api request if < specified width
    const IMAGE_PREVIEW_WIDTH = null; // will override dimensions value
    const LARGE_IMAGE_PREVIEW_WIDTH = "800";

    let {resourceLocation} = Configuration;
    let {placeholderImage, placeholderImageWidth} = Settings; 

    let itemPreviewElement;
    let previewImageElement;

    let itemId;
    let itemType;
    let resource;
    let thumbnail;
    let caption;
    let title;
    let altText;

    let preview;
    let isPlaceholderImage;

    let { 
        isInteractive = true,
        link = null

     } = args;

    $: init();

    const init = async () => {
        itemId = item.uuid || "";
        itemType = item.item_type || null;
        resource = item.media || null;
        thumbnail = item.thumbnail || null;
        caption = item.caption || null;
        title = item.title || DEFAULT_IMAGE_TITLE;

        altText = `${getInnerText(title)} click to open in viewer`;

        if(!altText) altText = DEFAULT_IMAGE_ALT_TEXT;

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

        if(!preview) {
            Logger.module().error(`Could not determine preview source url for item: ${itemId}`);
        }
    }

    const getPreviewUrl = async (itemType, media, width=null, height=null) => {
        let url = "";
        
        if(!width) width = IMAGE_PREVIEW_WIDTH;
        
        switch(itemType) {

            case ITEM_TYPE.IMAGE:

                if(VERIFY_IMAGE_WIDTH && width) {
                    let imageWidth = (await axios.get(RESOURCE.getIIIFInfoUrl(media))).data.width;
                    if(imageWidth < width) width = imageWidth;
                }

                url = RESOURCE.getIIIFImageUrl(media, width || IMAGE_PREVIEW_WIDTH, null);

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

    const onImageLoadError = (event) => {
        let placeholderImageUrl = `${resourceLocation}/${placeholderImage[itemType || 'DEFAULT']}`;

        if(event.target.src.includes(placeholderImageUrl) == false) {
            previewImageElement.src = placeholderImageUrl;
            isPlaceholderImage = true;
        }
    }
</script>

{#if preview}
    <div class="item-preview-wrapper {itemType == ITEM_TYPE.AUDIO || itemType == ITEM_TYPE.VIDEO ? 'audio-video-preview' : ''}">
        <a href data-item-id={itemId} on:click|stopPropagation|preventDefault={onClickItem} tabindex={isInteractive ? undefined : '-1'} >
            <div class="item-preview {isPlaceholderImage ? 'placeholder-image' : ''}" bind:this={itemPreviewElement} >
                <img crossorigin="anonymous" src={preview} alt={altText} on:error={onImageLoadError} bind:this={previewImageElement}>
            </div>
        </a>
        {#if caption}<div class="caption">{@html caption}</div>{/if}
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
        max-width: 200px;
    }

    .caption {
        margin-top: 1rem;
        margin-bottom: 1rem;
        text-decoration: none;
        color: inherit;
        line-height: 1.5em;
    }
</style>