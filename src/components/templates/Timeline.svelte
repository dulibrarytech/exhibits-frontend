<script>
    import Text_Item from '../Text_Item.svelte';
    import Display_Item from '../Display_Item.svelte';

    export let items;
    export let args; // layout options "scroll" "grid" ?

    console.log("TEST Timeline: exhibit items in:", items)
</script>

<!-- Timeline scroll -->
<div class="container template">
    <h1>Timeline template</h1>

    {#each items as {is_published, layout}, index}
        {#if is_published == 1} 
            {index} <!-- Dev: output index value -->
            <div class="section row">
                {#if layout == "item_right"}
                    <div class="col-md-6"> <!-- col-sm-12 -->
                        <Text_Item data={items[index]} />
                    </div>
                    <div class="col-md-6">
                        <Display_Item data={items[index]} />
                    </div>
                {:else if layout == "item_left"}
                    <div class="col-md-6">
                        <Display_Item data={items[index]} />
                    </div>
                    <div class="col-md-6">
                        <Text_Item data={items[index]} />
                    </div>
                {:else if layout == "item_top"}
                    <div class="col-md-12">
                        <Display_Item data={items[index]} />
                        <Text_Item data={items[index]} />
                    </div>
                {:else if layout == "item_bottom"}
                    <div class="col-md-12">
                        <Text_Item data={items[index]} />
                        <Display_Item data={items[index]} />
                    </div>
                {:else if layout == "item_only"}
                    <div class="col-md-12">
                        <Display_Item data={items[index]} />
                    </div>
                {:else if layout == "text_only"}
                    <div class="col-md-12">
                        <Text_Item data={items[index]} />
                    </div>
                {/if}
            </div>
        {/if}
    {/each}
</div>
<!-- End Timeline scroll -->

<!-- Timeline grid -->

<style>

</style>