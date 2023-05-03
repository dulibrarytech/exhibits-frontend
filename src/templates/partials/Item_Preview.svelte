<script>
    'use strict' 
    
    import { onMount } from 'svelte';
    import { Configuration } from '../../config/config';
    import { Settings } from '../../config/settings';
    import { Repository } from '../../libs/repository';
    import { Kaltura } from '../../libs/kaltura';

    import {ITEM_TYPE} from '../../config/global-constants';

    export let item;
    export let url = null;

    let itemPreviewElement;
    let styles = null;

    var id = null;
    var thumbnail = null;
    var tnUrl = null;

    var {
        thumbnailImageLocation,
        thumbnailImageHeight,
        thumbnailImageWidth,
        itemPreviewLayout
        //enableIIIFImageItemThumbnail
    } = Settings;

    const THUMBNAIL_ICON = Settings.thumbnailIcon;
    const THUMBNAIL_PATH = `${thumbnailImageLocation}`;

    $: {
        if(!url) id = item.url || null;
        thumbnail = item.thumbnail || null;
        tnUrl = getThumbnailUrl();
        styles = item.styles || null;
    }

    const setTheme = (styles) => {
        let {item_media = {}} = styles;

        for(let style in item_media) {
            itemPreviewElement.style[style] = item_media[style];
        }
    }

    const getRepositoryItemTNUrl = () => {
        return id ? Repository.getItemTNDatastreamUrl(id) : null;
    }

    const getImageItemTNUrl = () => {
        return id ? `${Configuration.iiifImageServerUrl}/iiif/2/${id}/full/${thumbnailImageWidth},${thumbnailImageHeight}/0/default.jpg` : null;
    }

    const getAudioVideoItemTNUrl = () => {
        let url = null;
        let {kaltura_id = null} = item;
        if(kaltura_id) url = Kaltura.getThumbnailUrl(kaltura_id);
        return url;
    }

    const getPdfItemTNUrl = () => {
        return id ? `${Configuration.iiifImageServerUrl}/iiif/2/${id}/full/${thumbnailImageWidth},${thumbnailImageHeight}/0/default.jpg` : null; // cantaloupe?
    }

    const getExternalItemTNUrl = () => {
        return null;
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
                    url = getRepositoryItemTNUrl() || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.DEFAULT}`;
                    break;

                case ITEM_TYPE.IMAGE:
                case ITEM_TYPE.LARGE_IMAGE:
                    url = getImageItemTNUrl() || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.IMAGE}`;
                    break;

                case ITEM_TYPE.AUDIO:
                case ITEM_TYPE.VIDEO:
                    url = getAudioVideoItemTNUrl() || ITEM_TYPE.AUDIO ? `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.AUDIO}` : `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.VIDEO}`;
                    break;

                case ITEM_TYPE.PDF:
                    url = getPdfItemTNUrl() || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.PDF}`;
                    break;

                case ITEM_TYPE.EXTERNAL_SOURCE:
                    url = getExternalItemTNUrl() || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.DEFAULT}`;
                    break;

                default:
                    console.error(`Could not render item preview, invalid item type: ${item_type}`)
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
    {:else}
        <img src='/error' />
    {/if}
</div>

<style>
    img {
        width: 100%;
    }

    .item-preview {
        margin-bottom: 1em;
        margin: 0 auto;
    }
</style>