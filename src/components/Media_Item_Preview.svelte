<script>
    'use strict' 
    
    import { Settings } from '../config/settings';
    import { Resource } from '../libs/resource';

    import {ITEM_TYPE} from '../config/global-constants';

    export let item = {};
    export let args = {};
    export let width = null;
    export let height = null;

    let itemPreviewElement;
    let itemType;
    let resource;
    let thumbnail;
    let altText;
    let styles = null;
    let preview = null;

    const PLACEHOLDER_IMAGE = Settings.placeholderImage;
    const LARGE_IMAGE_PREVIEW_WIDTH = 1000;

    const URL_PATTERN = /^https?:\/\//;

    $: init();

    const init = async () => {
        itemType = item.item_type || null;
        resource = item.media || null;
        thumbnail = item.thumbnail || null;
        altText = item.title || item.description || "Untitled Image";
        styles = item.styles || null;

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

        if(!preview) console.log("Preview image source url not found");
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
                console.error(`Invalid item type: ${itemType} Item: ${item.uuid}`);
                break;
        }

        return url;
    }
</script>

<div class="item-preview" bind:this={itemPreviewElement} >
    {#if preview}
        <img crossorigin="anonymous" src={preview} alt={altText} title={altText} />
    {:else}
        <img src='/error' alt="Error" />
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
</style>