<script>
    'use strict'
    
    import Grid_Item_Image_Text from './Grid_Item_Image_Text.svelte';

    // Shows title as heading

    export let items = [];
    export let columns = 4; 
</script>

<div class="item-grid">
    {#each items as item}
        {#if item.is_published}
            <div class="item item-col-{columns}">
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

    /* 4 col */ 
    .item-col-4 {
        min-width: 22%;
        width: 22%;
    }

    /* 3 col */ 
    .item-col-3 {
        min-width: 30%;
        width: 30%;
    }

    /* 2 col */ 
    .item-col-2 {
        min-width: 47%;
        width: 47%;
    }
</style>