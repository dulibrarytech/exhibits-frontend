<svelte:head>
    <link rel="stylesheet" href="../assets/styles/timeline.min.css">
</svelte:head>

<script>
    /*
     * extracted from https://github.com/squarechip/timeline
     */
    'use strict'

    import { onMount } from 'svelte';

    import {Timeline} from '../../../../libs/timeline';
    import Grid_Item_Image_Text from './Grid_Item_Image_Text.svelte';

    export let items = [];

    let verticalStartPosition = "left";
    let verticalTrigger = "150px";

    const init = () => {
        Timeline.timeline(document.querySelectorAll('.timeline'), {
            verticalStartPosition,
            verticalTrigger
        });
    }

    onMount(async () => {
        init();
    });
</script>

<div class="timeline container">
    <div class="timeline__wrap">
        <div class="timeline__items">

            {#each items as item}
                {#if item.is_published}

                    <div class="timeline__item">
                        <div class="timeline__content" id="item-{item.uuid}">
                            <Grid_Item_Image_Text {item} />
                        </div>
                    </div>

                {/if}
            {/each}

        </div>
    </div>
</div>

<style>
    /* .timeline__item--left > div {
        float: right;
    } */

    .timeline__content {
        padding: 0;
    }

    :global(.grid-item) {
        border-radius: 10px;
    }
</style>