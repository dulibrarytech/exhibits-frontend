<script>
    /*
     * DU copyright
     * 
     * move to /components
     */
    'use strict'

    import Grid_Item_Image_Text from './Grid_Item_Image_Text.svelte';

    export let items=[];

    let sorted = null;

    const init = () => {
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
</script>

<div class="timeline">

    {#if sorted}
    
        <div class="row">

            <div class="col-6 left-items">
                
                {#each sorted.left as item}

                    <div class="timeline-item" id="timeline-item-{item.uuid || ''}">
                        {#if item.year_label}
                            <div class="timeline-label">
                                <h3>{item.year_label}</h3>
                            </div>
                        {/if}

                        <div class="timeline-connector timeline-connector-left"></div>
                        <Grid_Item_Image_Text {item} />
                    </div>
                {/each}

            </div>

            <div class="col-6 right-items">
                
                {#each sorted.right as item}
                    <div class="timeline-item">

                        {#if item.year_label}
                            <div class="timeline-label">
                                <h3>{item.year_label}</h3>
                            </div>
                        {/if}

                        <div class="timeline-connector timeline-connector-right"></div>
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

    .timeline-item {
        position: relative;
    }

    .timeline-label {
        position: absolute;
        right: -38px;
        z-index: 10;
        background: grey;
        border-radius: 9px;
    }

    .timeline-label h3 {
        margin-bottom: 0;
        padding: 0.1em;
    }

    :global(.timeline-item .grid-item) {
        width: 70%;
        margin: 0 auto;
    }

    .timeline-connector {
        position: absolute;
        border-bottom-style: solid;
        border-bottom-color: gray;
        border-bottom-width: 3px;
        z-index: -10;
        width: 35%;
        top: 50%;
    }

    .timeline-connector-left {
        right: -15px;
    }

    .timeline-connector-right {
        left: -15px;
    }
</style>