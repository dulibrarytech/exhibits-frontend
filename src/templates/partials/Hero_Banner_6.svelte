<script>
    'use strict'
    /*
     * hero template #6
     *
     * fullwidth hero image with title overlay, and description text overlay below title
     */
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';

    export let args = {};

    let {image=null, title="exhibit title", subtitle=null, description=null} = args;

    const dispatch = createEventDispatcher();

    onMount(async () => {
        dispatch('mount', {});

        console.log("TEST mounted banner: banner element:", document.querySelector('.banner'))
        console.log("TEST mounted description: description element:", document.querySelector('.description-text'))
        
        document.querySelector('.hero-image').style.backgroundImage = `url("${image}")`;
    });
</script>

<div class="banner">
    <section class="hero-image">
        <div class="hero-image-text">
            {#if title}<div class="overlay-text text title">{@html title}</div>{/if}
            {#if subtitle}<div class="overlay-text text subtitle">{@html subtitle}</div>{/if}

            {#if description}
                <br>
                <hr>
                <div class="description-text overlay-text">
                    <p>{@html description}</p>
                </div>
            {/if}
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
    }

    .hero-image-text {
        text-align: center;
        color: white;
        width: 90%;
        margin: 0 auto;
        padding: 50px 0;
    }

    .hero-image-text > hr {
        /* font-size: 2em; */
    }
 
    .title {
        font-size: 4.85em;
    }

    .subtitle {
        font-size: 2.1em;
    }
</style>