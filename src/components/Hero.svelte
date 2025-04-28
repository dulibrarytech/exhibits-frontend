<script>
    'use strict'

    import { Settings } from '../config/settings';
    import { Banners } from '../templates/config/hero-banner';
    import ResourceUrl from '../libs/ResourceUrl.js';
    import { getInnerText } from '../libs/exhibits_data_helpers';
    import * as Logger from '../libs/logger.js';

    export let data = null;
    export let styles = null;

    let bannerData = {};

    const RESOURCE = new ResourceUrl(data.uuid);

    const DEFAULT_BANNER = Settings.defaultBannerTemplate;

    let banner = null;
    let image = null;
    let titleText = "";

    $: init();

    const init = () => {
        let { 
            banner_template = null, 
            hero_image = null, 
            title = "",
            subtitle = null,
            description = null

        } = data;

        titleText = `${getInnerText(title)} ${subtitle ? getInnerText(subtitle) : ""}`;
        
        if(hero_image) image = getImagePath(hero_image);

        banner = $Banners[banner_template || DEFAULT_BANNER];
        bannerData = {
            image,
            title,
            subtitle,
            description,
            titleText
        }
    }

    const getImagePath = (filename) => {
        let path = "";
        if(/^.+\.(jpg|jpeg|png)$/g.test(filename) == true) {
            path = RESOURCE.getFileUrl(filename);
        }
        else Logger.module().error(`Invalid hero image type. Allowed types: jpg, png. File: ${hero_image}`);
        return path;
    }
</script>

<header class="hero">
    {#if banner}
        <svelte:component this={banner} args={bannerData} styles={styles.template} />
    {/if}
</header>

<style>
    :global(.description-text) {
        padding: 50px 8%;
    }
</style>