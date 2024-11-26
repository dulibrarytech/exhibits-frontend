<script>
    'use strict'

    import { onMount } from 'svelte';

    import { Settings } from '../config/settings';
    import { Resource } from '../libs/resource';
    import { Banners } from '../templates/config/hero-banner';
    import Carousel from 'svelte-carousel';
    import * as Logger from '../libs/logger.js';

    export let items = [];

    const DEFAULT_HERO_IMAGE = Settings.defaultHeroImage || null;
    const DEFAULT_BANNER = Settings.defaultBannerTemplate;

    let autoplay = Settings.heroSliderAutoplayEnabled || false;
    let autoplayDuration = Settings.heroSliderAutoplayDuration || "3000";

    let carousel; // for calling methods of the carousel instance
    let featured = [];

    const init = () => {
        let id, image, banner, styles;

        let filtered = items.filter((item) => {
            return item.is_featured || false;
        });

        for(let item of filtered) {
            let {
                title=null, 
                subtitle=null, 
                hero_image=null, 
                banner_template=null

            } = item;

            id = item.uuid;
            image = hero_image ? getHeroImageUri(item) : null;
            banner = $Banners[banner_template || DEFAULT_BANNER];
            styles = item.styles.hero || null;

            featured.push({id, image, banner, styles, title, subtitle});
        }
    }

    /* Returns relative path to the file in the resource library */
    const getHeroImageUri = (item) => {
        let path = "";
        let {hero_image="", uuid} = item;
        if(/^.+\.(jpg|jpeg|png)$/g.test(hero_image) == true) {
            path = Resource.getResourceUri(hero_image, uuid);
        }
        else Logger.module().error(`Invalid hero image type. Allowed types: jpg, png. File: ${path}`);
        return path;
    }

    /* Apply exhibit hero theme to each exhibit banner in the featured exhibit slider */
    const setSlideTheme = () => {
        let imageElement, textElement;

        for(let index in featured) {
            let {image=null, text=null} = featured[index].styles || {};

            if(image) {
                imageElement = document.querySelector(`[data-index='${index}'] .banner .hero-image-text`);
                if(imageElement) {
                    Object.assign(imageElement.style, image)
                }
            }

            if(text) {
                textElement  = document.querySelector(`[data-index='${index}'] .banner .hero-text`);
                if(textElement) {
                    Object.assign(textElement.style, text)
                }
            }
        }
    }

    $: init();

    onMount(async () => {
        setSlideTheme();
    });
</script>

<div class="hero">
    {#if featured.length > 0}

        <Carousel bind:this={carousel} {autoplay} {autoplayDuration}>
            {#each featured as item, index} 
                <div class="slider-item slide" data-index="{index}">
                    <a href="/exhibit/{item.id}"><svelte:component this={item.banner} args={item} height="400px" on:mount={setSlideTheme} /></a> <!-- TODO banner height in settings -->
                </div>
            {/each}
        </Carousel>

    {:else if DEFAULT_HERO_IMAGE}
        <div class="default-background" style="background-image: url({DEFAULT_HERO_IMAGE})" />

    {/if}
</div>

<style>
    .hero {
        min-height: 400px;
        background: #e5e3e1;
    }

    :global(.sc-carousel__arrow-container) {
        position: absolute;
        z-index: 10;
        top: calc(50% - 20px);
    }
    
    :global(.sc-carousel-arrow__circle) {
        width: 40px !important;
        height: 40px !important;
        background-color: white !important;
        opacity: 0.29 !important;
    }

    :global(.sc-carousel-arrow__arrow) {
        width: 10px;
        height: 10px;
    }

    :global(.sc-carousel__arrow-container:nth-of-type(3)) {
        right: 0;
    }
</style>