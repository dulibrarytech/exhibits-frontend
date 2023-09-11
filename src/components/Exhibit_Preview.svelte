<script>
    'use strict'

    import { onMount } from 'svelte';
    // import { Resource } from '../libs/resource';
    import { getExhibitThumbnailUrl } from '../libs/media_helpers';

    export let exhibit = {};

    let titleTextElement;
    let overlayDisplay;

    let exhibitPath = null;
    let thumbnail = null;
    let title;
    let subtitle;
    let styles;

    $: init();

    const init = () => {
        exhibitPath = `/exhibit/${exhibit.uuid}`;
        title = exhibit.title || "";
        subtitle = exhibit.subtitle || "";
        styles = exhibit.styles.hero || {};
        
        if(!thumbnail) thumbnail = getExhibitThumbnailUrl(exhibit);
    }

    const setTheme = () => {
        let {image = {}} = styles;

        /* Set the title text color to match the color of the exhibit hero image text */
        if(image.color) {
            titleTextElement.style.color = image.color;
        }
    }

    const mouseOver = (e) => {
        overlayDisplay = "block";
    }

    const mouseOut = (e) => {
        overlayDisplay = "none";
    }

    const setOverlayDisplay = (isVisible=true) => {
        overlayDisplay = isVisible ? "block" : "none";
    }

    onMount(async () => {
        setOverlayDisplay(false);
        setTheme(); 
    });
</script>

<div class="exhibit-preview" on:mouseenter={mouseOver} on:mouseleave={mouseOut}>
    {#if exhibitPath}
        <a href="{exhibitPath}" bind:this={titleTextElement}>
            <div class="exhibit-thumbnail">
                <img src="{thumbnail}" alt={title} title="{title}"/>

                <!-- <div class="title">
                    {title}
                    {#if subtitle}<hr>{subtitle}{/if}
                </div> -->
            </div>
        </a>
    {/if}
</div>

<div class="overlay" style="display:{overlayDisplay}"></div>

<div class="overlay-text" style="display:{overlayDisplay}">VISIT</div>

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

    .title {
        position: absolute;
        bottom: 0;
        z-index: 10;
        padding: 20px;
    }

    .title hr {
        height: 2px;
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