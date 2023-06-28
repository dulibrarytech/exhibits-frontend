<script>
    /*
     * DU copyright
     * 
     * move to /components
     */
    'use strict'

    import { onMount } from 'svelte';
    import Grid_Item_Image_Text from './Grid_Item_Image_Text.svelte';

    export let items=[];

    let sorted = null;
    
    var timeStart;
    var timeEnd;
    var timeRange;

    const init = () => {
        timeStart = parseInt( items[0]?.timestamp );
        timeEnd = parseInt( items[ items.length-1 ]?.timestamp );

        if(isNaN(timeStart) || isNaN(timeEnd)) throw 'Timeline cound not determine date range'

        timeRange = (timeEnd - timeStart);
        sorted = sortByDate(items);
    }

    const sortByDate = (items) => {
        let sorted = {
            left: [],
            right: []
        };

        /* Display of items to the left and right of the timeline, even order value on left, odd on right */
        for(let index in items) {
            if(index % 2 == 0) sorted.left.push(items[index]);
            else sorted.right.push(items[index])
        }

        return sorted;
    }

    $: {
        try {
            init();
        }
        catch (error) {
            console.error(error);
        }
    }

    // onMount(async () => {
    //     console.log("TEST VT mounted")

    //     try {
    //         applyItemOffsets();
    //     }
    //     catch (error) {
    //         console.error(error);
    //     }
    // });

</script>

<div class="timeline">

    {#if sorted}
    
        <div class="row">

            <div class="col-6 left-items">
                
                {#each sorted.left as item}
                    <div class="timeline-item" id="timeline-item-{item.uuid || ''}">
                        <div class="timeline-connector-left"></div>
                        <Grid_Item_Image_Text {item} />
                    </div>
                {/each}

            </div>

            <div class="col-6 right-items">
                
                {#each sorted.right as item}
                    <div class="timeline-item">
                        <div class="timeline-connector-right"></div>
                        <Grid_Item_Image_Text {item} />
                    </div>
                {/each}

            </div> 

        </div>

    {/if}
    
</div>

<style>
    .left-items {
        border-right: solid;
        border-color: grey;
    }

    .right-items {
        border-left: solid;
        border-color: grey;

        padding-top: 250px;
    }

    .timeline-connector-left {
        position:  relative;
        border-bottom-style: solid;
        border-bottom-color: grey;
        left: 18px;
        top: 30%;
        z-index: -10;
    }

    .timeline-connector-right {
        position:  relative;
        border-bottom-style: solid;
        border-bottom-color: grey;
        right: 18px;
        top: 575px;
        z-index: -10;
    }
</style>