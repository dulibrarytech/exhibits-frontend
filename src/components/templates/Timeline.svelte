<script>
    // import Text_Display from '../Text_Display.svelte';
    // import Media_Display from '../Media_Display.svelte';
    import Item from './partials/Item.svelte';
    import Item_Grid from './partials/Item_Grid.svelte';

    export let items;

    var sorted = null;

    const render = () => {
        console.log("TEST items in:", items)

        if(!sorted) {
            sorted = [];

            let gridItems = [];
            for(let item of items) {
                let {uuid, template = null} = item;

                if(template == "row") {
                    if(gridItems.length > 0) {
                        sorted.push({
                            type: "item-grid",
                            items: gridItems
                        })

                        gridItems = [];
                    }
                    sorted.push(item);
                }

                else if(template == "grid") {
                    gridItems.push(item);
                }

                else console.error(`Invalid template value: ${template} Item id: ${uuid}`);
            }

            console.log("TEST sort complete. sorted items:", sorted)
        }
    }

    render(); // on mount
</script>

<div class="container template">
    <h1>Timeline template</h1>
    {#if sorted}
        {#each sorted as {type}, index}
            {#if type == "item"} 
                <Item item={sorted[index]} />
            {:else if type == "item-grid"}
                <Item_Grid items={sorted[index].items} />
            {/if}
        {/each}
    {/if}
</div>

<style>

</style>