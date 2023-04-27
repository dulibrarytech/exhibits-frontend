<script>
    'use strict'
    /*
     * Hero_Banner_1 
     * hero template
     *
     * fullwidth hero image
     * title and subtitle overlay
     * fullwidth descriptive text section 
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

<header class="banner">
    <div class="hero-image">
        <div class="hero-text">
            <div id="title" class="overlay-text text">{title}</div>
            <hr>
            {#if subtitle}<div id="subtitle" class="overlay-text text">{subtitle}</div>{/if}
        </div>
    </div>
    
    {#if description}
        <section class="introduction">
            <div class="container px-4">
                <div class="row gx-4 justify-content-center">
                    <div class="col-lg-8">
                        <p>{@html description}</p>
                    </div>
                </div>
            </div>
        </section>
    {/if}
</header>

<style>
    header {
        padding: 0;
    }

    hr {
        height: 6px;
    }

    .banner {
        position: relative;
        /* min-height: 50%; */
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
        /* height: 100%; */
    }

    .hero-text {
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
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