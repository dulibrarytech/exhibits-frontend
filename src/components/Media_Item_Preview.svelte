<script>
    /**
     * @component Media_Item_Preview
     * @description Component for displaying a preview image (fullsize or thumbnail size image) for a media item. Will attempt to get a thumbnail or preview image for the item, but will fall back to a placeholder image if no preview is available.
     * 
     * @param {Object} item - The exhibit item object containing metadata and resource information.
     * @param {Object} args - Additional arguments for configuring the component behavior [
     *  args.isInteractive (boolean, default: true) to enable/disable click interaction, 
     *  args.link (string, optional) to specify a URL to navigate to on click instead of dispatching event, 
     * ]
     * @param {number} width - Desired width for the preview image (optional).
     * @param {number} height - Desired height for the preview image (optional).
     * 
     * @event click-item - Dispatched when the item preview is clicked, with the item ID as detail.
     * @event load-error - Dispatched when there is an error loading the preview image, with the image URL as detail.
     * @event image-loaded - Dispatched when the preview image has successfully loaded, with the item ID as detail.
    */
    
    'use strict' 
    
    //import axios from 'axios';
    import { createEventDispatcher } from 'svelte';
    import { Settings } from '../config/settings';
    import ResourceUrl from '../libs/ResourceUrl.js'; 
    import { Kaltura } from '../libs/kaltura.js';
    import * as Logger from '../libs/logger.js';

    import {
        ITEM_TYPE,
        
    } from '../config/global-constants';

    export let item = {};
    export let args;
    export let width = null;
    export let height = null;

    const dispatch = createEventDispatcher();

    const { 
        isThumbnail,
        isInteractive = true,
        link = null,
        title = null,
    } = args;

    // resource url helper
    const RESOURCE = new ResourceUrl(item.is_member_of_exhibit);

    // component options
    const IMAGE_THUMBNAIL_WIDTH = 400;
    const OVERLAY_TEXT_SMALL = "Click to enlarge";
    const OVERLAY_TEXT_LARGE = "Click to view item";

    const {
        exhibitItemDefaultTitle: DEFAULT_ITEM_TITLE,
        imageAssetsPath: IMAGE_ASSETS_PATH, 
        placeholderImage: PLACEHOLDER_IMAGE,

    } = Settings; 

    const {
        uuid: itemId = "",
        item_type: itemType = null,
        is_iiif_item: isIIIFItem = false,
        is_kaltura_item: isKalturaItem = false,
        alt_text: altText = item.is_alt_text_decorative ? null : (item.alt_text || null),

        media = null,
        thumbnail = null,

    } = item;

    // module variables
    let _previewUrl;
    let _isPlaceholderImage;
    let _previewImageElement;
    let _showOverlay = true;

    const init = async () => {
        _isPlaceholderImage = false;
        _previewUrl = await getPreviewUrl(isThumbnail);

        if(!_previewUrl) {
            Logger.module().info(`Could not determine thumbnail source url for item. Item id: ${itemId} Item type: ${itemType}`);
            _previewUrl = RESOURCE.getItemPlaceholderImageUrl(itemType);
            _isPlaceholderImage = true;
            _showOverlay = false;
        }
    }

    const getPreviewUrl = async (isThumbnail=true) => {
        let previewUrl = null;

        switch(itemType) {
            case ITEM_TYPE.IMAGE:
            case ITEM_TYPE.LARGE_IMAGE:
                previewUrl = await getImagePreviewUrl(isThumbnail);
                break;

            case ITEM_TYPE.AUDIO:
            case ITEM_TYPE.VIDEO:
                previewUrl = await getAudioVideoPreviewUrl(isThumbnail);
                break;

            case ITEM_TYPE.PDF:
                previewUrl = await getPdfPreviewUrl(isThumbnail);
                break;

            default:
                Logger.module().error(`Invalid item type: ${itemType} Item: ${itemId}`);
                break;
        }

        return previewUrl;
    }

    const getImagePreviewUrl = async (isThumbnail=true) => {
        let url = null;

        if(isIIIFItem) {
            const {
                image_url: iiifImageUrl = null
            } = item.media_iiif || {};

            const {
                thumbnail_url: iiifThumbnailImageUrl = null,
            } = item.thumbnail_iiif || {};

            url = isThumbnail ?
                iiifThumbnailImageUrl || iiifImageUrl || thumbnail || null : 
                iiifImageUrl || media || null; 
        }
        else {
            url = isThumbnail ? 
                thumbnail || await RESOURCE.getIIIFImageUrl(media, IMAGE_THUMBNAIL_WIDTH) :  // IIIF.getIIIFImageUrl(media, "min")
                await RESOURCE.getIIIFImageUrl(media); // RESOURCE.getIIIFImageUrl(media, "max")
        }

        return url;
    }

    const getAudioVideoPreviewUrl = async (isThumbnail=true) => {
        let url = null;

        if(isKalturaItem) { 
            let{kaltura_id = null} = item;
            url = isThumbnail ? 
                thumbnail || Kaltura.getThumbnailUrl(kaltura_id):
                Kaltura.getThumbnailUrl(kaltura_id, "full");
        }
        else if(isIIIFItem) {
            url = thumbnail || null; 
        }
        else {
            url = RESOURCE.getFileUrl(thumbnail); // thumbnail image is currently the only means of providing any preview image of a local a/v resource
        }

        return url;
    }

    const getPdfPreviewUrl = async (isThumbnail=true) => {
        let url = null;

        const {pdf_open_to_page: page = "1"} = item;

        if(isIIIFItem) {
            const {
                image_url: iiifImageUrl = null,
            } = item.media_iiif || {};

            const {
                thumbnail_url: iiifThumbnailImageUrl = null,
            } = item.thumbnail_iiif || {};

            url = isThumbnail ? 
                iiifThumbnailImageUrl || iiifImageUrl || thumbnail || null : // TODO need to append page parameter to iiifThumbnailImageUrl or iiifImageUrl 
                thumbnail || iiifImageUrl || media || null;
        }
        else {
            // if thumbnail file is present, this will show in the media item preview regardless of the isThumbnail state. if it is not, get a derivative of the "media" file and open to the pdf page specified
            if(thumbnail) {
                url = await RESOURCE.getPdfPreviewImageUrl(thumbnail, IMAGE_THUMBNAIL_WIDTH, height);
            }
            else {
                const width = isThumbnail ? IMAGE_THUMBNAIL_WIDTH : null;
                url = `${ (await RESOURCE.getPdfPreviewImageUrl(media, width, null, page)) }`;
            }
        }

        return url;
    }

    const onClickItem = (event) => {
        let itemId = event.target.getAttribute('data-item-id');
        if(itemId) dispatch('click-item', {itemId});
        if(link) window.location.replace(link);
    }

    const onImageLoadError = (event) => {
        let placeholderImageUrl = `${IMAGE_ASSETS_PATH}/${PLACEHOLDER_IMAGE[itemType || 'DEFAULT']}`;

        Logger.module().error(`Preview image load error. Url: ${_previewUrl}`);
        if(!title) _previewImageElement.parentElement.title = "Preview image failed to load. No item description available";
        _showOverlay = false;

        if(event.target.src.includes(placeholderImageUrl) == false) {
            _previewImageElement.src = placeholderImageUrl;
            if(altText) _previewImageElement.alt = altText;
            _isPlaceholderImage = true;
        }

        dispatch('load-error', {url: _previewUrl});
    }

    const onImageLoad = (event) => {
        dispatch('image-loaded', {itemId});
    }

    init();
</script>

{#if _previewUrl}
    <div class="item-preview-wrapper {itemType == ITEM_TYPE.AUDIO || itemType == ITEM_TYPE.VIDEO ? 'audio-video-preview' : ''}">

        <div class="item-preview {_isPlaceholderImage ? 'placeholder-image' : ''}">
            <button 
                title={title || undefined}
                data-item-id={itemId} 
                tabindex={isInteractive ? undefined : '-1'} 
                aria-label={isInteractive ? `click to open item viewer` : undefined}
                disabled={isInteractive ? false : true}
                on:click={onClickItem} 
            >
                <img 
                    crossorigin="anonymous" 
                    src={_previewUrl} 
                    alt={altText || undefined} 
                    on:load={onImageLoad} 
                    on:error={onImageLoadError} 
                    bind:this={_previewImageElement}
                >
            </button>

            {#if isInteractive && _showOverlay}
                <div class="overlay"></div>
                <div class="overlay-text">
                    <!-- magnifying glass icon -->
                    <!-- <i class="las la-search"></i> -->
                    <p>{OVERLAY_TEXT_SMALL}</p>
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

    .item-preview-wrapper {
        margin-inline: auto;
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
        width: 200px;
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