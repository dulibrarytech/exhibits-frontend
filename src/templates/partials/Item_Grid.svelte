<script>
    /* Requires bootstrap > 5.2.3 */
    'use strict'
    
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    import Grid_Item_Image_Text from './Grid_Item_Image_Text.svelte';

    export let grid = {};
    export let id = null;
    export let templateStyles = {};

    let itemDisplay = null;

    let gridElement;
    let titleElement;

    let title;
    let text;
    let items;
    let columns;
    let styles;

    const dispatch = createEventDispatcher();

    const init = () => {
        columns = grid.columns || "2";
        title = grid.title || null;
        text = grid.text || null;
        items = grid.items || [];
        styles = grid.styles || {};

        // parse styles json string for all grid items
        items = items.map((item) => {
            if(typeof item.styles == 'string') item.styles = JSON.parse(item.styles);
            return item;
        }) || [];

        render();
    }

    const setTheme = ({item = {}, heading = null}) => {
        Object.assign(gridElement.style, item);

        if(titleElement && heading) {
            titleElement.style.fontFamily = templateStyles.heading || heading.fontFamily || 'inherit';
        }
    }

    const render = () => {
        items = items.sort(function(a, b) {
            return a.order - b.order
        });

        itemDisplay = items;
    }

    $: init();

    onMount(async () => {
        setTheme(styles);
        dispatch('mount-template-item', {});
    });
</script>

<div class="item-grid" bind:this={gridElement} >
    <div id={id ?? undefined} class="anchor-offset"></div>

    <div class="container-md">
        {#if title}<div class="title-heading" bind:this={titleElement}>{@html title}</div>{/if}

        {#if text}<div class="text">{text}</div>{/if}

        <div class="grid-content">
            {#if itemDisplay}
                {#each itemDisplay as item}
                    <div class="col-{columns}">
                        <Grid_Item_Image_Text {item} on:click-item /> 
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</div>

<style>
    .col-2, .col-3, .col-4 {
        width: 100%;
    }

    .item-grid {
        padding-top: 3.5em;
        padding-bottom: 3.5em;
    }

    .title-heading {
        text-transform: uppercase;
        margin-bottom: 45px;
    }

    .anchor-offset {
        position: relative;
        top: -120px;
    }

    .grid-content {
        display: inline-flex;
        flex-wrap: wrap;
        margin: 0 auto;
        justify-content: flex-start;
        row-gap: 100px;
        column-gap: 2.5vw;
        width: 100%;
    }

    :global(.item-grid .item) {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
    }

    :global(.item-grid .item > .container) {
        padding-left: 0;
        padding-right: 0;
    }

    :global(.item-grid .item .caption) {
        font-style: italic;
        font-size: 0.85em;
    }

    @media screen and (min-width: 624px) {
        /* .col-4, .col-3, .col-2 {
            width: 45.5%;
        } */
    }

    @media screen and (min-width: 768px) {
        .col-4, .col-3, .col-2 {
            width: 47.5%;
        }
    }

    @media screen and (min-width: 992px) {
        .col-4, .col-3 {
            width: 30.5%;
        }
    }

    @media screen and (min-width: 1280px) {
        .col-4 {
            width: 22.5%;
        }
    }
</style>