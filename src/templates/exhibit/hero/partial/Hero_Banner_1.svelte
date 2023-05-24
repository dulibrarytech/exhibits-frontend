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
    export let height = "700px";

    let {image=null, title="untitled", subtitle=null, description=null} = args;

    let imageElement;
    let textElement;

    const dispatch = createEventDispatcher();

    onMount(async () => {
        imageElement.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${image}")`;

        dispatch('mount', {imageElement, textElement});
    });
</script>

<div class="banner">
    <section class="hero-image" style="height: {height}" bind:this={imageElement}>
        <div class="hero-image-text">
            <div class="overlay-text text title">{title}</div>
            {#if subtitle}<div class="overlay-text text subtitle">{subtitle}</div>{/if}
        </div>
    </section>
    
    {#if description}
        <section class="hero-text" bind:this={textElement}>
            <div class="container px-4">
                <div class="row gx-4 justify-content-center">
                    <div class="col-lg-10">
                        <p>{@html description}</p>
                    </div>
                </div>
            </div>
        </section>
    {/if}
</div>

<style>
    header {
        padding: 0;
    }

    hr {
        height: 6px;
    }

    .banner {
        position: relative;
        height: 50%;
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
        /* min-height: 700px; */
    }

    .hero-text {
        color: white;
        padding-top: 50px;
        padding-bottom: 50px;
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
        font-size: 2.2em;
    }

    .subtitle {
        font-size: 1em;
    }

    @media (min-width: 460px) {
        .title {
            font-size: 3.2em;
        }

        .subtitle {
            font-size: 1em;
        }
    }

    @media (min-width: 576px) {
        .title {
            font-size: 3.7em;
        }

        .subtitle {
            font-size: 1em;
        }
    }

    @media (min-width: 768px) {
        .title {
            font-size: 4.2em;
        }

        .subtitle {
            font-size: 1.35em;
        }
    }

    @media (min-width: 992px) {
        .title {
            font-size: 5.2em;
        }

        .subtitle {
            font-size: 1.75em;
        }
    }
</style>