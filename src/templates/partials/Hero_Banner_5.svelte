<script>
    'use strict'
    /*
     * hero template #5
     *
     * fullwidth hero image with title overlay
     */
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';

    export let args = {};

    let {image=null, title="exhibit title", subtitle=null, description=null} = args;

    const dispatch = createEventDispatcher();

    onMount(async () => {
        dispatch('mount', {});
        
        document.querySelector('.hero-image').style.backgroundImage = `url("${image}")`; // use bind element
    });
</script>

<div class="banner">
    <section class="hero-image">
        <div class="hero-image-text">
            {#if title}<div class="overlay-text text title">{@html title}</div>{/if}
            {#if subtitle}<div class="overlay-text text subtitle">{@html subtitle}</div>{/if}
        </div>
    </section>
</div>

<style>
    .banner {
        position: relative;
        height: 50%
    }

    .hero-image {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
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
        font-size: 5.25em;
    }

    .subtitle {
        font-size: 2.1em;
    }
</style>