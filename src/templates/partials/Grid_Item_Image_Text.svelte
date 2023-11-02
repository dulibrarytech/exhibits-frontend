<script>
    /*
     * Grid_Item_Image_Text
     *
     * Renders an Item component in the Item_Grid structure. Item will show the 'description' text in the grid. 
     * Item 'layout's will be applied to the Item in the grid. Width of media element will default to 100%.
     */
    'use strict'

    import { onMount } from 'svelte';
    //import { createEventDispatcher } from 'svelte';
    import Item from './Item.svelte';

    import {ITEM_TYPE, MEDIA_POSITION} from '../../config/global-constants';

    export let item;

    //const dispatch = createEventDispatcher();

    let itemElement;

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

        // show the item description text in the grid item. if no description text, remove the item text so it is not displayed in the grid
        //item.text = description || null;
    }

    const setTheme = (styles) => {
        let {item={}} = styles;

        for(let style in item) {
            itemElement.style[style] = item[style];
        }
    }

    onMount(() => {
        if(styles) setTheme(styles); 
    });
</script>

<div class="grid-item" bind:this={itemElement}>
    {#if date}
        <div class="date-heading exhibit-heading">
            <div class="item-date">{date}</div>
            <hr>
        </div> 
    {/if}

    <Item item={item} args={{showTitle: false, showPreview: true}} on:click-item />

    {#if description}<div class="description">{description}</div>{/if}
</div>

<style>
    .grid-item {
        padding: 30px;
    }

    /* a {
        color: inherit;
    }

    a:hover {
        text-decoration: none;
    }

    .top-margin {
        margin-top: 40px;
    }

    .bottom-margin {
        margin-bottom: 20px;
    } */

    .item-date {
        font-weight: bold;
        font-size: 1.2em;
    }

    .date-heading {
        font-size: 1em;
    }

    /* .description {
        text-align: left;
        font-size: 0.9em;
        padding: 8px;
    }

    .description p {
        margin-bottom: 0;
    }

    .float-left {float: left}
    .float-right {float: right}

    .title {
        font-weight: bold;
        margin-bottom: 30px;
    } */
</style>