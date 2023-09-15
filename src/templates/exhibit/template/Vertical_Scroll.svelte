<script>
    'use strict'
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    
    import Item from '../../../components/Item.svelte';
    import Item_Grid from './partial/Item_Grid.svelte';
    import Vertical_Timeline_Item_Grid from './partial/Vertical_Timeline_Item_Grid.svelte';
    import Exhibit_Heading from './partial/Exhibit_Heading.svelte';

    import {ENTITY_TYPE, ITEM_TEMPLATE} from '../../../config/global-constants';

    export let items;

    const dispatch = createEventDispatcher();

    var exhibit = null;

    const render = () => {
        if(!exhibit) {
            exhibit = sortTemplateItems(items); // should order on "sort" field?
        }
    }

    /**
     * Defunct
     * 
     * Creates an array of row and grid items in sequential order, by item.order property
     * 
     * e.g. IN: [{template:"row", type:"item"}, {template:"row", type:"item"}, {template:"grid", type:"item"}, {template:"grid", type:"item"}, {template:"row", type:"item"}]
     *      OUT: [{template:"row", type:"item"}, {template:"row", type:"item"}, {type:"[grid|timeline-grid]", gridItems: [{template:"grid", type:"item"}, {template:"grid", type:"item"}]}, {template:"grid", type:"item"}]
     * 
     * - A item with "row" layout will be inserted to the display as a full width row entity
     * - Items with "grid" layout will be added to a sub-array, which will contain the set of consecutive (by 'order') items of "grid" layout.
     *   (A break in contiguous "grid" items will end the current grid section)
     * 
     * @param items Array<Object> Array of item objects
     */
    // const sortTemplateItems = (items) => {
    //     let sorted = [];
    //     let gridItems = [];

    //     for(let index = 0; index<items.length; index++) {
    //         let item = items[index];
    //         let {uuid, template = ITEM_TEMPLATE.ROW, columns = 4} = item;

    //         if(template == ITEM_TEMPLATE.ROW) {
    //             sorted.push(item);
    //         }

    //         else if(template == ITEM_TEMPLATE.GRID) {
    //             gridItems.push(item);

    //             /* end current grid if the next item has a different template type */
    //             if(items[index+1]?.template != ITEM_TEMPLATE.GRID) {

    //                 sorted.push({
    //                     type: ITEM_TEMPLATE.GRID,
    //                     items: gridItems,
    //                     columns
    //                 });

    //                 gridItems = [];
    //             }
    //         }

    //         else if(template == ITEM_TEMPLATE.VERTICAL_TIMELINE) {
    //             gridItems.push(item);

    //             /* end current grid if the next item has a different template type */
    //             if(items[index+1]?.template != ITEM_TEMPLATE.VERTICAL_TIMELINE) {

    //                 sorted.push({
    //                     type: ITEM_TEMPLATE.VERTICAL_TIMELINE,
    //                     items: gridItems,
    //                     columns
    //                 });

    //                 gridItems = [];
    //             }
    //         }

    //         else console.error(`Invalid template value: ${template} Item id: ${uuid}`);
    //     }

    //     return sorted;
    // }

    const sortTemplateItems = (items) => {
        return items; // TODO impl: sort items [] on "order" field ascending. Need to add 'order' field to grid items from first child item.
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
            {#each exhibit as {type = "", text = "", subtext = "", id = null, is_visible=null}, index}

                <!-- exhibit heading -->
                {#if type == ENTITY_TYPE.EXHIBIT_HEADING} 
                    <Exhibit_Heading {id} {text} {subtext} display={is_visible} />
                    
                <!--exhibit item - row layout -->
                {:else if type == ENTITY_TYPE.ITEM}
                    <Item item={exhibit[index]} on:click-item={onClickItem} />

                <!-- exhibit item container - grid -->
                {:else if type == ITEM_TEMPLATE.GRID}
                    <Item_Grid grid={exhibit[index]} on:click-item={onClickItem} />

                <!-- exhibit item container - vertical timeline grid -->
                {:else if type == ITEM_TEMPLATE.VERTICAL_TIMELINE}
                    <Vertical_Timeline_Item_Grid grid={exhibit[index]} on:click-item={onClickItem} />
                {/if}
            {/each}
        </div>
    {/if}
</div>

<style>
.exhibit-template {
    /* padding-top: 85px; */
}

:global(.item) {
    /* margin-bottom: 85px; */
}

:global(.caption) {
    color: inherit;
}

/* :global(.exhibit-template > *) {
    margin-bottom: 85px;
} */
</style>