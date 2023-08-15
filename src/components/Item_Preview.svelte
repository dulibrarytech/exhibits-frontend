<script>
    'use strict' 
    
    import { onMount } from 'svelte';
    import { Configuration } from '../config/config';
    import { Settings } from '../config/settings';
    import { Repository } from '../libs/repository';

    import {ITEM_TYPE} from '../config/global-constants';

    export let item;
    export let url = null;

    let itemPreviewElement;
    let styles = null;

    var id = null;
    var thumbnail = null;
    var tnUrl = null;
    var caption = null;

    var {
        thumbnailImageLocation,
        thumbnailImageHeight,
        thumbnailImageWidth
        //enableIIIFImageItemThumbnail

    } = Settings;

    const THUMBNAIL_ICON = Settings.thumbnailIcon;
    const THUMBNAIL_PATH = `${thumbnailImageLocation}`;

    $: {
        if(!url) id = item.url || null;

        thumbnail = item.thumbnail || null;
        tnUrl = getThumbnailUrl();
        styles = item.styles || null;
        caption = item.caption || null;
    }

    const setTheme = (styles) => {
        let {item_media = {}} = styles;

        for(let style in item_media) {
            itemPreviewElement.style[style] = item_media[style];
        }
    }

    const getRepositoryThumbnailUrl = () => {
        return id ? Repository.getItemTNDatastreamUrl(id) : null;
    }

    const getImageThumbnailUrl = () => {
        return id ? `${Configuration.iiifImageServerUrl}/iiif/2/${id}/full/${thumbnailImageWidth},${thumbnailImageHeight}/0/default.jpg` : null;
    }

    const getAudioThumbnailUrl = () => {
        return null;
    }

    const getVideoThumbnailUrl = () => {
        return null;
    }

    const getPdfThumbnailUrl = () => {
        return id ? `${Configuration.iiifImageServerUrl}/iiif/2/${id}/full/${thumbnailImageWidth},${thumbnailImageHeight}/0/default.jpg` : null;
    }

    const getExternalThumbnailUrl = () => {
        return item.url || null;
    }

    const getThumbnailUrl = () => {
        let url = null;

        if(thumbnail) {
            url = `${THUMBNAIL_PATH}/${thumbnail}`;
        }
        else if(item.thumbnail) {
            url = `${THUMBNAIL_PATH}/${item.thumbnail}`;
        }
        else {
            let {item_type = null} = item;

            switch(item_type) {
                case ITEM_TYPE.REPO:
                    url = getRepositoryThumbnailUrl() || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.DEFAULT}`;
                    break;

                case ITEM_TYPE.IMAGE:
                case ITEM_TYPE.LARGE_IMAGE:
                    url = getImageThumbnailUrl() || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.IMAGE}`;
                    break;

                case ITEM_TYPE.AUDIO:
                    url = getAudioThumbnailUrl() || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.AUDIO}`;
                    break;

                case ITEM_TYPE.VIDEO:
                    url = getVideoThumbnailUrl() || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.VIDEO}`;
                    break;

                case ITEM_TYPE.PDF:
                    url = getPdfThumbnailUrl() || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.PDF}`;
                    break;

                case ITEM_TYPE.EXTERNAL_SOURCE:
                    url = getExternalThumbnailUrl() || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.DEFAULT}`;
                    break;

                default:
                    console.error(`Invalid item type: ${item_type}`);
                    url = `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.DEFAULT}`;
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
    {#if tnUrl}
        <img src={tnUrl} />
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
        margin-top: 10px;
    }
</style>