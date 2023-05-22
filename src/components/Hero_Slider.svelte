<!-- <svelte:head>
    <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
</svelte:head> -->

<script>
    'use strict'

    import { onMount } from 'svelte';

    import { Settings } from '../config/settings';
    import { Resource } from '../libs/resource';
    import { Banners } from '../templates/config/hero-banner';
    import Carousel from 'svelte-carousel';

    export let items = [];

    const DEFAULT_HERO_IMAGE = Settings.default_home_hero_image || null;
    const DEFAULT_BANNER = Settings.defaultBannerTemplate;

    let carousel; // for calling methods of the carousel instance
    let featured = [];

    const init = () => {
        let filtered = items.filter((item) => {
            return item.is_featured || false;
        });

        let image, banner, styles;
        for(let item of filtered) {
            let {
                title=null, 
                subtitle=null, 
                hero_image=null, 
                description=null, // need in exhibits hero slider?
                banner_template = null

            } = item;

            image = hero_image ? getImagePath(hero_image) : null;
            banner = $Banners[banner_template || DEFAULT_BANNER];
            styles = item.styles.hero || null;

            featured.push({title, subtitle, image, banner, styles});
        }
    }

    const getImagePath = (filename) => {
        let path = "";
        if(/^.+\.(jpg|jpeg|png)$/g.test(filename) == true) {
            path = Resource.getUrl(filename);
        }
        else console.error(`Invalid hero image type. Allowed types: jpg, png. File: ${filename}`);
        return path;
    }

    const handleNextClick = () => {
        carousel.goToNext()
    }

    const setSliderImageTheme = () => {
        let imageElement, textElement; // banner elements

        for(let index in featured) {
            let {image={}, text={}} = featured[index].styles;

            imageElement = document.querySelector(`[data-index='${index}'] .banner .hero-image`);
            for(let style in image) {
                imageElement.style[style] = image[style];
            }

            textElement  = document.querySelector(`[data-index='${index}'] .banner .hero-text`);
            for(let style in text) {
                textElement.style[style] = text[style];
            }
        }

    }

    $: init();

    onMount(async () => {
        console.log("TEST mount hero comp")
        setSliderImageTheme();
    });
</script>

<div class="hero "> <!-- TODO: bootstrap grid rows -->
    {#if featured.length > 0}
    
        <Carousel bind:this={carousel}>
            {#each featured as item, index} 
                <div class="slider-item" data-index="{index}">
                    <svelte:component this={item.banner} args={item} />
                </div>
            {/each}
        </Carousel>

    {:else if DEFAULT_HERO_IMAGE}
        <div class="default-background" style="background-image: url({DEFAULT_HERO_IMAGE})" />

    {/if}
</div>

<style>
    .hero {
        height: 400px;
        background: #e5e3e1;
    }
</style>