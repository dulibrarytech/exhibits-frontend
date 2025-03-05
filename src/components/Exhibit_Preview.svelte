<script>
    'use strict'
    
    import { createEventDispatcher } from 'svelte';
    import ResourceUrl from '../libs/ResourceUrl.js'; 

    export let exhibit = {};
    export let link = null;
    export let width = null;
    export let height = null;

    let titleTextElement;

    let exhibitId;
    let thumbnail;
    let heroImage;
    let title;
    let subtitle;
    let styles;

    const dispatch = createEventDispatcher();

    const RESOURCE = new ResourceUrl(exhibit.uuid);

    const EXHIBIT_THUMBNAIL_WIDTH = "400";
    const EXHIBIT_THUMBNAIL_HEIGHT = "400";

    $: init();

    const init = () => {
        exhibitId = exhibit.uuid;
        thumbnail = exhibit.thumbnail_image || null;
        heroImage = exhibit.hero_image || null;
        title = exhibit.title || "";
        subtitle = exhibit.subtitle || "";
        styles = exhibit.styles?.hero || {};

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
</script>

<div class="exhibit-preview">
    <a href={link || undefined} data-exhibit-id={exhibitId} bind:this={titleTextElement} on:click|stopPropagation|preventDefault={onClickPreview} aria-label="enter exhibit {title}">
        <div class="exhibit-thumbnail">
            <img src={thumbnail || ""} alt={title} title={title} onerror="this.onerror=null;this.src='{RESOURCE.getExhibitPlaceholderImageUrl()}';" />
        </div>
    </a>
</div>

<style>
    .exhibit-preview a {
        text-decoration: none;
        font-size: 1.4em;
    }

    .exhibit-preview a,
    .exhibit-preview a:visited {
        color: white;
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
</style>