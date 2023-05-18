<script>
    /* Requires bootstrap > 5.2.3 */
    'use strict'
    
    import { onMount } from 'svelte';
    import Grid_Item_Image_Text from './Grid_Item_Image_Text.svelte';

    export let items = [];
    export let columns = 4; 

    let gridElement;
    let styles = null;

    var columnValue = "3";

    $: {
        columnValue = 12 / columns;
        styles = items[0]?.styles;
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

<div class="grid-section" bind:this={gridElement} >
    <div class="item-grid">
        {#each items as item}
            {#if item.is_published}
                <div class="item col-lg-{columnValue} col-md-{columnValue+1} col-sm-{columnValue+2}">
                    <!-- select grid item component from available set -->
                    <Grid_Item_Image_Text {item} />
                    <!-- look in other item props to determine type of grid item: text (normal), overlay text, wrap text -->
                </div>
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