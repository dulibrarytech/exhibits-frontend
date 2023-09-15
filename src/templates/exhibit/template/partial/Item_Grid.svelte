<script>
    /* Requires bootstrap > 5.2.3 */
    'use strict'
    
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import Grid_Item_Image_Text from './Grid_Item_Image_Text.svelte';

    export let grid = {};

    const dispatch = createEventDispatcher();

    let gridElement;
    let items;
    let styles;
    let columns;
    let bootstrapColumnValue;

    $: {  // init()
        columns = grid.columns || "2";
        bootstrapColumnValue = 12 / columns;
        items = grid.items || [];
        styles = grid.styles?.item_grid || null;
    }

    const setTheme = (styles) => {
        for(let style in styles) {
            gridElement.style[style] = styles[style];
        }
    }

    const onClickPreview = (event) => {
        let itemId = event.detail.itemId || null;
        if(itemId) dispatch('click-item', {itemId});
    }

    onMount(async () => {
        if(styles) setTheme(styles);
    });
</script>

<div class="grid-content" bind:this={gridElement} >
    <div class="container">
        <div class="item-grid">
            {#if items}
                {#each items as item}
                    {#if item.is_published}
                        <div class="col-xl-{bootstrapColumnValue} col-lg-{bootstrapColumnValue+1} col-md-{bootstrapColumnValue+2} col-sm-{bootstrapColumnValue+3}">
                            <Grid_Item_Image_Text {item} on:click-preview={onClickPreview} /> 
                        </div>
                    {/if}
                {/each}
            {/if}
        </div>
    </div>
</div>

<style>
    .grid-content {
        padding-top: 80px;
    }
    .grid-content .container {
        display: flex;
    }

    .item-grid {
        display: inline-flex;
        flex-wrap: wrap;
        margin: 0 auto;
    }

    :global(.item-grid .grid-section) {
        padding: 30px;
    }
</style>