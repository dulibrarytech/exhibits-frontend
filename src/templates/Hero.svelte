<script>
    'use strict'

    import { Settings } from '../config/settings';
    import { Banners } from '../config/templates';

    export let data = null;

    const DEFAULT_BANNER = Settings.defaultBannerTemplate;

    let banner = null;
    let args = {};

    $: {
        if(data) {
            banner = $Banners[data.banner || DEFAULT_BANNER];
            if(!banner) console.error("Could not create hero section: no banner selection specified for exhibit");

            args = {
                image: data.background_image || "unset",
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