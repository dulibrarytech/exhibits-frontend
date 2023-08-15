<svelte:head>
    <link rel="stylesheet" href="../assets/styles/timeline.min.css">
</svelte:head>

<script>
    /*
     * https://github.com/squarechip/timeline
     */
    'use strict'

    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    import {Timeline} from '../../../../libs/timeline';
    import Grid_Item_Image_Text from './Grid_Item_Image_Text.svelte';

    export let items = [];

    const dispatch = createEventDispatcher();

    let timelineSection;

    let verticalStartPosition = "left";
    let verticalTrigger = "150px";

    const init = () => {
        Timeline.timeline(document.querySelectorAll('.timeline'), {
            verticalStartPosition,
            verticalTrigger
        });

        let styles = items[0]?.styles?.item_grid;
        if(styles) setTheme(styles);
    }

    const setTheme = (styles) => {
        for(let style in styles) {
            timelineSection.style[style] = styles[style];
        }
    }

    const onClickPreview = (event) => {
        let itemId = event.detail.itemId || null;
        if(itemId) dispatch('click-item', {itemId});
    }

    onMount(async () => {
        init();

        document.querySelectorAll('.timeline__item.animated').forEach((item) => {
            item.classList.remove('animated');
        });

        document.querySelectorAll('.timeline__item.top-offset').forEach((item) => {
            item.style.marginTop = "80px";
        });
    });
</script>

<div class="timeline-section" bind:this={timelineSection}>
    <div class="timeline container">
        <div class="timeline__wrap">
            <div class="timeline__items">
                {#each items as item}
                    {#if item.is_published}
                        {#if item.year_label}
                            <div class="timeline__item top-offset">
                                <div class="timeline-label">
                                    <h3>{item.year_label}</h3>
                                </div>
                                <div class="timeline__content" id="item-{item.uuid}">
                                    <Grid_Item_Image_Text {item} on:click-preview={onClickPreview} />
                                </div>
                            </div>
                        {:else}
                            <div class="timeline__item">
                                <div class="timeline__content" id="item-{item.uuid}">
                                    <Grid_Item_Image_Text {item} on:click-preview={onClickPreview} />
                                </div>
                            </div>
                        {/if}
                    {/if}
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .timeline-section {
        padding: 80px 0;
    }

    .timeline {
        padding-top: 80px;
        padding-bottom: 80px;
    }

    .timeline__content {
        padding: 0;
    }

    .timeline-label h3 {
        margin-bottom: 0;
        padding: 0.1em;
    }

    .timeline-label {
        position: absolute;
        background: lightgray;
        color: black;
        border-radius: 5px;
        top: -50px;
    }

    :global(.timeline-item.top-offset) {
        top: 80px;
    }

    :global(.timeline__item--left .timeline__content:after) {
        border-left: 11px solid lightgray;
    }

    :global(.timeline__item--right .timeline__content:after) {
        border-right: 11px solid lightgray !important;
    }

    :global(.grid-item) {
        border-radius: 10px;
    }

    :global(.timeline .grid-section) {
        padding: 0;
        margin-bottom: 0px !important;
    }

    :global(.timeline .item-preview) {
        width:65%;
    }

    :global(.timeline__item--left .timeline-label) {
        right: -35px;
    }

    :global(.timeline__item--right .timeline-label) {
        left: -35px;
    }
</style>