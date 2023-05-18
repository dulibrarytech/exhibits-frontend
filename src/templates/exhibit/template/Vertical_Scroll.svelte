<script>
    'use strict'
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    
    import Item from '../../../components/Item.svelte';
    import Item_Grid from './partial/Item_Grid.svelte';

    export let items;

    const dispatch = createEventDispatcher();

    var exhibit = null;

    const ROW = "row";
    const GRID = "grid";

    const render = () => {
        if(!exhibit) {
            exhibit = sortTemplateItems(items);
        }
    }

    /**
     * 
     * Creates an array of row and grid items in sequential order, by item.order property
     * 
     * e.g. IN: [{template:"row", type:"item"}, {template:"row", type:"item"}, {template:"grid", type:"item"}, {template:"grid", type:"item"}, {template:"row", type:"item"}]
     *      OUT: [{template:"row", type:"item"}, {template:"row", type:"item"}, {type:"item-grid", gridItems: [{template:"grid", type:"item"}, {template:"grid", type:"item"}]}, {template:"grid", type:"item"}]
     * 
     * - A item with "row" layout will be inserted to the display as a full width row entity
     * - Items with "grid" layout will be added to a sub-array, which will contain the set of consecutive (by 'order') items of "grid" layout.
     *   (A break in contiguous "grid" items will end the current grid section)
     * 
     * @param items Array<Object> Array of item objects
     */
    const sortTemplateItems = (items) => {
        let sorted = [];
        let gridItems = [];

        for(let index = 0; index<items.length; index++) {
            let item = items[index];
            let {uuid, template = ROW, columns = 4} = item;

            if(template == ROW) {
                /* end case - terminated consecutive grid items. push the grid items to the template */
                if(gridItems.length > 0) {
                    appendGrid(sorted, gridItems, columns);
                    gridItems = [];
                }

                appendRow(sorted, item);
            }

            else if(template == GRID) {
                gridItems.push(item);

                /* end case - last exhibit item. push the grid items to the template */
                if(index >= items.length-1) {
                    appendGrid(sorted, gridItems, columns);
                }
            }

            else console.error(`Invalid template value: ${template} Item id: ${uuid}`);
        }

        return sorted;
    }

    const appendRow = (items, item) => {
        items.push(item);
    }

    const appendGrid = (exhibit, items = [], columns = 4) => { // TODO from settings.gridColumnDefault
        exhibit.push({
            type: "item-grid",
            items,
            columns
        });
    }

    render();

    onMount(async () => {
        dispatch('mount', {});
    });
</script>

<div class="exhibit-template">
    {#if exhibit}
        {#each exhibit as {type = "", text = "", subtext = "", id = null}, index} <!-- DEV default null; if/else below-->

            <!-- exhibit section heading TODO: simplify this code -->
            {#if type == "heading"} 
                {#if id}
                    <div {id} class="section-heading exhibit-heading">
                        <div class="container">
                            <div class="section-title">
                                <h3>{text}</h3>
                            </div>
                            <div class="section-subtitle">
                                <h5>{subtext}</h5>
                            </div>
                            <hr>
                        </div>
                    </div>
                {:else}
                    <div class="section-heading exhibit-heading">
                        <div class="container">
                            <div class="section-title">
                                <h3>{text}</h3>
                            </div>
                            <div class="section-subtitle">
                                <h5>{subtext}</h5>
                            </div>
                            <hr>
                        </div>
                    </div>
                {/if}       
                
            <!--exhibit item - row layout -->
            {:else if type == "item"}
                <Item item={exhibit[index]} />

            <!-- exhibit item - grid layout -->
            {:else if type == "item-grid"}
                <Item_Grid items={exhibit[index].items} columns={exhibit[index].columns}/>

            {/if}
        {/each}
    {/if}
</div>

<style>
hr {
    margin: 0;
}

.exhibit-template {
	padding-top: 55px;
}

.section-heading {
    /* margin-bottom: 55px; */
    padding-top: 55px;
    padding-bottom: 55px;
}

.section-heading h3 {
    font-size: 1.75em;
}

:global(.caption) {
    color: inherit;
}
</style>