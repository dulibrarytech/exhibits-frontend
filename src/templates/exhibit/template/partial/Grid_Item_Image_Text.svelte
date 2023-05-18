<script>
    'use strict'

    import { onMount } from 'svelte';
    import { Settings } from '../../../../config/settings';
    import Item_Preview from '../../../../components/Item_Preview.svelte';

    import {ITEM_POSITION} from '../../../../config/global-constants';

    export let item;

    let gridItemElement = null;
    let styles = null;

    var layout = null;
    var date = null;
    var title = null;
    var description = null;

    $: {
        date = item.date || null;
        title = item.title || null;
        description = item.text || null;
        layout = item.layout || Settings.gridItemDefaultLayout;
        styles = item.styles || null;
    }

    const setTheme = (styles) => {
        let {item_text = {}} = styles;

        for(let style in item_text) {
            gridItemElement.style[style] = item_text[style];
        }
    }

    onMount(async (test) => {
        setTheme(styles || {}); 
    });
</script>

<div class="grid-item" bind:this={gridItemElement} >
    <a href="#"> <!-- TODO link to url, if repo item -> disc layer, else is user setting? -->
        {#if date}
            <div class="date-heading exhibit-heading">
                <div class="item-date">{date}</div>
                <hr>
                <br>
            </div> 
        {/if}

        {#if layout == ITEM_POSITION.RIGHT}
            <div class="float-right">
                <Item_Preview {item} />
            </div> 
            <div class="float-left">
                <div class="title">{title}</div>
                <div class="description">{description}</div>
            </div>
            
        {:else if layout == ITEM_POSITION.LEFT}
            <div class="float-right">
                <div class="title">{title}</div>
                <div class="description">{description}</div>
            </div>
            <div class="float-left">
                <Item_Preview {item} />
            </div>

        {:else if layout == ITEM_POSITION.TOP}
            <div class="title bottom-margin">{title}</div>
            <Item_Preview {item} />
            <div class="description top-margin"><p>{description}</p></div>

        {:else if layout == ITEM_POSITION.BOTTOM}
            <div class="title">{title}</div>
            <div class="description">{description}</div>
            <Item_Preview {item} />

        {:else if layout == ITEM_POSITION.TEXT_ONLY}
            <div class="title">{title}</div>
            <div class="description">{description}</div>

        {:else if layout == ITEM_POSITION.ITEM_ONLY}
            <Item_Preview {item} />
        {/if}
    </a>
</div>

<style>
    a {
        color: initial;
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

    .grid-item {
        padding: 15px;
    }

    .item-date {
        font-weight: bold;
    }

    .date-heading {
        font-size: 1.2em;
    }

    .description {
        text-align: left;
    }

    .float-left {float: left}
    .float-right {float: right}

    .title {
        font-weight: bold;
    }
</style>