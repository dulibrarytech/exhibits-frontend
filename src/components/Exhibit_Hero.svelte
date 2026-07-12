<script>
    'use strict'

    import { Settings } from '../config/settings';
    import { Banners } from '../templates/config/hero-banner';
    import ResourceUrl from '../libs/ResourceUrl.js';
    import { getInnerText } from '../libs/exhibits_data_helpers';
    import * as Logger from '../libs/logger.js';

    export let data = null;
    export let styles = null;

    const RESOURCE = new ResourceUrl(data.uuid);

    // component settings
    const DEFAULT_BANNER = Settings.defaultBannerTemplate;

    let _banner = null;
    let _bannerData = {};
    let _image = null;
    let _titleText = "";

    $: init();

    const init = () => {
        let { 
            banner_template = null, 
            media_iiif = null,
            hero_image = null, 
            title = "",
            subtitle = null,
            description = null

        } = data;

        _titleText = `${getInnerText(title)} ${subtitle ? getInnerText(subtitle) : ""}`;
        
        // set the hero image url
        if(media_iiif) {
            const {image_url = ""} = media_iiif;
            _image = image_url;
        }
        else if(hero_image) {
            _image = getImagePath(hero_image);
        }

        _banner = $Banners[banner_template || DEFAULT_BANNER];

        _bannerData = {
            image: _image,
            titleText: _titleText,
            title,
            subtitle,
            description,
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
    {#if _banner}
        <svelte:component this={_banner} args={_bannerData} styles={styles.template} />
    {/if}
</header>

<style>
    :global(.description-text) {
        padding: 50px 8%;
    }
</style>