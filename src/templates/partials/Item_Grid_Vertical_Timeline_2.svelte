<script>
    'use strict'
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    import Grid_Item_Vertical_Timeline_2 from './Grid_Item_Vertical_Timeline_2.svelte';
    
    import {USER_ROLE} from '../../config/global-constants';

    export let grid = {};
    export let id = null;
    export let args = {};

    let timelineSection;
    let title;
    let items;
    let sections = null;
    let styles;

    let {
        role = USER_ROLE.STANDARD

    } = args;

    const dispatch = createEventDispatcher();

    const DEFAULT_TOP_OFFSET = 100;

    const init = () => {
        title = grid.title || null;
        items = grid.items || [];
        styles = grid.styles?.item_grid || null;
        sections = sortItemsToYearSections(items);
    }

    const setTheme = (styles) => {
        for(let style in styles) {
            timelineSection.style[style] = styles[style];
        }
    }

    /**
     * Sorts the items into sections defined by 'year_label' field:
     * 
     * Creates a section for each year_label, and sorts the items in each section into 2 arrays: one for items on
     * the left of the timeline, and the other for right side items. Grid items that have an odd index value are sorted to the left, and those with an even value are sorted to the right.
     * 
     * @param items - Array of exhibit items
     * 
     * @returns - Array of timeline sections denoted by year_label
     */
     const sortItemsToYearSections = (items) => {
        let sorted = []
        let section = null;

        for(let index in items) {
            // get the data from the item
            let item = items[index];
            let {year_label = null, layout = ""} = item;
 
            // begin a new timeline section if the item has a 'year_label' field, or if this is the first item
            if(year_label || index == 0) {

                // end the previous section (if this is index 0, there will be no previous section)
                if(section) sorted.push(section);

                // start a new section
                section = {
                    label: year_label, 
                    leftItems: [],
                    rightItems: []
                }
            }

            // add even index items to the left side, and odd index items to the right side
            if(layout == 'left' || index % 2 == 0) {
                section.leftItems.push(item);

            }
            else if(layout == 'right' || index % 2 != 0) {
                section.rightItems.push(item);
            }

            // end the section if this is the last item in the grid
            if(index == items.length-1) {
                sorted.push(section);
            }
        }

        return sorted;
    }

    $: init();

    onMount(async () => {
        if(styles) setTheme(styles);
        dispatch('mount-template-item', {});
    });
</script>

<div class="vertical-timeline-item-grid" bind:this={timelineSection}>
    <div id={id ?? undefined} class="anchor-offset"></div>
    
    <div class="container">
        {#if title}<div class="title-heading">{title}</div><br>{/if}

        <div class="timeline-wrapper">
            {#if sections}

            <!-- for section in sections -->
            {#each sections as section, index}
                {#if section.label}<span class="timeline__year time" aria-hidden="true">{section.label}</span>{/if}

                    <div class="row timeline-section">

                        <div class="col-lg-6">
                            <div class="timeline timeline-left">
                                <div class="timeline__group">
                                    <div class="timeline__cards">
                                        {#each section.leftItems as item}

                                            {#if item.is_published || role == USER_ROLE.ADMIN}
                                                <Grid_Item_Vertical_Timeline_2 {item} on:click-item />
                                            {/if}

                                        {/each}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="timeline timeline-right">
                                <div class="timeline__group">
                                    <div class="timeline__cards">
                                        {#each section.rightItems as item}

                                            {#if item.is_published || role == USER_ROLE.ADMIN}
                                                <Grid_Item_Vertical_Timeline_2 {item} on:click-item />
                                            {/if}

                                        {/each}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                {/each}
            {/if}
        </div>
    </div> <!-- container -->
</div>

<style>
    /*
    skin
    */
    
    .time{
        /* padding: var(--timePadding, .25rem 1.25rem .25rem);
        background-color: var(--timeBackgroundColor, #f0f0f0); */
    
        font-size: var(--timeFontSize, 1.25rem);
        font-weight: var(--timeFontWeight, 700);
        text-transform: var(--timeTextTransform, uppercase);
        color: var(--timeColor, currentColor);
    }

    /*
    =====
    CORE STYLES
    =====
    */
    
    .timeline{
        display: var(--timelineDisplay, grid);
        grid-row-gap: var(--timelineGroupsGap, 2rem);
        height: 100%;
    }
    
    /*
    1. If timeline__year isn't displaed the gap between it and timeline__cards isn't displayed too
    */
    
    .timeline__cards{
        display: var(--timeloneCardsDisplay, grid);
        grid-row-gap: var(--timeloneCardsGap, 1.5rem);
    }
    
    
    /*
    =====
    SKIN
    =====
    */
    
    .timeline{
        --uiTimelineMainColor: var(--timelineMainColor, #222);
        --uiTimelineSecondaryColor: var(--timelineSecondaryColor, #fff);
    
        border-left: var(--timelineLineWidth, 3px) solid var(--timelineLineBackgroundColor, var(--uiTimelineMainColor));
        padding-top: 1rem;
        padding-bottom: 1.5rem;
    }

    .timeline:first-child {
        padding-top: 4rem;
    }

    .timeline:last-child {
        padding-bottom: 4rem;
    }
    
    .timeline__year{
        --timePadding: var(--timelineYearPadding, .5rem 1.5rem);
        --timeColor: var(--uiTimelineSecondaryColor);
        --timeBackgroundColor: var(--uiTimelineMainColor);
        --timeFontWeight: var(--timelineYearFontWeight, 400);
    }

    .timeline__year {
        position: relative;
        left: calc(50% - 1.6em);
        font-size: 1.3em;
        width: 3.2em;
    }
    
    /*
    1. Stoping cut box shadow
    */
    
    .timeline__cards{
        overflow: hidden;
        padding-top: .25rem; /* 1 */
        padding-bottom: .25rem; /* 1 */
    }
    
    /*
    =====
    SETTINGS
    =====
    */
    /**/
    .timeline{
        --timelineMainColor: #e5e3e1;
    }

    /*
    =====
    DU 2-column update
    =====
    */

    .timeline-wrapper {
        margin: 0 auto;
        width: 80%;
    }

    .timeline {
        border: none;
    }

    .timeline-section > div {
        padding-right: 0px;
        padding-left: 0px;
    }

    .timeline-left {
        border-right: var(--timelineLineWidth, 3px) solid var(--timelineLineBackgroundColor, var(--uiTimelineMainColor));
        padding-left: 15px;
    }

    .timeline-right {
        border-left: var(--timelineLineWidth, 3px) solid var(--timelineLineBackgroundColor, var(--uiTimelineMainColor));
        padding-right: 15px;
    }

    .timeline__year {
        display: block;
        text-align: center;
        background-color: #303030;
        color: #e5e3e1;
        border-radius: 5px;
    }

    .vertical-timeline-item-grid {
        padding: 80px 0;
    }

    .anchor-offset {
        position: relative;
        top: -120px;
    }

    :global(.vertical-timeline-item-grid .vertical-timeline-grid-item) {
        /* height: 610px; */
        position: relative;
        z-index: 0;
    }

    :global(.vertical-timeline-item-grid .timeline-right .vertical-timeline-grid-item) {
        margin-top: 6.2em;
    }

    :global(.vertical-timeline-item-grid .timeline__card::before) {
        content: none;
    }

    :global(.vertical-timeline-item-grid .card) {
        border-radius: 5px;
    }

    :global(.vertical-timeline-item-grid .timeline-left .timeline__card) {
        margin-left: 0;
        margin-right: 9.65vw;
    }

    :global(.vertical-timeline-item-grid .timeline-right .timeline__card) {
        margin-right: 0;
        margin-left: 9.65vw;
    }

    :global(.vertical-timeline-item-grid .timeline-left .timeline__card::after) {
        content: "";
        width: 20.65vw;
        height: 2px;
        background-color: var(--timelineCardLineBackgroundColor, var(--uiTimelineMainColor));
        position: absolute;
        z-index: -1;
        top: 150px;
        right: -166px;
    }

    :global(.vertical-timeline-item-grid .timeline-right .timeline__card::before) {
        content: "";
        width: 20.65vw;
        height: 2px;
        background-color: var(--timelineCardLineBackgroundColor, var(--uiTimelineMainColor));
        position: absolute;
        z-index: -1;
        top: 150px;
        left: -166px;
    }

    :global(.vertical-timeline-item-grid .card__title) {
        margin-top: 1.5rem;
    }
</style>