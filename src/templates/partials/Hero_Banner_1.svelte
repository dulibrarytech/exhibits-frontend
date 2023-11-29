<script>
    'use strict'
    /*
     * hero template #1
     *
     * fullwidth hero image
     * title overlay
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
            <div class="overlay-text text title">{@html title}</div>
            {#if subtitle}<div class="overlay-text text subtitle">{@html subtitle}</div>{/if}
        </div>
    </section>
    
    {#if description}
        <section class="hero-text" bind:this={textElement}>
            <div class="description-text">
                <p>{@html description}</p>
            </div>
        </section>
    {/if}
</div>

<style>
    .banner {
        position: relative;
        height: 50%;
    }

    .hero-image {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
    }

    .hero-text {
        color: white;
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

    .description-text > p {
        margin: 0;
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