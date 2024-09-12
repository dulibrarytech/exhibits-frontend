<script>
    'use strict'

    import { Settings } from '../config/settings';
    import { Banners } from '../templates/config/hero-banner';
    import { Resource } from '../libs/resource';
    import { sanitizeHtmlString } from '../libs/data_helpers';

    import Alert from './Alert.svelte';

    export let data = null;
    export let styles = null;

    let bannerData = {};
    let heroSection = null;

    const DEFAULT_BANNER = Settings.defaultBannerTemplate;

    let banner = null;
    let image = null;
    let alert = null;

    $: if(data) init();

    const init = () => {
        let { 
            banner_template = null, 
            hero_image = null, 
            alert_text = null
            
        } = data;
        
        if(hero_image) image = getImagePath(hero_image);
        if(alert_text) alert = sanitizeHtmlString(alert_text);

        banner = $Banners[banner_template || DEFAULT_BANNER];
        bannerData = {
            image,
            title: data.title || "",
            subtitle: data.subtitle || null,
            description: data.description || null
        }
    }

    const getImagePath = (filename) => {
        let path = "";
        if(/^.+\.(jpg|jpeg|png)$/g.test(filename) == true) {
            path = Resource.getFileUrl(filename);
        }
        else console.error(`Invalid hero image type. Allowed types: jpg, png. File: ${hero_image}`);
        return path;
    }
</script>

<header class="hero-section" bind:this={heroSection}>
    {#if banner}
        <svelte:component this={banner} args={bannerData} styles={styles.template} />
    {/if}

    {#if alert }
        <Alert text={alert} />
    {/if}
</header>

<style>
    :global(.description-text) {
        padding: 50px 8%;
    }
</style>