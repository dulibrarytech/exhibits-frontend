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

    export let args = {};

    let {image=null, title="exhibit title", subtitle=null} = args;

    const dispatch = createEventDispatcher();

    onMount(async () => {
        dispatch('mount', {});
        
        document.querySelector('.hero-image').style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${image}")`;
    });
</script>

<div class="banner">
    <section class="hero-image"></section>
    
    <section class="hero-text">
        {#if title}
            <div class="title-text">
            <!-- <div class="title-text" style="padding: {STYLES.sectionPadding}"> -->
                <div id="title" class="overlay-text text">{@html title}</div>
                <hr>
                {#if subtitle}<div id="subtitle" class="overlay-text text">{@html subtitle}</div>{/if}
            </div>
        {/if}
    </section>
</div>

<style>
    .banner {
        position: relative;
    }

    .hero-image {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        min-height: 700px;
    }

    .title-text {
        padding: 3.5em;
    }

    #title {
        font-size: 2.2em;
    }

    #subtitle {
        font-size: 0.8em;
    }

    @media (min-width: 992px) {
        #title {
            font-size: 4.2em;
        }

        #subtitle {
            font-size: 1.8em;
        }
    }

    @media (min-width: 768px) {
        #title {
            font-size: 3.2em;
        }

        #subtitle {
            font-size: 1.3em;
        }
    }

    @media (min-width: 576px) {
        #title {
            font-size: 2.7em;
        }

        #subtitle {
            font-size: 1em;
        }
    }
</style>