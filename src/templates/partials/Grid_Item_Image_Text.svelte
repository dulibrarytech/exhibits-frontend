<script>
    /*
     * Grid_Item_Image_Text
     *
     * Renders an Item component in the Item_Grid structure. Item will show the 'description' text in the grid. 
     * Item 'layout's will be applied to the Item in the grid. Width of media element will default to 100%.
     */
    'use strict'

    import { onMount } from 'svelte';
    import Item from './Item.svelte';

    import {MEDIA_POSITION} from '../../config/global-constants';

    export let item;

    let htmlElement;

    let id;
    let date;
    let type;
    let description;
    let styles;

    const DEFAULT_MEDIA_WIDTH = "100";

    $: {
        id = item.uuid || "null";
        date = item.date || null;
        type = item.item_type || null;
        description = item.description || null
        styles = item.styles || null;

        // apply default grid item settings
        if(!item.layout) item.layout = MEDIA_POSITION.TOP;
        if(!item.media_width) item.media_width = DEFAULT_MEDIA_WIDTH;
    }

    const setTheme = (styles) => {
        let {item={}} = styles;

        for(let style in item) {
            htmlElement.style[style] = item[style];
        }
    }

    onMount(() => {
        if(styles) setTheme(styles); 
    });
</script>

<div class="grid-item" bind:this={htmlElement}>
    {#if date}
        <div class="date-heading exhibit-heading">
            <div class="item-date">{date}</div>
            <hr>
        </div> 
    {/if}

    <Item {item} args={{showTitle: false, showPreview: true}} on:click-item />

    {#if description}<div class="description">{description}</div>{/if}
</div>

<style>
    .grid-item {
        padding: 30px;
    }

    .item-date {
        font-weight: bold;
        font-size: 1.2em;
    }

    .date-heading {
        font-size: 1em;
    }

    .description {
        font-size: 0.9em;
        margin-top: 20px;
    }
</style>