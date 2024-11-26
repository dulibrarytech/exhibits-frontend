<script>
    'use strict'

    import { Settings } from '../config/settings';
    import { Banners } from '../templates/config/hero-banner';
    import { Resource } from '../libs/resource';
    import { stripHtmlTags } from '../libs/data_helpers';
    import * as Logger from '../libs/logger.js';

    export let data = null;
    export let styles = null;

    let bannerData = {};
    let heroSection = null;

    const DEFAULT_BANNER = Settings.defaultBannerTemplate;

    let banner = null;
    let image = null;

    $: if(data) init();

    const init = () => {
        let { 
            banner_template = null, 
            hero_image = null, 
            
        } = data;
        
        if(hero_image) image = getHeroImageUri(data);

        banner = $Banners[banner_template || DEFAULT_BANNER];
        bannerData = {
            image,
            title: data.title || "",
            titleText: stripHtmlTags(data.title) || null,
            subtitle: data.subtitle || null,
            description: data.description || null
        }
    }

    const getHeroImageUri = (item) => {
        let path = "";
        let {hero_image="", uuid} = item;
        if(/^.+\.(jpg|jpeg|png)$/g.test(hero_image) == true) {
            path = Resource.getResourceUri(hero_image, uuid);
        }
        else Logger.module().error(`Invalid hero image type. Allowed types: jpg, png. File: ${path}`);
        return path;
    }
</script>

<header class="hero" bind:this={heroSection}>
    {#if banner}
        <svelte:component this={banner} args={bannerData} styles={styles.template} />
    {/if}
</header>

<style>
    :global(.description-text) {
        padding: 50px 8%;
    }
</style>