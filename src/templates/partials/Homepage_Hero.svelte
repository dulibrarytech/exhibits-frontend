<script>
    'use strict'

    import { onMount } from 'svelte';
    import { Settings } from '../../config/settings.js';

    const LAYOUT = {
        BACKGROUND_IMAGE: 'background_image',
        HIGHLIGHT_ITEM: 'highlight_item'
    }

    const HERO_LAYOUT = LAYOUT.HIGHLIGHT_ITEM;

    let {   
        homepageHeroImage,
    } = Settings;

    let _heroElement;

    onMount(async () => {
        if(HERO_LAYOUT == LAYOUT.BACKGROUND_IMAGE) {
            _heroElement.style.background = `url('${homepageHeroImage}') no-repeat center center`;
        }
    })
</script>

<div class="homepage-hero" bind:this={_heroElement}>

    {#if HERO_LAYOUT == LAYOUT.HIGHLIGHT_ITEM}
        <div class="container-large">
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
