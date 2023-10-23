<script>
    'use strict' 
    
    import { onMount } from 'svelte';
    import { Settings } from '../config/settings';
    import { Resource } from '../libs/resource';
    import { Repository } from '../libs/repository';

    import {ITEM_TYPE} from '../config/global-constants';

    export let item = {};
    export let width = null;
    export let height = null;

    let itemPreviewElement;
    let itemType;
    let resource;
    let thumbnail;
    let title;
    let caption = null;
    let styles = null;
    let preview = null;

    const PLACEHOLDER_IMAGE = Settings.placeholderImage;
    const PLACEHOLDER_IMAGE_PATH = Settings.placeholderImageLocation;
    const LARGE_IMAGE_PREVIEW_WIDTH = 1000;

    $: init();

    const init = async () => {

        itemType = item.item_type || ITEM_TYPE.IMAGE;
        resource = item.media || null;
        thumbnail = item.thumbnail || null;
        title = item.title || null;
        caption = item.caption || null;
        styles = item.styles || null;

        if(!resource) console.log("Item has null 'media' value");
        preview = await getPreviewSourceUrl(itemType, resource, width, height);
        if(!preview) console.log("Preview image source url not found");
    }

    const setTheme = (styles) => {
        let {item_media = {}} = styles;

        for(let style in item_media) {
            itemPreviewElement.style[style] = item_media[style];
        }
    }

    const getPreviewSourceUrl = async (itemType, media, width=null, height=null) => {
        let url = "";

        if(thumbnail) {
            url = thumbnail;
        }
        else {
            switch(itemType) {
                case ITEM_TYPE.REPO:
                    url = await Repository.getPreviewImageUrl(media) || `${PLACEHOLDER_IMAGE_PATH}/${PLACEHOLDER_IMAGE.DEFAULT}`;
                    break;

                case ITEM_TYPE.IMAGE:
                    url = Resource.getIIIFImageUrl(media, width, height) || `${PLACEHOLDER_IMAGE_PATH}/${PLACEHOLDER_IMAGE.IMAGE}`;
                    break;

                case ITEM_TYPE.LARGE_IMAGE:
                    let data = {
                        filename: media,
                        width: width || LARGE_IMAGE_PREVIEW_WIDTH,
                        height: height || undefined
                    }

                    url = Resource.getImageDerivativeUrl(data) || `${PLACEHOLDER_IMAGE_PATH}/${PLACEHOLDER_IMAGE.IMAGE}`;
                    break;

                case ITEM_TYPE.AUDIO:
                    url = Resource.getAudioPreviewImageUrl(media, width, height) || `${PLACEHOLDER_IMAGE_PATH}/${PLACEHOLDER_IMAGE.AUDIO}`;
                    break;

                case ITEM_TYPE.VIDEO:
                    url = Resource.getVideoPreviewImageUrl(media, width, height) || `${PLACEHOLDER_IMAGE_PATH}/${PLACEHOLDER_IMAGE.VIDEO}`;
                    break;

                case ITEM_TYPE.PDF:
                    url = Resource.getPdfPreviewImageUrl(media, width, height) || `${PLACEHOLDER_IMAGE_PATH}/${PLACEHOLDER_IMAGE.PDF}`; 
                    break;

                case ITEM_TYPE.EXTERNAL_SOURCE:
                    url = media;
                    break;

                default:
                    console.error(`Invalid item type: ${itemType} Item: ${item.id}`);
                    break;
            }
        }

        return url;
    }

    onMount(async () => {
        if(styles) setTheme(styles); 
    });
</script>

<div class="item-preview" bind:this={itemPreviewElement} >
    {#if preview}
        <img src={preview} />
        {#if caption}<span class="caption">{caption}</span>{/if}
    {:else}
        <img src='/error' />
    {/if}
</div>

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

    .caption {
        margin-top: 1rem;
        text-decoration: none;
        color: inherit;
    }
</style>