<script>
    import Text_Item from '../Text_Item.svelte';
    import Media_Item from '../Media_Item.svelte';

    export let items;

    console.log("Timeline: items in:", items)
</script>

<div class="container template">
    <h1>Timeline template</h1>

    {#each items as {is_published, layout}, index}
        {#if is_published == 1} 
            {index}
            <div class="section row">
                {#if layout == "item_right"}
                    <div class="col-md-6">
                        <Text_Item item={items[index]} />
                    </div>
                    <div class="col-md-6">
                        <Media_Item item={items[index]} />
                    </div>
                {:else if layout == "item_left"}
                    <div class="col-md-6">
                        <Media_Item item={items[index]} />
                    </div>
                    <div class="col-md-6">
                        <Text_Item item={items[index]} />
                    </div>
                {:else if layout == "item_top"}
                    <div class="col-md-12">
                        <Media_Item item={items[index]} />
                        <Text_Item item={items[index]} />
                    </div>
                {:else if layout == "item_bottom"}
                    <div class="col-md-12">
                        <Text_Item item={items[index]} />
                        <Media_Item item={items[index]} />
                    </div>
                {:else if layout == "item_only"}
                    <div class="col-md-12">
                        <Media_Item item={items[index]} />
                    </div>
                {:else if layout == "text_only"}
                    <div class="col-md-12">
                        <Text_Item item={items[index]} />
                    </div>
                {/if}
            </div>
        {/if}
    {/each}
</div>

<style>

</style>