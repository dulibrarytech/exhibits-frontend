<script>
    'use strict'
    /*
     * hero template #1
     *
     * fullwidth hero image, no title 
     */
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    import { Settings } from '../../config/settings';

    export let args = {};

    const dispatch = createEventDispatcher();

    const DEFAULT_IMAGE_ALT_TEXT = Settings.exhibitHeroImageAltText;

    let {image = null, title="exhibit title", description = null, titleText = ""} = args;

    onMount(async () => {
        dispatch('mount', {});
    });
</script>

<div class="banner">
    <h1 style="display: none;">{titleText}</h1>
    <img src={image} alt={DEFAULT_IMAGE_ALT_TEXT} title={titleText} />
</div>

<style>
    .banner {
        position: relative;
    }

    .banner > img {
        width: 100%;
    }
</style>