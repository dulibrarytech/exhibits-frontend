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

    export let styles = null;
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
    }

    onMount(async () => {
        dispatch('mount', {});

        if(styles.color) bannerElement.style.color = styles.color;
        if(styles.backgroundColor) bannerElement.style.backgroundColor = styles.backgroundColor;

        /* TEMP: fixed height hero image update - use background image and sizing, fixed height */
        // if(image) imageElement.style.backgroundImage = `url("${image}")`;
    });

    init();
</script>

<div class="banner" bind:this={bannerElement}>
    <h1 style="display: none;">{titleText}</h1>
    <div class="hero-image" bind:this={imageElement}>
        <img src={image} alt={DEFAULT_IMAGE_ALT_TEXT} title={titleText} />

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
        /* TEMP: fixed height hero image update - use background image and sizing, fixed height */
        /* background-position: center;
        background-repeat: no-repeat;
        background-size: cover; */
        /* height: 85vh; */

        position: relative;
    }

    .hero-image > img {
        width: 100%;
    }

    .hero-image-text {
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
    }

    .title {
        font-size: 30px;
    }

    .subtitle {
        font-size: 28px;
    }

    @media screen and (min-width: 480px) {
        /* .title {
            font-size: 31px;
        }

        .subtitle {
            font-size: 16px;
        } */
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