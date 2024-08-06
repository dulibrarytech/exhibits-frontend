<script>
    /* Requires bootstrap > 5.2.3 */
    'use strict'
    
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    import Grid_Item_Image_Text from './Grid_Item_Image_Text.svelte';

    import {USER_ROLE} from '../../config/global-constants';

    export let grid = {};
    export let id = null;
   // export let args = {};
    export let templateStyles = {};

    let itemDisplay = null;

    let gridElement;
    let titleElement;

    let title;
    let items;
    let columns;
    let styles;

    const dispatch = createEventDispatcher();

    const init = () => {
        columns = grid.columns || "2";
        title = grid.title || null;
        items = grid.items || [];
        styles = grid.styles || {};

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

    <div class="container">
        {#if title}<div class="title-heading" bind:this={titleElement}>{title}</div>{/if}

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
        padding-top: 45px;
        padding-bottom: 45px;
    }

    .title-heading {
        text-transform: uppercase;
    }

    .anchor-offset {
        position: relative;
        top: -120px;
    }

    .grid-content {
        display: inline-flex;
        flex-wrap: wrap;
        margin: 0 auto;
        justify-content: left;
        row-gap: 100px;
        column-gap: 4.2vw;
        margin-top: 45px;
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

    /* begin responsive breakpoints: small mobile devices/phones first ^ */
    @media screen and (min-width: 768px) {
        .col-2 {
            /* width: 48.5%; */
            width: 45.5%;
        }

        .col-3 {
            /* width: 31.5%; */
            width: 28.5%;
        }

        .col-4 {
            /* width: 23.5%; */
            width: 20.5%;
        }
    }
</style>