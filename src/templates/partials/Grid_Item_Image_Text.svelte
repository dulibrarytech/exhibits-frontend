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
    import Item_Display from '../../components/Item_Display.svelte';

    import { MEDIA_POSITION, ITEM_TYPE } from '../../config/global-constants';

    export let item;

    let itemElement;

    let id;
    let title;
    let date;
    let type;
    let caption;
    let media;
    let styles;

    const DEFAULT_MEDIA_WIDTH = "100";

    $: {
        id = item.uuid || "null";
        title = item.title || null;
        type = item.item_type || null;
        caption = item.caption || null;
        media = item.media || null;
        styles = item.styles || null;

        console.log("TEST grid item:", item)

        if(date) date = new Date(date).toLocaleDateString();
        if(title) item.title = null;

        if(!item.layout) item.layout = (type == ITEM_TYPE.TEXT) ? MEDIA_POSITION.TEXT_ONLY : MEDIA_POSITION.TOP;
        if(!item.media_width) item.media_width = DEFAULT_MEDIA_WIDTH;
    }

    const setTheme = ({item = {}}) => {
        Object.assign(itemElement.style, item)
    }

    onMount(() => {
        if(styles) setTheme(styles); 
    });
</script>

<div class="grid-item" {id} bind:this={itemElement}>
    {#if date}
        <div class="date-heading exhibit-heading">
            <div class="item-date"><h4>{date}</h4></div>
            <hr>
        </div> 
    {/if}

    {#if title}<h4>{@html title}</h4>{/if}
    <Item_Display {item} template={Item} args={{showTitle: true}} on:click-item />
</div>

<style>
    .grid-item {
        padding: 1.5rem;
    }

    .grid-item h4 {
        margin-bottom: 30px;
    }

    .item-date {
        font-weight: bold;
        font-size: 1em;
    }

    .date-heading {
        font-size: 1em;
    }

    :global(.grid-item .title-heading) {
        font-size: 1em;
    }
</style>