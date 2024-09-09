<script>
    'use strict'
    /*
     * hero template #3
     *
     * fullwidth hero image with title overlay
     */
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';

    export let styles = null;
    export let args = {};

    let bannerElement;
    let imageElement;

    let {image=null, title="exhibit title", subtitle=null} = args;

    const dispatch = createEventDispatcher();

    onMount(async () => {
        dispatch('mount', {});

        if(styles.color) bannerElement.style.color = styles.color;
        if(styles.backgroundColor) bannerElement.style.backgroundColor = styles.backgroundColor;
        // if(image) imageElement.style.backgroundImage = `url("${image}")`;
    });
</script>

<div class="banner" bind:this={bannerElement}>
    <div class="hero-image" bind:this={imageElement}>
        <img src={image} alt={title} title={title} />

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
        color: white;
        width: 90%;
    }

    .title {
        font-size: 1.45em;
    }

    .subtitle {
        font-size: 0.7em;
    }

    @media screen and (min-width: 480px) {
        .title {
            font-size: 1.95em;
        }

        .subtitle {
            font-size: 0.9em;
        }
    }

    @media screen and (min-width: 768px) {
        .title {
            font-size: 2.95em;
        }

        .subtitle {
            font-size: 1.1em;
        }
    }

    @media screen and (min-width: 992px) {
        .title {
            font-size: 3.95em;
        }

        .subtitle {
            font-size: 1.5em;
        }
    }

    @media screen and (min-width: 1280px) {
        .title {
            font-size: 5.25em;
        }

        .subtitle {
            font-size: 2.1em;
        }
    }
</style>