
<script>
    /**
     * Exhibit_Preview.svelte
     * 
     * Component for displaying a preview of an exhibit, including thumbnail image, title, and subtitle. 
     * The component will attempt to use the exhibit thumbnail image if available, and if not, will attempt to use the hero image. If neither are available, no image will be displayed. The component also includes an overlay with text that appears on hover, and clicking the preview will navigate to the exhibit page.
     * 
     * @param {Object} exhibit - The exhibit data object containing information about the exhibit, including thumbnail and hero image information.
     * @param {string} link - The URL to navigate to when the exhibit preview is clicked. If not provided, the preview will not be clickable.
     * @param {number} width - The desired width of the exhibit preview image. If not provided, a default width will be used.
     * @param {number} height - The desired height of the exhibit preview image. If not provided, a default height will be used.
     * @param {Object} args - An object containing additional arguments for customizing the exhibit preview display, including:
     *      - showTitle: A boolean indicating whether to display the exhibit title and subtitle text below the thumbnail image. Default is false.
     *      - overlay: A boolean indicating whether to display an overlay with text on hover over the thumbnail image. Default is true.
     * 
     * @event click-preview - Dispatched when the exhibit preview is clicked, with the exhibitId included in the event detail.
     * @event image-loaded - Dispatched when the exhibit preview image has finished loading, with the exhibitId included in the event detail.
    */
    'use strict'
    
    import axios from 'axios';
    import ResourceUrl from '../libs/ResourceUrl.js'; 
    import * as Logger from '../libs/logger.js';
    import { createEventDispatcher } from 'svelte';
    import { Settings } from '../config/settings.js';
    import { getInnerText } from '../libs/exhibits_data_helpers';

    export let exhibit = {};
    export let link = null;
    export let width = null;
    export let height = null;

    export let args = {};

    const DEFAULT_PREVIEW_IMAGE_ALT_TEXT = Settings.exhibitPreviewImageAltText;

    const {
        showTitle = false,
        overlay = true
    } = args;

    // display fields
    let thumbnailSourceUrl;
    let altText;

    // exhibit data fields
    let exhibitId;
    let title;
    let subtitle;

    const dispatch = createEventDispatcher();

    const RESOURCE = new ResourceUrl(exhibit.uuid);

    // module settings
    const EXHIBIT_THUMBNAIL_WIDTH = "400";
    const EXHIBIT_THUMBNAIL_HEIGHT = "400";
    const DEFAULT_EXHIBIT_OVERLAY_TEXT = "VISIT";

    $: init();

    const init = async () => {

        // init exhibit data fields
        exhibitId   = exhibit.uuid;
        title       = getInnerText(exhibit.title || ""); 
        subtitle    = getInnerText(exhibit.subtitle || ""); 
        altText     = `${title || ""} ${subtitle || ""} ${DEFAULT_PREVIEW_IMAGE_ALT_TEXT}`;

        // set default width and height if not provided
        if(!width) width = EXHIBIT_THUMBNAIL_WIDTH;
        if(!height) height = EXHIBIT_THUMBNAIL_HEIGHT;

        thumbnailSourceUrl = await getThumbnailSourceUrl();
        if(!thumbnailSourceUrl) {
            Logger.module().info(`No thumbnail or hero image available for exhibit: ${exhibitId}. No preview image will be displayed.`);    
            thumbnailSourceUrl = `${RESOURCE.getExhibitPlaceholderImageUrl()}`;
        }
    }

    const getThumbnailSourceUrl = async () => {
        let url = null;

        const {
            thumbnail_iiif = null,
            thumbnail = null
        } = exhibit;

        if(thumbnail_iiif) {
            url = thumbnail_iiif.thumbnail_url || null;
        }

        else if(thumbnail) {
            try {
                url = await RESOURCE.getIIIFImageUrl(thumbnail, width, height);
            }
            catch(error) {
                Logger.module().error(`Could not get IIIF image url for thumbnail, Thumbnail id: ${thumbnail} Message: ${error}`);
            }
        }

        return url;
    }   

    const onClickPreview = ({target}) => {
        dispatch('click-preview', {exhibitId});
        if(link) window.location.replace(link);
    }

    const onImageLoad = ({target}) => {
        dispatch('image-loaded', {itemId: exhibitId});
    }

    const onImageLoadError = (event) => {
        Logger.module().error("Error loading exhibit preview image for exhibit:", exhibitId);
        thumbnailSourceUrl = `${RESOURCE.getExhibitPlaceholderImageUrl()}`;
    }
</script>

<div class="exhibit-preview">

    {#if thumbnailSourceUrl}
        <a href={link || undefined} data-exhibit-id={exhibitId} on:click|stopPropagation|preventDefault={onClickPreview} aria-label="enter exhibit {title}">
            <div class="exhibit-thumbnail">

                <img src={thumbnailSourceUrl} alt={altText} on:load={onImageLoad} on:error={onImageLoadError} />

                {#if overlay}
                    <div class="overlay"></div>
                    <div class="overlay-text">
                        {DEFAULT_EXHIBIT_OVERLAY_TEXT}
                    </div>
                {/if}

            </div>

            {#if showTitle}
                <div class="exhibit-preview-title" aria-hidden="true"> <!-- TODO use:formatter -->
                    {title || "Untitled Exhibit"}
                </div>
                {#if exhibit.subtitle}
                    <div class="exhibit-preview-subtext" aria-hidden="true">{subtitle}</div> <!-- TODO use:formatter -->
                {/if}
            {/if}
        </a>
    {/if}
</div>

<style>
    .exhibit-preview a {
        color: initial;
    }
    .exhibit-preview a:hover {
        text-decoration: none;
    }

    .exhibit-thumbnail {
        position: relative;
    }

    .exhibit-thumbnail > img {
        width: 100%;
        height: 100%;
        position: relative;
        border-radius: 5px;
    }

    .exhibit-preview-title {
        margin-top: 20px;
        font-size: 18px;
    }

    .exhibit-preview-subtext {
        margin-top: 10px;
        color: #828281;
        font-size: 16px;
    }

    .exhibit-thumbnail:hover .overlay,
    .exhibit-thumbnail:hover .overlay-text {
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
        opacity: 0.4;
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
        font-size: 24px;
        text-align: center;
        pointer-events: none;
    }
</style>