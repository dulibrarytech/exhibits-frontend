<script>
    import { Settings } from '../../../config/settings.js';
    import { Repository } from '../../../libs/repository';

    export let item;
    export let url = null; // linkto
    export let thumbnail = null;

    console.log("Item preview item in:", item)

    var id = null;
    var tnUrl = null;
    var date = null;
    var title = null;
    var description = null;

    const THUMBNAIL_IMAGE_LOCATION = "/images/thumbnail"; // TODO add user upload thumbnail location (in file storage). keep default tn images in public folder for now
    const DEFAULT_THUMBNAIL = `${THUMBNAIL_IMAGE_LOCATION}/image-tn.png`;

    $: {
        id = url || item.url || null;
        date = item.date || null;
        title = item.title || null;
        description = item.description || item.caption || null;

        tnUrl = getThumbnailUrl();
    }

    const getThumbnailUrl = () => {
        let url = null;

        if(thumbnail) {
            url = `${THUMBNAIL_IMAGE_LOCATION}/${thumbnail}`;
        }
        else if(item.thumbnail) {
            url = `${THUMBNAIL_IMAGE_LOCATION}/${item.thumbnail}`;
        }
        else {
            let {itemTypes} = Settings;
            let {item_type = null} = item;

            switch(item_type) {
                case itemTypes.REPO:
                    url = getRepositoryItemTNUrl() || DEFAULT_THUMBNAIL;
                    break;

                case itemTypes.IMAGE:
                    url = getImageItemTNUrl() || DEFAULT_THUMBNAIL;
                    break;

                case itemTypes.LARGE_IMAGE:
                    url = getLargeImageItemTNUrl() || DEFAULT_THUMBNAIL;
                    break;

                case itemTypes.AUDIO:
                case itemTypes.VIDEO:
                    url = getAudioVideoItemTNUrl() || DEFAULT_THUMBNAIL;
                    break;

                case itemTypes.PDF:
                    url = getPdfItemTNUrl() || DEFAULT_THUMBNAIL;
                    break;

                case itemTypes.EXTERNAL_SOURCE:
                    url = getExternalItemTNUrl() || DEFAULT_THUMBNAIL;
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
        {#if date}<div class="date">{date}</div>{/if}
        {#if tnUrl}
            <img src={tnUrl} />
        {:else}
            <img src='/error' />
        {/if}
        {#if title}<div class="title">{title}</div>{/if}
        {#if description}<div class="description">{description}</div>{/if}
</div>