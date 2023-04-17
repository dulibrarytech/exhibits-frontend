<script>
    'use strict'

    import { Settings } from '../config/settings';
    import { Banners } from '../config/templates';
    import { Resource } from '../libs/resource';

    export let data = null;

    const DEFAULT_BANNER = Settings.defaultBannerTemplate;

    let banner = null;
    let args = {};

    $: {
        if(data) {
            let {background_image} = data;
            let image = null;

            banner = $Banners[data.banner || DEFAULT_BANNER];
            if(!banner) console.error("Could not create hero section: no banner selection specified for exhibit");

            if(/^.+\.(jpg|jpeg|png)$/g.test(background_image) == true) {
                image = Resource.getUrl(background_image);
            }
            else console.error(`Invalid hero image type. Allowed types: jpg, jpeg, png. File: ${background_image}`);

            args = {
                image,
                title: data.title || "",
                subtitle: data.subtitle || null,
                description: data.description || null
            }
        }
    }
</script>

<div class="hero-section">
    {#if banner}
        <svelte:component this={banner} {args} />
    {/if}
</div>

<style>

</style>