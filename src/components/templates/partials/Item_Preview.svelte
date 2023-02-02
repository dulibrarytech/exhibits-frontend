<script>
    import { Settings } from '../../config/settings.js';
    import { Configuration } from '../../config/config.js';
    import { Repository } from '../../libs/repository';

    export let item;
    export let url = null; // linkto
    export let thumbnail = null;

    console.log("Item preview item in:", item)

    var id = null;
    var tnUrl = null;
    var title = null;
    var caption = null;

    var ITEM_STORAGE_LOCATION = Configuration.resourceLocation || "";
    var PLACEHOLDER = `${ITEM_STORAGE_LOCATION}/placeholder/tn_placeholder.jpg`;

    $: {
        id = url || item.url || null;
        title = item.title || null;
        caption = item.caption || null;

        tnUrl = getThumbnailUrl();
    }

    const getThumbnailUrl = () => {
        let url = null;

        if(thumbnail) {
            url = `${ITEM_STORAGE_LOCATION}/${thumbnail}`;
        }
        else if(item.thumbnail) {
            url = `${ITEM_STORAGE_LOCATION}/${item.thumbnail}`;
        }
        else {
            let {itemTypes} = Settings;
            let {item_type = null} = item;

            switch(item_type) {
                case itemTypes.REPO:
                    url = getRepositoryItemTNUrl() || PLACEHOLDER;
                    break;

                case itemTypes.IMAGE:
                    url = getImageItemTNUrl() || PLACEHOLDER;
                    break;

                case itemTypes.LARGE_IMAGE:
                    url = getLargeImageItemTNUrl() || PLACEHOLDER;
                    break;

                case itemTypes.AUDIO:
                case itemTypes.VIDEO:
                    url = getAudioVideoItemTNUrl() || PLACEHOLDER;
                    break;

                case itemTypes.PDF:
                    url = getPdfItemTNUrl() || PLACEHOLDER;
                    break;

                case itemTypes.EXTERNAL_SOURCE:
                    url = getExternalItemTNUrl() || PLACEHOLDER;
                    break;

                default:
                    console.error(`Could not render item preview, invalid item type: ${item_type}`)
            }
        }

        return url;
    }

    const getRepositoryItemTNUrl = () => {
        return id ? Repository.getItemTNDatastreamUrl(id) : null;
    }

    const getImageItemTNUrl = () => {
        // return id ? iiifServerDomain/iiif/2/... : null;
        // return id ? IIIF::getTnResourceUri(id)
        return null;
    }

    const getLargeImageItemTNUrl = () => {
        // check kaltura_id, if present, build kal url (from Kaltura_Content or kaltura library)
        return null;
    }

    const getAudioVideoItemTNUrl = () => {
        // check kaltura_id, if present, build kal url (from Kaltura_Content or kaltura library)
        return null;
    }

    const getPdfItemTNUrl = () => {
        return null;
    }

    const getExternalItemTNUrl = () => {
        // just uses default tn if "thumbnail" is not set
        return null;
    }
</script>

<div class="item-preview">
        {#if title}{title}{/if}
        {#if tnUrl}
            <img src={tnUrl} />
        {:else}
            <img src='/error' />
        {/if}
        {#if caption}{caption}{/if}
</div>