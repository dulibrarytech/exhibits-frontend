<script>
    'use strict'
    
    import * as Logger from '../libs/logger.js';
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    
    import Exhibit_Heading from './partials/Exhibit_Heading.svelte';
    import Item_Display from '../components/Item_Display.svelte';
    import Item_Grid from './partials/Item_Grid.svelte';
    import Item_Grid_Vertical_Timeline from './partials/Item_Grid_Vertical_Timeline.svelte';
    import Item from './partials/Item.svelte';

    import {ENTITY_TYPE} from '../config/global-constants';

    export let items = [];
    export let styles = null;
    export let args;

    const dispatch = createEventDispatcher();

    let displayItems;
    let templateItemCount;
    var templateItemsMounted;

    const init = () => {
        Logger.module().info("Initializing template...");

        displayItems = null;
        templateItemCount = items.length;
        templateItemsMounted = 0;

        if(templateItemCount == 0) Logger.module().info("No items found");

        render();
    }

    const render = () => {
        Logger.module().info("Rendering template...");
        if(!displayItems) displayItems = formatTemplateItems(items);
    }

    const formatTemplateItems = (items) => {
        return items; 
    }

    const onMountTemplateItem = (event) => {
        if(++templateItemsMounted >= templateItemCount) {
            dispatch('mount-items', {});
        }
    }

    init();

    onMount(async () => {
        Logger.module().info("Mounted exhibit template");
        dispatch('mount-template', {});
    });
</script>

<div class="exhibit-template">
    {#if displayItems}
        <div class="exhibit-items">
            {#each displayItems as {uuid = "", type = "", text = "", anchorId = null, is_visible = null, is_embedded = false}, index}

                <div class="exhibit-item" id={uuid}>

                    <!-- exhibit heading -->
                    {#if type == ENTITY_TYPE.EXHIBIT_HEADING} 
                        <Exhibit_Heading id={anchorId} {text} styles={displayItems[index].styles || styles?.heading || null} display={is_visible} on:mount-template-item={onMountTemplateItem} />

                    <!-- exhibit item container - grid -->
                    {:else if type == ENTITY_TYPE.GRID}
                        <Item_Grid id={anchorId} grid={displayItems[index]} templateStyles={styles} on:click-item on:mount-template-item={onMountTemplateItem} />

                    <!-- exhibit item container - vertical timeline grid 1 column -->
                    {:else if type == ENTITY_TYPE.VERTICAL_TIMELINE}
                        <Item_Grid_Vertical_Timeline id={anchorId} grid={displayItems[index]} templateStyles={styles} on:click-item on:mount-template-item={onMountTemplateItem} />
                    
                    <!--exhibit item - row layout -->
                    {:else if type == ENTITY_TYPE.ITEM}
                        <!-- <Item_Display id={anchorId} item={displayItems[index]} template={Item} args={{showPreview: true}} on:click-item on:mount-template-item={onMountTemplateItem} /> -->
                        <Item_Display id={anchorId} item={displayItems[index]} template={Item} args={{showPreview: !is_embedded, isTemplateItem: true}} on:click-item on:mount-template-item={onMountTemplateItem} />
                    {/if}

                </div>

            {/each}
        </div>
    {/if}
</div>

<style>
    .exhibit-template {
        font-size: inherit;
    }

    :global(.caption) {
        text-decoration: none;
        color: inherit;
        font-style: italic;
        font-size: 0.842105em;
    }

    /* affects title heading in item and all grids */
    :global(.title-heading) {
        font-weight: bold;
        text-transform: uppercase;
        font-size: 1.736842em;
        letter-spacing: 0.05em;
        line-height: 1.45em;
    }
</style>