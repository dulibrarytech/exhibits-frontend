<script>
    /* Requires bootstrap > 5.2.3 */
    'use strict'
    
    import { onMount } from 'svelte';

    // grid options
    import Grid_Item_Image_Text from './Grid_Item_Image_Text.svelte';
    // import Grid_Item_Vertical_Timeline_Item from './Grid_Item_Vertical_Timeline.svelte';

    export let items = [];
    export let columns = 4; 

    //const GRID = "grid";
    //const VERTICAL_TIMELINE = "vertical-timeline";

    let gridElement;
    let styles = null;

    var bootstrapColumnValue;

    $: {
        bootstrapColumnValue = 12 / columns;
        styles = items[0]?.styles;

        console.log("TEST item grid: items in", items)
    }

    const setTheme = (styles) => {
        let {item = {}} = styles;

        for(let style in item) {
            // if 'background' property is set, apply it to any preceding heeding
            if(style == "background") {
                let previousItem = gridElement.previousElementSibling;
                if(previousItem.classList.contains('section-heading')) {
                    previousItem.style.background = styles.item[style];
                }
            }

            // set other styles
            gridElement.style[style] = item[style];
        }
    }

    onMount(async (test) => {
        if(styles) setTheme(styles); 
    });
</script>

<!-- *** DETERMINE HERE. USE FIRST ITEM IN ARRAY 'template' VALUE -->

<!-- template == 'grid' -->
<div class="grid-section" bind:this={gridElement} >
    <div class="item-grid">
        {#each items as item}
            {#if item.is_published}

                <!-- {#if item.template == GRID} -->
                <div class="item col-lg-{bootstrapColumnValue} col-md-{bootstrapColumnValue+1} col-sm-{bootstrapColumnValue+2}"> <!-- move this to inside the GIIT component? -->
                    <Grid_Item_Image_Text {item} /> 
                </div>


                <!-- {:else if item.template == VERTICAL_TIMELINE} -->
                    <!-- outer  -->

            {/if}
        {/each}
    </div>
</div>

<style>
    .item-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin: 0 auto;
        width: 90%;
    }

    :global(.item-grid .item) {
        padding: 2vw;
    }
</style>