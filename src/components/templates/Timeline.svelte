<script>
    import Item from './partials/Item.svelte';
    import Item_Grid from './partials/Item_Grid.svelte';

    export let items;

    var sorted = null;

    const render = () => {
        if(!sorted) {
            sorted = sortTemplateItems(items)
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
            let {uuid, template = "row"} = item;

            if(template == "row") {
                /* if there are items in the item grid item array, push the array to the sorted items before pushing this row item. reset the grid item array */
                if(gridItems.length > 0) {
                    sorted.push({
                        type: "item-grid",
                        items: gridItems
                    });
                    //sorted.push(gridItems); '2'
                    gridItems = [];
                }

                /* push the row item to the sorted items array */
                sorted.push(item);
            }

            else if(template == "grid") {
                /* add the item to the array of grid items */
                gridItems.push(item);

                /* end case - push the grid items array to the sorted items array, if this is the last item */
                if(index >= items.length-1) {
                    sorted.push({
                        type: "item-grid",
                        items: gridItems
                    });
                    //sorted.push(gridItems); '2'
                }
            }

            else console.error(`Invalid template value: ${template} Item id: ${uuid}`);
        }

        return sorted;
    }

    render(); // on mount
</script>

<div class="container template">
    <h1>Timeline template</h1>
    {#if sorted}
        {#each sorted as {type = "", text = "", subtext = ""}, index} <!-- default null; if/else below-->
            {#if type == "heading"} 
                <h6>Section heading</h6>
                <div class="section-heading">
                    <div class="section-title">
                        <h3>{text}</h3>
                    </div>
                    <div class="section-subtitle">
                        <h5>{subtext}</h5>
                    </div>
                </div>
                
            {:else if type == "item"} 
                <h6>Item</h6>
                <Item item={sorted[index]} />
            {:else if type == "item-grid"}
            <!-- {:else if Array.isArray(sorted[index])} '2' -->
                <h6>Item Grid</h6>
                <Item_Grid items={sorted[index].items} />
                <!-- <Item_Grid items={sorted[index]} /> '2' -->
            {/if}
        {/each}
    {/if}
</div>

<style>

</style>