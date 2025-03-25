<script>
    'use strict'

    // this might be a template

    import { onMount } from 'svelte';
    import { Settings } from '../config/settings.js';

    export let exhibit;

    const LAYOUT = {
        BACKGROUND_IMAGE: 'background_image',
        HIGHLIGHT_ITEM: 'highlight_item'
    }

    const HERO_LAYOUT = LAYOUT.HIGHLIGHT_ITEM;
    const BACKGROUND_IMAGE_PATH = "/assets/images/AAC-exhibits.jpg";

    let heroElement;

    onMount(async () => {
        if(HERO_LAYOUT == LAYOUT.BACKGROUND_IMAGE) {
            heroElement.style.background = `url('${BACKGROUND_IMAGE_PATH}')`;
        }
    })
</script>

<div class="homepage-hero" bind:this={heroElement}>

    {#if HERO_LAYOUT == LAYOUT.HIGHLIGHT_ITEM}
        <div class="container">
            <div class="row">

                <!-- highlight exhibit title, description -->
                <div class="col-sm-12 col-md-6">

                </div>

                <!-- highlight exhibit preview -->
                <div class="col-sm-12 col-md-6">

                </div>

            </div>
        </div>
    {/if}
</div>

<style>
    .homepage-hero {
        height: 400px;
        background-color: #e5e3e1;
        opacity: 0.6;
    }
</style>