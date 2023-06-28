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

    const setTheme = (gridItem) => {
        console.log("TEST VTIG setting theme for grid item", gridItem)

        // let {item = {}} = styles;
        // for(let style in item) {
        //     itemElement.style[style] = item[style];
        // }
    }

    const onMountItem = (item) => {
        console.log("TEST VTIG onMountItem", gridItem)
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

                <div class="timeline__item" id="item-{item.uuid}">
                    <div class="timeline__content">
                        <Grid_Item_Image_Text {item} on:mount-item={onMountItem} />
                    </div>
                </div>

                {/if}
            {/each}

        </div>
    </div>
</div>

<style>
    .timeline__item--left > div {
        float: right;
    }
</style>