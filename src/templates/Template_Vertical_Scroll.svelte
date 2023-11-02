<script>
    'use strict'
    
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    
    import Exhibit_Heading from './partials/Exhibit_Heading.svelte';
    import Item_Display from '../components/Item_Display.svelte';
    import Item_Grid from './partials/Item_Grid.svelte';
    import Item_Grid_Vertical_Timeline from './partials/Item_Grid_Vertical_Timeline_2.svelte';

    import {ENTITY_TYPE, ITEM_TEMPLATE} from '../config/global-constants';
    import Item from './partials/Item.svelte';

    export let items;
    export let styles = null;

    const dispatch = createEventDispatcher();

    let exhibit = null;

    const render = () => {
        if(!exhibit) {
            exhibit = sortTemplateItems(items);
        }
    }

    const sortTemplateItems = (items) => {
        // TODO: sort exhibit items, grid should contain order, so sort on order field asc.
        return items; 
    }

    const onClickItem = (event) => {
        let itemId = event.detail.itemId || null;
        dispatch('click-item', {itemId});
    }

    render();

    onMount(async () => {
        dispatch('mount', {});
    });
</script>

<div class="exhibit-template">
    {#if exhibit}
        <div class="exhibit-items">
            {#each exhibit as {type = "", text = "", subtext = "", anchorId = null, is_visible=null}, index}

                <!-- exhibit heading -->
                {#if type == ENTITY_TYPE.EXHIBIT_HEADING} 
                    <Exhibit_Heading id={anchorId} {text} styles={styles?.heading || null} display={is_visible} />
                    
                <!--exhibit item - row layout -->
                {:else if type == ENTITY_TYPE.ITEM}
                    <Item_Display id={anchorId} item={exhibit[index]} on:click-item={onClickItem} template={Item} args={{showPreview: true}}/>

                <!-- exhibit item container - grid -->
                {:else if type == ITEM_TEMPLATE.GRID}
                    <Item_Grid id={anchorId} grid={exhibit[index]} on:click-item={onClickItem} />

                <!-- exhibit item container - vertical timeline grid -->
                {:else if type == ITEM_TEMPLATE.VERTICAL_TIMELINE}
                    <Item_Grid_Vertical_Timeline id={anchorId} grid={exhibit[index]} on:click-item={onClickItem} />
                {/if}
            {/each}
        </div>
    {/if}
</div>

<style>
    :global(.title) {
        text-transform: uppercase;
        font-size: 1.65em;
    }
    :global(.caption) {
        color: inherit;
    }
</style>