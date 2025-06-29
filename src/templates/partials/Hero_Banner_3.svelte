<script>
    'use strict'
    /*
     * hero template #3
     *
     * fullwidth hero image with title overlay
     */
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { convertPxValuesToEm } from '../../libs/data_helpers';
    import { Settings } from '../../config/settings';

    export let styles = {};
    export let args = {};

    const dispatch = createEventDispatcher();

    const BASE_TITLE_FONT_SIZE = 84;
    const BASE_SUBTITLE_FONT_SIZE = 34;
    const DEFAULT_IMAGE_ALT_TEXT = Settings.exhibitHeroImageAltText;

    let bannerElement;
    let imageElement;

    let {image=null, title="exhibit title", subtitle=null, titleText = ""} = args;

    const init = () => {
        title = convertPxValuesToEm(title, BASE_TITLE_FONT_SIZE);
        
        if(subtitle) subtitle = convertPxValuesToEm(subtitle, BASE_SUBTITLE_FONT_SIZE);
        if(!image) console.log("Hero image null path");
    }

    onMount(async () => {
        dispatch('mount', {});

        if(styles.color) bannerElement.style.color = styles.color;
        if(styles.backgroundColor) bannerElement.style.backgroundColor = styles.backgroundColor;

        if(image) imageElement.style.backgroundImage = `url("${image}")`;
    });

    init();
</script>

<div class="banner" bind:this={bannerElement}>
    <h1 style="display: none;">{titleText}</h1>
    <div class="hero-image" bind:this={imageElement}>
        {#if image}
            <img src={image} alt={DEFAULT_IMAGE_ALT_TEXT} title={titleText} />
        {/if}

        <div class="hero-image-text">
            {#if title}<div class="overlay-text text title">{@html title}</div>{/if}
            {#if subtitle}<hr><div class="overlay-text text subtitle">{@html subtitle}</div>{/if}
        </div>
    </div>
</div>

<style>
    .banner {
        position: relative;
    }

    .hero-image {
        min-height: 300px;
        display: table;
        background-size: cover;
    }

    .hero-image > img {
        width: 100%;
        display: none;
    }

    .hero-image-text {
        width: 90%;
        margin: auto;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        padding: 40px;
        position: static;
        opacity: 0.94;
    }

    .title {
        font-size: 30px;
    }

    .subtitle {
        font-size: 28px;
        margin: 0 auto;
        max-width: 900px;
    }

    @media screen and (min-width: 480px) {

    }

    @media screen and (min-width: 576px) {
        .title {
            font-size: 42px;
        }

        .subtitle {
            font-size: 33px;
        }
    }

    @media screen and (min-width: 768px) {
        .title {
            font-size: 56px;
        }

        .subtitle {
            font-size: 41px;
        }

        .hero-image > img {
            display: inline;
        }

        .hero-image {
            position: relative;
            display: block;
        }

        .hero-image-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
        }
    }

    @media screen and (min-width: 992px) {
        .title {
            font-size: 63px;
        }

        .subtitle {
            font-size: 46px;
        }
    }

    @media screen and (min-width: 1280px) {
        .title {
            font-size: 84px;
        }

        .subtitle {
            font-size: 52px;
        }
    }
</style>