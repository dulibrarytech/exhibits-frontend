<script>
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
                let {uuid, template = "row"} = item;

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
        {#each sorted as {type, text = "", subtext = ""}, index}
            {#if type == "heading"} 
                <h6>Section heading</h6>
                <div class="section-heading">
                    <div class="heading-title">
                        <h3>{text}</h3>
                    </div>
                    <div class="heading-subtitle">
                        <h5>{subtext}</h5>
                    </div>
                </div>
                
            {:else if type == "item"} 
                <h6>Item</h6>
                <Item item={sorted[index]} />
            {:else if type == "item-grid"}
                <h6>Item Grid</h6>
                <Item_Grid items={sorted[index].items} />
            {/if}
        {/each}
    {/if}
</div>

<style>

</style>