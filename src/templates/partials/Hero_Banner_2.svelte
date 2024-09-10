<script>
    'use strict'
    /*
     * hero template #2
     *
     * fullwidth hero image
     * fullwidth title section below image
     */
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';

    export let styles = null;
    export let args = {};

    let bannerElement;

    let {image=null, title="exhibit title", subtitle=null} = args;

    const dispatch = createEventDispatcher();

    onMount(async () => {
        dispatch('mount', {});
        if(styles) Object.assign(bannerElement.style, styles);
    });
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
        font-size: 2.2em;
    }

    #subtitle {
        font-size: 0.8em;
    }

    @media (min-width: 576px) {
        #title {
            font-size: 2.3em;
        }

        #subtitle {
            font-size: 1em;
        }
    }

    @media (min-width: 768px) {
        #title {
            font-size: 2.7em;
        }

        #subtitle {
            font-size: 1.3em;
        }
    }

    @media (min-width: 992px) {
        #title {
            font-size: 3.2em;
        }

        #subtitle {
            font-size: 1.8em;
        }
    }
</style>