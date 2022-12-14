<script>
    import Text_Display from '../Text_Display.svelte';
    import Media_Display from '../Media_Display.svelte';

    export let items;
    export let args; // layout options "scroll" "grid" ?
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
                        <Text_Display item={items[index]} />
                    </div>
                    <div class="col-md-6">
                        <Media_Display item={items[index]} />
                    </div>
                {:else if layout == "item_left"}
                    <div class="col-md-6">
                        <Media_Display item={items[index]} />
                    </div>
                    <div class="col-md-6">
                        <Text_Display item={items[index]} />
                    </div>
                {:else if layout == "item_top"}
                    <div class="col-md-12">
                        <Media_Display item={items[index]} />
                        <Text_Display item={items[index]} />
                    </div>
                {:else if layout == "item_bottom"}
                    <div class="col-md-12">
                        <Text_Display item={items[index]} />
                        <Media_Display item={items[index]} />
                    </div>
                {:else if layout == "item_only"}
                    <div class="col-md-12">
                        <Media_Display item={items[index]} />
                    </div>
                {:else if layout == "text_only"}
                    <div class="col-md-12">
                        <Text_Display item={items[index]} />
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