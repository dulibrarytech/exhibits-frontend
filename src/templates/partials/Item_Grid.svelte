<script>
    /* Requires bootstrap > 5.2.3 */
    'use strict'
    
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    import Grid_Item_Image_Text from './Grid_Item_Image_Text.svelte';

    export let grid = {};
    export let id = null;

    const dispatch = createEventDispatcher();

    let _itemDisplay = null;
    let _gridElement;

    let {
        text = null, 
        items = [],
        columns = DEFAULT_COLUMN_COUNT, 
        styles = {},
        margins = 'medium',
    } = grid;

    const init = () => {
        items = items.sort(function(a, b) {
            return a.order - b.order
        });

        _itemDisplay = items;
    }

    const setTheme = (styles) => {
        Object.assign(_gridElement.style, styles);
    }

    $: init();

    onMount(async () => {
        if(styles && Object.keys(styles).length > 0) setTheme(styles);
        dispatch('mount-template-item', {});
    });
</script>

<div class="item-grid grid template-item item-padding columns-{columns}" bind:this={_gridElement} >
    <div id={id ?? undefined} class="anchor-offset"></div>

    <div class="container grid-container">
        {#if text}<div class="container-{margins ?? 'medium'} text">{@html text}</div>{/if}

        <div class="grid-content">
            {#if _itemDisplay}
                {#each _itemDisplay as item}
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

    .text {
        margin-bottom: 2rem;
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
        row-gap: 50px;
        column-gap: 2.5vw;
        width: 100%;
    }

    :global(.item-grid .item) {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
    }

    :global(.item-grid .item .media-top > .media) {
        padding: 0 0 30px 0;
    }

    :global(.item-grid .item .media-bottom > .media) {
        padding: 30px 0 0 0;
    }

    :global(.item-grid .item > .container) {
        padding-left: 0;
        padding-right: 0;
    }

    :global(.item-grid .item .caption) {
        font-style: italic;
        font-size: 0.85em;
    }

    :global(.item-grid.columns-3 .grid-item .media-top .text),
    :global(.item-grid.columns-4 .grid-item .media-top .text) {
        margin-top: 20px !important;
    }

    :global(.item-grid.columns-3 .grid-item .media-bottom .text),
    :global(.item-grid.columns-4 .grid-item .media-bottom .text) {
        margin-bottom: 20px !important;
    }

    @media screen and (min-width: 624px) {

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

        :global(.item-grid.columns-3 .grid-item .media-top .text),
        :global(.item-grid.columns-4 .grid-item .media-top .text) {
            margin-top: 30px !important;
        }

        :global(.item-grid.columns-3 .grid-item .media-bottom .text),
        :global(.item-grid.columns-4 .grid-item .media-bottom .text) {
            margin-bottom: 30px !important;
        }
    }

    @media screen and (min-width: 1280px) {
        .col-4 {
            width: 22.5%;
        }
    }
</style>
