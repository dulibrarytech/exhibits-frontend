<script>
    /* Requires bootstrap > 5.2.3 */
    'use strict'
    
    import { onMount } from 'svelte';

    import Grid_Item_Image_Text from './Grid_Item_Image_Text.svelte';

    export let items = [];
    export let columns = 4; 

    let gridElement;
    let styles = null;

    var bootstrapColumnValue;

    $: {
        bootstrapColumnValue = 12 / columns;
        styles = items[0]?.styles;
    }

    const setTheme = (styles) => {
        let {item = {}} = styles;

        for(let style in item) {
            /* set specific styles */
            if(style == "background") {
                let previousItem = gridElement.previousElementSibling;
                if(previousItem.classList.contains('section-heading')) {
                    previousItem.style.background = styles.item[style];
                }
            }

            /* set all other styles */
            gridElement.style[style] = item[style];
        }
    }

    onMount(async (test) => {
        if(styles) setTheme(styles); 
    });
</script>

<div class="grid-section" bind:this={gridElement} >
    <div class="item-grid">
        {#each items as item}
            {#if item.is_published}

                <div class="item col-xl-{bootstrapColumnValue} col-lg-{bootstrapColumnValue+1} col-md-{bootstrapColumnValue+2} col-sm-{bootstrapColumnValue+3}">
                    <Grid_Item_Image_Text {item} /> 
                </div>

            {/if}
        {/each}
    </div>
</div>

<style>
    .item-grid {
        display: inline-flex;
        flex-wrap: wrap;
        margin: 0 auto;
        width: 90%;
    }

    :global(.item-grid .item) {
        padding: 1.2vw;
    }
</style>