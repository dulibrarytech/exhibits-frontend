<script>
    /* Requires bootstrap > 5.2.3 */
    'use strict'
    
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import Grid_Item_Image_Text from './Grid_Item_Image_Text.svelte';

    export let items = [];
    export let columns = 4;

    const dispatch = createEventDispatcher();

    let gridElement;
    let bootstrapColumnValue = 12 / columns;

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
        let styles = items[0]?.styles?.item_grid;
        if(styles) setTheme(styles);
    });
</script>

<div class="grid-content" bind:this={gridElement} >
    <div class="container">
        <div class="item-grid">
            {#each items as item}
                {#if item.is_published}
                    <div class="col-xl-{bootstrapColumnValue} col-lg-{bootstrapColumnValue+1} col-md-{bootstrapColumnValue+2} col-sm-{bootstrapColumnValue+3}">
                        <Grid_Item_Image_Text {item} on:click-preview={onClickPreview} /> 
                    </div>
                {/if}
            {/each}
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