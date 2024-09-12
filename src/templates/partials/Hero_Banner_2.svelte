<script>
    'use strict'
    /*
     * hero template #2
     *
     * fullwidth hero image
     * fullwidth title section below image
     */
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { convertPxValuesToEm } from '../../libs/data_helpers';

    export let styles = null;
    export let args = {};

    let bannerElement;

    let {image=null, title="exhibit title", subtitle=null} = args;

    const dispatch = createEventDispatcher();

    const BASE_TITLE_FONT_SIZE = 70;
    const BASE_SUBTITLE_FONT_SIZE = 40;

    const init = () => {
        title = convertPxValuesToEm(title, BASE_TITLE_FONT_SIZE);
    }

    onMount(async () => {
        dispatch('mount', {});
        if(styles) Object.assign(bannerElement.style, styles);
    });

    init();
</script>

<div class="banner" bind:this={bannerElement}>
    <div class="hero-image">
        <img src={image} alt={title} title={title} />
    </div>

    
    <div class="hero-text">
        {#if title}
            <div class="title-text">
            <!-- TODO apply global padding style -->
            <!-- <div class="title-text" style="padding: {STYLES.sectionPadding}"> -->
                <div id="title" class="overlay-text text">{@html title}</div>
                {#if subtitle}<hr><div id="subtitle" class="overlay-text text">{@html subtitle}</div>{/if}
            </div>
        {/if}
    </div>
</div>

<style>
    .banner {
        position: relative;
    }

    .hero-image {
        position: relative;
    }

    .hero-image > img {
        width: 100%;
    }

    .title-text { /* TODO remove when global padding style is implemented */
        padding: 3.5em;
    }

    #title {
        font-size: 48px;
    }

    #subtitle {
        font-size: 22px;
    }

    @media (min-width: 576px) {
        #title {
            font-size: 51px;
        }

        #subtitle {
            font-size: 22px;
        }
    }

    @media (min-width: 768px) {
        #title {
            font-size: 60px;
        }

        #subtitle {
            font-size: 29px;
        }
    }

    @media (min-width: 992px) {
        #title {
            font-size: 70px;
        }

        #subtitle {
            font-size: 40px;
        }
    }
</style>