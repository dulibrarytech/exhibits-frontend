<script>
    /* Requires bootstrap > 5.2.3 */
    'use strict'
    
    import Grid_Item_Image_Text from './Grid_Item_Image_Text.svelte';

    export let items = [];
    export let columns = 4; 

    console.log("TEST GRID", (12 % 1))

    const BOOTSTRAP_GRID_SIZE = "lg" // sm, md, lg;

    var columnValue = "3";

    $: {
        columnValue = 12 / columns;
    }
</script>

<div class="item-grid">
    {#each items as item}
        {#if item.is_published}
            <div class="item col-{BOOTSTRAP_GRID_SIZE}-{columnValue}">
                <!-- select grid item component from available -->
                <Grid_Item_Image_Text {item} />
                <!-- look in other item props to determine type of grid item: text (normal), overlay text, wrap text -->
            </div>
        {/if}
    {/each}
</div>

<style>
    .item-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    .item {
        padding: 5px;
    }
</style>