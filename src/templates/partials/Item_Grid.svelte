<script>
    /* Requires bootstrap > 5.2.3 */
    'use strict'
    
    import { onMount } from 'svelte';
    import Grid_Item_Image_Text from './Grid_Item_Image_Text.svelte';
    import {USER_ROLE} from '../../config/global-constants';

    export let grid = {};
    export let id = null;
    export let args = {};

    let gridElement;

    let title;
    let items;
    let styles;
    let columns;
    let bootstrapColumnValue;

    let {
        role = USER_ROLE.STANDARD

    } = args;

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

<div class="item-grid" bind:this={gridElement} >
    <div id={id ?? undefined} class="anchor-offset"></div>

    <div class="container">
        {#if title}<div class="title-heading">{title}</div>{/if}
        <div class="grid-content">
            {#if items}
                {#each items as item}

                    {#if item.is_published || role == USER_ROLE.ADMIN}

                        <div class="col-xl-{bootstrapColumnValue} col-lg-{bootstrapColumnValue+1} col-md-{bootstrapColumnValue+2} col-sm-{bootstrapColumnValue+3}">
                            <Grid_Item_Image_Text {item} on:click-item /> 
                        </div>

                    {/if}

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

    .anchor-offset {
        position: relative;
        top: -120px;
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