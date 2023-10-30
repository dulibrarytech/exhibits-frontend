<script>
    'use strict'

    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import Item_Preview from '../../components/Item_Preview.svelte';
    import Item from '../../components/Item.svelte';

    import {ITEM_TYPE, MEDIA_POSITION} from '../../config/global-constants';

    export let item;

    const dispatch = createEventDispatcher();

    let id = null;
    let styles = null;

    let itemElement;
    let textElement;

    let type;
    var date;
    var title;
    var description;

    const DEFAULT_MEDIA_WIDTH = "100";

    $: {
        id = item.uuid || "null";
        date = item.date || null;
        //title = item.title || null;
        description = item.description || null;
        type = item.item_type || null;
        styles = item.styles || null;

        if(!item.layout) item.layout = MEDIA_POSITION.TOP;
        if(!item.media_width) item.media_width = DEFAULT_MEDIA_WIDTH;
    }

    const setTheme = (styles) => {
        let {item_text = {}, item={}} = styles;

        /* set item styles */
        for(let style in item) {
            itemElement.style[style] = item[style];
        }

        /* set text (description) section styles */
        if(textElement) {
            for(let style in item_text) {
                textElement.style[style] = item_text[style];
            }
        }
    }

    const onClickPreview = (event) => {
        let itemId = event.detail.itemId;
        if(itemId) dispatch('click-preview', {itemId});
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

    <Item item={item} on:click-item={onClickPreview} />
</div>

<style>
    .grid-item {
        padding: 30px;
    }

    a {
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
    }

    .item-date {
        font-weight: bold;
        font-size: 1.2em;
    }

    .date-heading {
        font-size: 1em;
    }

    .description {
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
    }
</style>