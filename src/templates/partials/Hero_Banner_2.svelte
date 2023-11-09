<script>
    'use strict'
    /*
     * Hero_Banner_2
     * hero template
     *
     * fullwidth hero image
     * fullwidth title and description
     */
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';

    export let args = {};

    let {image=null, title="exhibit title", subtitle=null, description=null} = args;

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
            <div id="title" class="overlay-text text">{@html title}</div>
            {#if subtitle}<div id="subtitle" class="overlay-text text">{@html subtitle}</div>{/if}
        </div>
        {/if}
        
        {#if description}
            <hr>
            <div class="description-text">
                <p>{@html description}</p>
            </div>
        {/if}
    </section>
</div>

<style>
    header {
        padding: 0;
    }

    .banner {
        position: relative;
        height: 50%
    }

    .introduction {
        font-style: inherit;
        padding-top: 75px;
        padding-bottom: 75px;
    }

    .hero-image {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        min-height: 700px;
    }

    .hero-text {
        color: white;
    }

    .hero-text-line {
        margin: 0 auto;
        width: 70%;
    }

    .hero-text-line > hr {
        height: 6px;
    }

    .description-text > p {
        margin: 0;
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