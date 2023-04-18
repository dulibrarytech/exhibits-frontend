<script>
    'use strict'

    import { Settings } from '../config/settings';
    import { Banners } from '../config/templates';
    import { Resource } from '../libs/resource';

    export let data = null;

    const DEFAULT_BANNER = Settings.defaultBannerTemplate;

    let banner = null;
    let theme = {};
    let args = {};

    $: {
        if(data) {
            let { hero_image = "", css = null } = data;
            let image = null;

            banner = $Banners[data.banner || DEFAULT_BANNER];
            if(!banner) console.error("Could not create hero section: no banner selection specified for exhibit");

            if(/^.+\.(jpg|jpeg|png)$/g.test(hero_image) == true) {
                image = Resource.getUrl(hero_image);
            }
            else console.error(`Invalid hero image type. Allowed types: jpg, png. File: ${hero_image}`);

            if(css?.hero) theme = css.hero;

            args = {
                image,
                title: data.title || "",
                subtitle: data.subtitle || null,
                description: data.description || null
            }
        }
    }

    const setTheme = () => {
        document.querySelectorAll('.banner').forEach((element) => {
            for(let style in theme) {
                element.style[style] = theme[style];
            }
        });
    }
</script>

<div class="hero-section">
    {#if banner}
        <svelte:component this={banner} {args} on:mount={setTheme} />
    {/if}
</div>

<style>
    :global(.banner > img) {
        width: 100%;
        height: 100%;
    }
</style>