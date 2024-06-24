<script>
    /*
     * Grid_Item_Image_Text
     *
     * Renders an Item component in the Item_Grid structure. Item will show the 'description' text in the grid. 
     * Item 'layout's will be applied to the Item in the grid. Width of media element will default to 100%.
     */
    'use strict'

    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    import Item from './Item.svelte';
    import Item_Display from '../../components/Item_Display.svelte';

    import { MEDIA_POSITION, ITEM_TYPE } from '../../config/global-constants';

    export let item;

    let htmlElement;

    let id;
    let date;
    let type;
    let description;
    let caption;
    let media;
    let styles;

    const dispatch = createEventDispatcher();

    const DEFAULT_MEDIA_WIDTH = "100";

    $: {
        id = item.uuid || "null";
        date = item.date || null;
        type = item.item_type || null;
        description = item.description || null;
        caption = item.caption || null;
        media = item.media || null;

        try {
            styles = JSON.parse(item.styles) || {};
        }
        catch(error) {
            console.error(`Error loading item styles: ${error}; uuid: ${uuid}`);
        }

        if(!item.layout) item.layout = (type == ITEM_TYPE.TEXT) ? MEDIA_POSITION.TEXT_ONLY : MEDIA_POSITION.MEDIA_ONLY;
        if(!item.media_width) item.media_width = DEFAULT_MEDIA_WIDTH;
    }

    const setTheme = ({item = {}}) => {
        Object.assign(htmlElement.style, item)
    }

    const onClickPreview = (event) => {
        let itemId = event.target.getAttribute('data-item-id') || null;
        if(itemId) dispatch('click-item', {itemId});
    }

    onMount(() => {
        if(styles) setTheme(styles); 
    });
</script>

<div class="grid-item" {id} bind:this={htmlElement}>
    {#if date}
        <div class="date-heading exhibit-heading">
            <div class="item-date">{date}</div>
            <hr>
        </div> 
    {/if}

    <Item_Display {item} template={Item} args={{showTitle: false, showPreview: true}} on:click-item />

    {#if description && description.length > 0}<div class="description">{description}</div>{/if}
</div>

<style>
    .grid-item {
        padding: 0.75rem;
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