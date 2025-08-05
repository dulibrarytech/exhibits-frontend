<script>
    'use strict'
    
    import { createEventDispatcher } from 'svelte';
    import ResourceUrl from '../libs/ResourceUrl.js'; 
    import { Settings } from '../config/settings.js';
    //import { stripHtmlTags } from '../libs/data_helpers';
    import { getInnerText } from '../libs/exhibits_data_helpers';

    export let exhibit = {};
    export let link = null;
    export let width = null;
    export let height = null;

    export let args = {};

    const DEFAULT_PREVIEW_IMAGE_ALT_TEXT = Settings.exhibitPreviewImageAltText;

    let {
        showTitle = false,
        overlay = true
    } = args;

    let titleTextElement;

    let exhibitId;
    let thumbnail;
    let heroImage;
    let title;
    let subtitle;
    let altText;
    let styles;

    const dispatch = createEventDispatcher();

    const RESOURCE = new ResourceUrl(exhibit.uuid);

    const EXHIBIT_THUMBNAIL_WIDTH = "400";
    const EXHIBIT_THUMBNAIL_HEIGHT = "400";
    const DEFAULT_EXHIBIT_OVERLAY_TEXT = "VISIT";

    $: init();

    const init = () => {
        exhibitId = exhibit.uuid;
        thumbnail = exhibit.thumbnail_image || null;
        heroImage = exhibit.hero_image || null;
        title = getInnerText(exhibit.title || ""); 
        subtitle = getInnerText(exhibit.subtitle || ""); 
        styles = exhibit.styles?.hero || {};

        altText = `${title} ${subtitle || undefined} ${DEFAULT_PREVIEW_IMAGE_ALT_TEXT}`;

        if(!width) width = EXHIBIT_THUMBNAIL_WIDTH;
        if(!height) height = EXHIBIT_THUMBNAIL_HEIGHT;

        if(thumbnail) {
            thumbnail = RESOURCE.getFileUrl(thumbnail);
        }
        else if(heroImage) {
            let file = heroImage || "no-image-available";
            thumbnail = RESOURCE.getImageDerivativeUrl(file, {
                type: 'crop',
                width,
                height
            });
        }
    }

    const onClickPreview = (event) => {
        let exhibitId = event.target.getAttribute('data-exhibit-id');
        if(exhibitId) dispatch('click-preview', {exhibitId});
        if(link) window.location.replace(link);
    }

    const onImageLoad = (event) => {
        dispatch('image-loaded', {itemId});
    }
</script>

<div class="exhibit-preview">
    <a href={link || undefined} data-exhibit-id={exhibitId} bind:this={titleTextElement} on:click|stopPropagation|preventDefault={onClickPreview} aria-label="enter exhibit {title}">
        <div class="exhibit-thumbnail">
            <img src={thumbnail || ""} alt={altText} on:load={onImageLoad} onerror="this.onerror=null;this.src='{RESOURCE.getExhibitPlaceholderImageUrl()}';" />

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

    .exhibit-preview-text hr {
        color: #959391;
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