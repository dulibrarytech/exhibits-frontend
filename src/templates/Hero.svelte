<script>
    'use strict'

    import { Settings } from '../config/settings';
    // import { Banners } from '../config/templates';
    import { Banners } from '../templates/config/hero-banner';
    import { Resource } from '../libs/resource';

    export let data = null;

    let args = {};

    const DEFAULT_BANNER = Settings.defaultBannerTemplate;

    let banner = null;
    let theme = {};
    let image = null;
    let alert = null;

    $: {
        if(data) {
            let { hero_image = null, styles = null } = data;

            banner = $Banners[data.banner || DEFAULT_BANNER];
            if(!banner) console.error("Could not create hero section: no banner selection specified for exhibit");

            alert = data.alert || null;

            if(hero_image) setImage(hero_image);

            if(styles?.hero) theme = styles.hero;

            args = {
                image,
                title: data.title || "",
                subtitle: data.subtitle || null,
                description: data.description || null
            }
        }
    }

    const setImage = (filename) => {
        if(/^.+\.(jpg|jpeg|png)$/g.test(filename) == true) {
            image = Resource.getUrl(filename);
        }
        else console.error(`Invalid hero image type. Allowed types: jpg, png. File: ${hero_image}`);
    }

    const setTheme = () => {
        let {image, text, alert} = theme;
        
        document.querySelectorAll('.hero-image').forEach((element) => {
            for(let style in image) {
                element.style[style] = image[style];
            }
        });

        document.querySelectorAll('.hero-text').forEach((element) => {
            for(let style in text) {
                element.style[style] = text[style];
            }
        });

        let alertElement = document.querySelector(".alert");
        if(alertElement) {
            for(let style in alert) {
                alertElement.style[style] = alert[style];
            }
        }
    }
</script>

<header class="hero-section">
    {#if banner}
        <svelte:component this={banner} {args} on:mount={setTheme} />
    {/if}

    {#if alert }
        <div class="alert">
            {@html alert}
        </div>
    {/if}
</header>

<style>
    .alert {
        min-height: 4.2em;
        padding: 1.3em 1.6em;
        margin-bottom: 0;
    }

    :global(.banner > img) {
        width: 100%;
        height: 100%;
    }

    :global(.hero-image) {
        min-height: 200px;
        background: grey;
    }

    :global(.hero-text) {
        background: grey;
    }
</style>