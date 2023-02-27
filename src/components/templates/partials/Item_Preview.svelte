<script>
    'use strict' 
    
    import { Configuration } from '../../../config/config';
    import { Settings } from '../../../config/settings';
    import { Repository } from '../../../libs/repository';
    import { Kaltura } from '../../../libs/kaltura';

    export let item;
    export let url = null;

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
            let {itemTypes} = Settings;
            let {item_type = null} = item;

            switch(item_type) {
                case itemTypes.REPO:
                    url = getRepositoryItemTNUrl() || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.DEFAULT}`;
                    break;

                case itemTypes.IMAGE:
                case itemTypes.LARGE_IMAGE:
                    url = getImageItemTNUrl() || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.IMAGE}`;
                    break;

                case itemTypes.AUDIO:
                case itemTypes.VIDEO:
                    url = getAudioVideoItemTNUrl() || itemTypes.AUDIO ? `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.AUDIO}` : `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.VIDEO}`;
                    break;

                case itemTypes.PDF:
                    url = getPdfItemTNUrl() || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.PDF}`;
                    break;

                case itemTypes.EXTERNAL_SOURCE:
                    url = getExternalItemTNUrl() || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.DEFAULT}`;
                    break;

                default:
                    console.error(`Could not render item preview, invalid item type: ${item_type}`)
            }
        }

        return url;
    } 
</script>

<div class="item-preview">
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
    }
</style>