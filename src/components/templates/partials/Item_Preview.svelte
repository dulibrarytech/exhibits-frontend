<script>
    'use strict'

    import { Configuration } from '../../../config/config';
    import { Settings } from '../../../config/settings';
    import { Repository } from '../../../libs/repository';
    import { Kaltura } from '../../../libs/kaltura';

    export let item;
    export let url = null; // overrides item 'url' field
    export let link = null; // linkto
    export let onclick = null; // f()
    export let thumbnail = null; // filename, overrides item 'thumbnail' field

    console.log("TEST Item preview item in:", item)

    var id = null;
    var tnUrl = null;
    var date = null;
    var title = null;
    var description = null;

    var {
        thumbnailImageLocation,
        thumbnailImageHeight,
        thumbnailImageWidth,
        itemPreviewLayout
        //enableIIIFImageItemThumbnail
    } = Settings;

    const THUMBNAIL_ICON = Settings.thumbnailIcon;
    const THUMBNAIL_PATH = `${thumbnailImageLocation}`;

    const THUMBNAIL_POSITION = {
        TOP: 'tn_top',
        BOTTOM: 'tn_bottom',
        LEFT: 'tn_left',
        RIGHT: 'tn_right',
        TN_ONLY: 'tn_only',
        TEXT_ONLY: 'tn_only'
    }

    $: {
        id = url || item.url || null;
        date = item.date || null;
        title = item.title || null;
        description = item.description || item.caption || null;
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
        {#if date}<div class="date">{date}</div>{/if}
        {#if tnUrl}
            <img src={tnUrl} />
        {:else}
            <img src='/error' />
        {/if}
        {#if title}<div class="title">{title}</div>{/if}
        {#if description}<div class="description">{description}</div>{/if}

        <!-- TODO layout options here (item_right, etc) -->
        <!-- {#if itemPreviewLayout == THUMBNAIL_POSITION.RIGHT}
            <div class="data">
                <div class="date">{date}</div>
                <div class="title">{title}</div>
                <div class="description">{description}</div>
            </div>
            
            <div class="thumbnail" style="width: {thumbnailImageWidth | 'auto'}; height: {thumbnailImageHeight || 'auto'}">
                {#if tnUrl}
                    <img src={tnUrl} />
                {:else}
                    <img src='/error' />
                {/if}
            </div>
        {/if} -->
</div>

<style>

</style>