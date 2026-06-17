<script>
    'use strict'
    
    import * as Logger from '../libs/logger.js';
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    
    import Exhibit_Heading from './partials/Exhibit_Heading.svelte';
    import Exhibit_Subheading from './partials/Exhibit_Subheading.svelte';
    import Item_Display from '../components/Item_Display.svelte';
    import Item_Grid from './partials/Item_Grid.svelte';
    import Item_Grid_Vertical_Timeline from './partials/Item_Grid_Vertical_Timeline.svelte';
    import Item from './partials/Item.svelte';

    import { updateExhibitTemplateElements } from '../libs/exhibit_dom_helper.js'

    import {
        ENTITY_TYPE,
    } from '../config/global-constants';

    export let items = [];
    export let styles = null;
    export let args = {};

    const dispatch = createEventDispatcher();

    let _displayItems;
    let _templateItemCount;
    let _templateItemsMounted;
    let _templateElement;

    const init = () => {
        Logger.module().info("Initializing template...");

        _displayItems = null;
        _templateItemCount = items.length;
        _templateItemsMounted = 0;

        if(_templateItemCount == 0) Logger.module().info("No items found");

        render();
    }

    const render = () => {
        Logger.module().info("Rendering template...");
        _displayItems = items;
    }

    const setTheme = (styles) => {
        Object.assign(_templateElement.style, styles);
    }

    // one child item mounted
    const onMountTemplateItem = (event) => {
        if(++_templateItemsMounted >= _templateItemCount) {
            onMountTemplateItems();
        }
    }

    // all child items mounted
    const onMountTemplateItems = () => {
        updateExhibitTemplateElements(_templateElement);
        dispatch('mount-items', {});
    }

    init();

    // exhibit template mounted
    onMount(async () => {
        Logger.module().info("Mounted exhibit template");
        if(styles && Object.keys(styles).length > 0) setTheme(styles);
        dispatch('mount-template', {});
    });
</script>

<div id="exhibit_template" class="exhibit-template" bind:this={_templateElement}>
    {#if _displayItems}
        <div class="exhibit-items">
            {#each _displayItems as {uuid = "", type = "", text = "", anchorId = null, is_visible = null, is_embedded = false}, index}

                <div class="exhibit-item" id={uuid}>

                    <!-- exhibit heading -->
                    {#if type == ENTITY_TYPE.EXHIBIT_HEADING} 
                        <Exhibit_Heading id={anchorId} {text} styles={_displayItems[index].styles || null} display={is_visible} on:mount-template-item={onMountTemplateItem} />

                     <!-- exhibit subheading -->
                    {:else if type == ENTITY_TYPE.EXHIBIT_SUBHEADING} 
                        <Exhibit_Subheading id={anchorId} {text} styles={_displayItems[index].styles || null} display={is_visible} padTop={index > 0 && _displayItems[index - 1].type == ENTITY_TYPE.EXHIBIT_HEADING} on:mount-template-item={onMountTemplateItem} />

                        <!-- exhibit item container - grid -->
                    {:else if type == ENTITY_TYPE.GRID}
                        <Item_Grid id={anchorId} grid={_displayItems[index]} on:click-item on:mount-template-item={onMountTemplateItem} />

                    <!-- exhibit item container - vertical timeline grid 1 column -->
                    {:else if type == ENTITY_TYPE.VERTICAL_TIMELINE}
                        <Item_Grid_Vertical_Timeline id={anchorId} grid={_displayItems[index]} on:click-item on:mount-template-item={onMountTemplateItem} />
                    
                    <!--exhibit item - row layout -->
                    {:else if type == ENTITY_TYPE.ITEM}
                        <Item_Display id={uuid} item={_displayItems[index]} template={Item} on:click-item on:mount-template-item={onMountTemplateItem} />
                    {/if}

                </div>

            {/each}
        </div>
    {/if}
</div>

<style>
    .exhibit-item {
        scroll-margin-top: 150px;
    }

    .exhibit-template {
        font-size: inherit;
    }

    :global(.item-padding) {
        padding-top: 3.65rem;
        padding-bottom: 3.65rem;
    }

    :global(.caption) {
        text-decoration: none;
        color: inherit;
        font-style: italic;
        font-size: 0.842105em;
    }

    :global(.title-heading) {
        font-weight: bold;
        text-transform: uppercase;
        font-size: 1.736842em;
        line-height: 1.45em;
    }
</style>
