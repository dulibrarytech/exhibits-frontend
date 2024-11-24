<script>
    'use strict' 
    
    import { createEventDispatcher } from 'svelte';
    import { Settings } from '../config/settings';
    import { Resource } from '../libs/resource';
    import { stripHtmlTags } from '../libs/data_helpers';
    import * as Logger from '../libs/logger.js';

    import {ITEM_TYPE} from '../config/global-constants';

    export let item = {};
    export let args = {};
    export let width = null;
    export let height = null;

    let itemPreviewElement;

    let itemId;
    let itemType;
    let resource;
    let thumbnail;
    let altText;
    let styles;
    let isLink;

    let preview;

    const dispatch = createEventDispatcher();

    const PLACEHOLDER_IMAGE = Settings.placeholderImage;
    const LARGE_IMAGE_PREVIEW_WIDTH = 1000;
    const URL_PATTERN = /^https?:\/\//;

    $: init();

    const init = async () => {
        itemId = item.uuid || "";
        itemType = item.item_type || null;
        resource = item.media || null;
        thumbnail = item.thumbnail || null;
        styles = item.styles || null;
        altText = stripHtmlTags(item.title) || item.caption || item.description || "Untitled Image";
        isLink = args.isLink ?? true;

        preview = null;

        if(thumbnail && URL_PATTERN.test(thumbnail) == false) {
            preview = Resource.getThumbnailFileUrl(thumbnail);
        }
        else if(thumbnail && URL_PATTERN.test(thumbnail) == true) {
            preview = thumbnail;
        }
        else if(URL_PATTERN.test(resource) == true) {
            preview = resource;
        }
        else {
            preview = itemType ? await getPreviewUrl(itemType, resource, width, height) : Resource.getThumbnailFileUrl(PLACEHOLDER_IMAGE.DEFAULT);
        }

        if(!preview) {
            Logger.module().error(`Could not determine preview source url for item: ${itemId}`);
        }
    }

    const getPreviewUrl = async (itemType, media, width=null, height=null) => {
        let url = "";

        switch(itemType) {
            case ITEM_TYPE.IMAGE:
                url = Resource.getIIIFImageUrl(media, width, height) || Resource.getThumbnailFileUrl(PLACEHOLDER_IMAGE.IMAGE);
                break;

            case ITEM_TYPE.LARGE_IMAGE:
                let data = {
                    filename: media,
                    width: width || LARGE_IMAGE_PREVIEW_WIDTH,
                    height: height || undefined
                }

                url = Resource.getImageDerivativeUrl(data) || Resource.getThumbnailFileUrl(PLACEHOLDER_IMAGE.IMAGE);
                break;

            case ITEM_TYPE.AUDIO:
                url = Resource.getAudioPreviewImageUrl(item, width, height) || Resource.getThumbnailFileUrl(PLACEHOLDER_IMAGE.AUDIO);
                break;

            case ITEM_TYPE.VIDEO:
                url = Resource.getVideoPreviewImageUrl(item, width, height) || Resource.getThumbnailFileUrl(PLACEHOLDER_IMAGE.VIDEO);
                break;

            case ITEM_TYPE.PDF:
                url = Resource.getPdfPreviewImageUrl(media, width, height) || Resource.getThumbnailFileUrl(PLACEHOLDER_IMAGE.PDF);
                break;

            case ITEM_TYPE.TEXT:
                url = Resource.getThumbnailFileUrl(PLACEHOLDER_IMAGE.IMAGE);
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
    }
</script>

{#if preview}
    {#if isLink}
        <a href data-item-id={itemId} on:click|stopPropagation|preventDefault={onClickItem}>
            <div class="item-preview" bind:this={itemPreviewElement} >
                <img crossorigin="anonymous" src={preview} alt={altText} title={altText}>
            </div>
        </a>

    {:else}
        <div class="item-preview" bind:this={itemPreviewElement} >
            <img crossorigin="anonymous" src={preview} alt={altText} title={altText}>
        </div>

    {/if}
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
</style>