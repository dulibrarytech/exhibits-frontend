<script>
    'use strict' 
    
    import { onMount } from 'svelte';
    import { getItemThumbnailUrl } from '../libs/media_helpers';

    export let item;

    let itemPreviewElement;
    let styles = null;

    var thumbnail = null;
    var caption = null;

    $: init();

    const init = () => {
        thumbnail = getItemThumbnailUrl(item);
        styles = item.styles || null;
        caption = item.caption || null;
    }

    const setTheme = (styles) => {
        let {item_media = {}} = styles;

        for(let style in item_media) {
            itemPreviewElement.style[style] = item_media[style];
        }
    }

    onMount(async () => {
        if(styles) setTheme(styles); 
    });
</script>

<div class="item-preview" bind:this={itemPreviewElement} >
    {#if thumbnail}
        <img src={thumbnail} />
        {#if caption}<span class="caption">{caption}</span>{/if}
    {:else}
        <img src='/error' />
    {/if}
</div>

<style>
    img {
        width: 100%;
        pointer-events: none;
    }

    .item-preview {
        margin-bottom: 1em;
        margin: 0 auto;
        pointer-events: none;
    }

    .caption {
        margin-top: 10px;
    }
</style>