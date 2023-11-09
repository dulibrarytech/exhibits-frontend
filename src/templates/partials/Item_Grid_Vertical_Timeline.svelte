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

    import {Timeline} from '../../libs/timeline';
    import Grid_Item_Image_Text from './Grid_Item_Image_Text.svelte';

    export let grid = {};

    const dispatch = createEventDispatcher();

    let timelineSection;
    let items;
    let styles;

    let verticalStartPosition = "left";
    let verticalTrigger = "150px";

    const init = () => {
        items = grid.items || [];
        styles = grid.styles?.item_grid || null;
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

    $: init();

    const getPositionClass = (item) => {
        let className = '';

        if(item?.layout == 'left') {
            className = 'layout--left';
        }
        else if(item?.layout == 'right') {
            className = 'layout--right';
        }
        
        return className;
    }

    onMount(async () => {
        Timeline.timeline(document.querySelectorAll('.timeline'), {
            verticalStartPosition,
            verticalTrigger
        });

        document.querySelectorAll('.timeline__item.animated').forEach((item) => {
            item.classList.remove('animated');
        });

        document.querySelectorAll('.timeline__item.top-offset').forEach((item) => {
            item.style.marginTop = "80px";
        });

        if(styles) setTheme(styles);
    });
</script>

<div class="vertical-timeline-item-grid" bind:this={timelineSection}>
    <div class="timeline">
        <div class="timeline__wrap">
            <div class="timeline__items">
                {#each items as item}
                    <!-- {#if item.is_published} -->
                        <!-- {#if item.year_label} -->
                            <div class="timeline__item top-offset {getPositionClass(item)}"> <!-- 'timeline__item--right', 'timeline__item--left', '' -->
                                {#if item.year_label}
                                    <div class="timeline-label">
                                        <h3>{item.year_label}</h3>
                                    </div>
                                {/if}
                                <div class="timeline__content" id="item-{item.uuid}">
                                    <Grid_Item_Image_Text {item} on:click-preview={onClickPreview} />
                                </div>
                            </div>
                        <!-- {:else}
                            <div class="timeline__item">
                                <div class="timeline__content" id="item-{item.uuid}">
                                    <Grid_Item_Image_Text {item} on:click-preview={onClickPreview} />
                                </div>
                            </div>
                        {/if} -->
                    <!-- {/if} -->
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .vertical-timeline-item-grid {
        padding-top: 45px;
        margin: 0 auto 80px auto;
        width: 90%;
    }

    .timeline {
        padding-top: 80px;
        padding-bottom: 80px;
        margin: 0 auto;
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

    :global(.vertical-timeline-item-grid .timeline-item.top-offset) {
        top: 80px;
    }

    :global(.vertical-timeline-item-grid .timeline__item--left .timeline__content:after) {
        border-left: 11px solid lightgray;
    }

    :global(.vertical-timeline-item-grid .timeline__item--right .timeline__content:after) {
        border-right: 11px solid lightgray !important;
    }

    :global(.vertical-timeline-item-grid .timeline .grid-item) {
        border-radius: 10px;
        padding: 45px !important;
    }

    :global(.vertical-timeline-item-grid .vertical-timeline-item-grid .timeline .grid-section) {
        padding: 0;
        margin-bottom: 0px !important;
    }

    :global(.vertical-timeline-item-grid .timeline .item-preview) {
        /* width:65%; */
    }

    :global(.vertical-timeline-item-grid .timeline__item--left .timeline-label) {
        right: -35px;
    }

    :global(.vertical-timeline-item-grid .timeline__item--right .timeline-label) {
        left: -35px;
    }

    @media (min-width: 1400px) {
        .timeline {
            max-width: 70%;
        }
    }
    @media (min-width: 1200px) {
        .timeline {
            max-width: 65%;
        }
    }
    @media (min-width: 992px) {
        .timeline {
            max-width: 60%;
        }
    }
</style>