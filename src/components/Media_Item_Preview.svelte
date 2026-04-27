<script>
    /**
     * @component Media_Item_Preview
     * @description Component for displaying a preview thumbnail image for a media item. Will attempt to get a thumbnail or preview image for the item, but will fall back to a placeholder image if no preview is available.
     * 
     * @param {Object} item - The exhibit item object containing metadata and resource information.
     * @param {Object} args - Additional arguments for configuring the component behavior [
     *  args.isInteractive (boolean, default: true) to enable/disable click interaction, 
     *  args.link (string, optional) to specify a URL to navigate to on click instead of dispatching event, 
     *  args.overlay (boolean, default: true) to show/hide the "Click to enlarge" overlay on hover
     * ]
     * @param {number} width - Desired width for the preview image (optional).
     * @param {number} height - Desired height for the preview image (optional).
     * @event click-item - Dispatched when the item preview is clicked, with the item ID as detail.
     * @event load-error - Dispatched when there is an error loading the preview image, with the image URL as detail.
     * @event image-loaded - Dispatched when the preview image has successfully loaded, with the item ID as detail.
    */
    
    'use strict' 
    
    import axios from 'axios';
    import { createEventDispatcher } from 'svelte';
    import * as Logger from '../libs/logger.js';
    import { Settings } from '../config/settings';
    import ResourceUrl from '../libs/ResourceUrl.js'; 
    import { isHttpUrl } from '../libs/media_helpers';
    import { getInnerText } from '../libs/exhibits_data_helpers';
    // import { getImageThumbnailUrl } from '../libs/iiif_helpers.js'; 
    import * as IIIF from '../libs/iiif_helpers.js';

    import {
        ITEM_TYPE,
        
    } from '../config/global-constants';

    export let item = {};
    export let args = {};
    export let width = null;
    export let height = null;

    const dispatch = createEventDispatcher();

    // resource url helper
    const RESOURCE = new ResourceUrl(item.is_member_of_exhibit);

    // component options
    const DEFAULT_ITEM_TITLE = Settings.exhibitItemDefaultTitle;
    const VERIFY_IMAGE_WIDTH = true; // will get image width from iiif info api and use it in image api request if < specified width
    const IMAGE_PREVIEW_WIDTH = 800; // will override dimensions value
    const LARGE_IMAGE_PREVIEW_WIDTH = 1800;

    let {
        imageAssetsPath, 
        placeholderImage,

    } = Settings; 

    // item data
    let itemId;
    let itemType;
    let resource;
    let mediaWidth;
    let thumbnail;
    let title;
    let altText;

    // module variables
    let _preview;
    let _isPlaceholderImage;
    let _previewImageElement;

    // item options
    let { 
        isInteractive = true,
        link = null,
        overlay = true,

    } = args;

    $: init();

    const init = async () => {
        console.log("test: init media item display", item)

        itemId      = item.uuid || "";
        itemType    = item.item_type || null;
        resource    = item.media || null;
        mediaWidth  = item.media_width || null;
        thumbnail   = item.thumbnail || null;
        title       = item.title ? getInnerText(item.title) : DEFAULT_ITEM_TITLE;
        altText     = item.is_alt_text_decorative ? null : (item.alt_text || null);

        _preview = null;
        _isPlaceholderImage = false;

        if(item.is_iiif_item) {
            _preview = IIIF.getImageThumbnailUrl(item[ Settings.exhibitItemDataFields.MANIFEST ] || {});
            console.log("test: iiif manifest thumbnail url: ", _preview);
            if(!_preview) Logger.module().error(`Could not get thumbnail source url from iiif info for item. Manifest may be missing or have errors. Item id: ${itemId} Item type: ${itemType}`);
        }
        else {
            _preview = await getPreviewUrl(itemType, resource, width, height);
            if(!_preview) Logger.module().error(`Could not determine thumbnail source url for item. Item id: ${itemId} Item type: ${itemType}`);
        }

        if(!_preview) {
            _preview = RESOURCE.getItemPlaceholderImageUrl(itemType);
            _isPlaceholderImage = true;
        }
    }

    const getPreviewUrl = async (itemType="null", resource="null", width=null, height=null) => {
        let previewUrl = null;

        if(thumbnail && isHttpUrl(thumbnail) == false) {
            previewUrl = RESOURCE.getFileUrl(thumbnail);
        }

        // has thumbnail, is url
        else if(thumbnail && isHttpUrl(thumbnail) == true) {
            previewUrl = thumbnail;
        }

        // no thumbnail, resource value is a url
        else if(isHttpUrl(resource) == true) {
            previewUrl = resource;
        }

        // no thumbnail, resource value is not a url (is either kaltura id, repository item id, or local resource filename)
        else {
            previewUrl = await getPreviewUrlByItemType(itemType, resource, width, height);
        }

        return previewUrl;
    }

    const getPreviewUrlByItemType = async (itemType="null", media="null", width=null, height=null) => {
        let url = null;
        
        switch(itemType) {

            case ITEM_TYPE.IMAGE:
            case ITEM_TYPE.LARGE_IMAGE:
                if(!width) width = (mediaWidth >= 75) ? LARGE_IMAGE_PREVIEW_WIDTH : IMAGE_PREVIEW_WIDTH;

                if(VERIFY_IMAGE_WIDTH && width) {
                    try {
                        let imageWidth = (await axios.get(RESOURCE.getIIIFInfoUrl(media))).data.width;
                        if(imageWidth < width) width = imageWidth;
                    }
                    catch(error) {
                        Logger.module().error(`Could not get iiif data for image, Image id: ${media} Message: ${error.message}`);
                    }
                }

                url = RESOURCE.getIIIFImageUrl(media, width || IMAGE_PREVIEW_WIDTH, null);
                break;

            case ITEM_TYPE.AUDIO:
                url = RESOURCE.getAudioPreviewImageUrl(item, width, height);
                break;

            case ITEM_TYPE.VIDEO:
                url = RESOURCE.getVideoPreviewImageUrl(item, width, height);
                break;

            case ITEM_TYPE.PDF:
                url = RESOURCE.getPdfPreviewImageUrl(media, width, height);
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
        let placeholderImageUrl = `${imageAssetsPath}/${placeholderImage[itemType || 'DEFAULT']}`;

        Logger.module().error(`Preview image load error. Url: ${_preview}`);
        _previewImageElement.parentElement.title = "Preview image failed to load. Click to view item.";
        overlay = false;

        if(event.target.src.includes(placeholderImageUrl) == false) {
            _previewImageElement.src = placeholderImageUrl;
            if(altText) _previewImageElement.alt = altText;
            _isPlaceholderImage = true;
        }

        dispatch('load-error', {url: _preview});
    }

    const onImageLoad = (event) => {
        dispatch('image-loaded', {itemId});
    }
</script>

{#if _preview}
    <div class="item-preview-wrapper {itemType == ITEM_TYPE.AUDIO || itemType == ITEM_TYPE.VIDEO ? 'audio-video-preview' : ''}">

        <div class="item-preview {_isPlaceholderImage ? 'placeholder-image' : ''}">
            <button data-item-id={itemId} on:click={onClickItem} tabindex={isInteractive ? undefined : '-1'} aria-label={`click to open item viewer`}>
                <img 
                    crossorigin="anonymous" 
                    src={_preview} 
                    alt={altText || undefined} 
                    title={_isPlaceholderImage ? `Preview image failed to load. Click to view item.` : undefined}
                    on:load={onImageLoad} 
                    on:error={onImageLoadError} 
                    bind:this={_previewImageElement}>
            </button>

            {#if overlay}
                <div class="overlay"></div>
                <div class="overlay-text">
                    <!-- magnifying glass icon -->
                    <!-- <i class="las la-search"></i> -->
                    <p>Click to enlarge</p>
                </div>
            {/if}
        </div>
    </div>

{:else}
    <div class="load-message">
        Loading preview image...
    </div>
    
{/if}

<style>
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }

    img {
        width: 100%;
        pointer-events: none;
    }

    .item-preview {
        margin-bottom: 1em;
        margin: 0 auto;
        position: relative;
    }

    .item-preview button {
        margin: 0;
        padding: 0;
        width: 100%;
    }

    .item-preview.placeholder-image {
        margin-top: unset;
        margin-left: unset;
        margin-right: unset;
        max-width: 200px;
    }

    .item-preview:hover .overlay,
    .item-preview:hover .overlay-text {
        display: block;
    }

    .overlay {
        display: none;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        background-color: #181818;
        opacity: 0.3;
        pointer-events: none;
    }

    .overlay-text {
        display: none;
        width: 100%;
        height: 100%;
        position: absolute;
        top: calc(50% - 13px);
        left: 0;
        z-index: 11;
        color: white;
        text-align: center;
        pointer-events: none;

    }

    .overlay-text p {
        font-size: 18px;
        font-family: 'IBM Plex Mono', Arial;
        animation: fadeIn 1s;
    }

    .overlay-text i {
        font-size: 34px;
    }


</style>