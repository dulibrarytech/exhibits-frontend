<script>
    /* Requires bootstrap > 5.2.3 */
    'use strict'
    
    import { onMount } from 'svelte';
    import Grid_Item_Image_Text from './Grid_Item_Image_Text.svelte';

    export let grid = {};
    export let id = null;

    let gridElement;

    let title;
    let items;
    let styles;
    let columns;
    let bootstrapColumnValue;

    const init = () => {
        columns = grid.columns || "2";
        bootstrapColumnValue = 12 / columns;
        title = grid.title || null;
        items = grid.items || [];
        styles = grid.styles?.item_grid || null;
    }

    const setTheme = (styles) => {
        for(let style in styles) {
            gridElement.style[style] = styles[style];
        }
    }

    $: init();

    onMount(async () => {
        if(styles) setTheme(styles);
    });
</script>

<div class="item-grid" id={id ?? undefined} bind:this={gridElement} >
    <div class="container">
        {#if title}<div class="title-heading">{title}</div>{/if}
        <div class="grid-content">
            {#if items}
                {#each items as item}
                    <!-- {#if item.is_published} -->
                        <div class="col-xl-{bootstrapColumnValue} col-lg-{bootstrapColumnValue+1} col-md-{bootstrapColumnValue+2} col-sm-{bootstrapColumnValue+3}">
                            <Grid_Item_Image_Text {item} on:click-item /> 
                        </div>
                    <!-- {/if} -->
                {/each}
            {/if}
        </div>
    </div>
</div>

<style>
    .item-grid {
        margin-bottom: 80px;
        padding-top: 45px;
        padding-bottom: 45px;
    }
    .item-grid > .container {
        /* display: flex; */
    }

    .grid-content {
        display: inline-flex;
        flex-wrap: wrap;
        margin: 0 auto;
        justify-content: center;
    }

    .grid-content > div {
        padding: 30px 15px;
    }

    :global(.item-grid .grid-item) {
        padding: 30px;
    }

    :global(.item-grid .item) {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
    }

    :global(.item-grid .item > .container) {
        padding-left: 0;
        padding-right: 0;
    }
</style>