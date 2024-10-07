<script>
    'use strict'
    
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    import Grid_Item_Vertical_Timeline from './Grid_Item_Vertical_Timeline.svelte';
    
    export let grid = {};
    export let id = null;
    export let templateStyles = {};

    let titleElement;

    let timelineSection;
    let title;
    let items;
    let sections = null;
    let styles = {};

    const dispatch = createEventDispatcher();

    const init = () => {
        let {uuid='NULL'} = grid;
        let gridStyles;

        title = grid.title || null;
        items = grid.items || [];
        sections = sortItemsToDecadeSections(items);

        try {
            gridStyles = grid.styles || {};
        }
        catch(error) {
            console.error(`Error loading grid styles: ${error}; uuid: ${uuid}`);
        }

        styles = {
            grid: gridStyles,
            heading: templateStyles.heading || null
        }
    }

    const setTheme = ({grid = {}, heading = null}) => {
        Object.assign(timelineSection.style, grid)

        if(titleElement && heading) {
            titleElement.style.fontFamily = heading.fontFamily || 'inherit';
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
     const sortItemsToDecadeSections = (items) => {
        let sorted = []
        let startYear, endYear;
        let currentDecade, nextDecade, lastDecade;
        let currentBucket = {};

        items = items.map((item) => {
            if(!item.date) {
                item.date = new Date();
                console.log(`Error creating timeline grid: item has no date field. Item: ${item.uuid}`)
            }
            return item;
        });

        // sort items by date ascending
        items = items.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });

        startYear = new Date(items[0].date).getFullYear();
        endYear = new Date(items[items.length-1].date).getFullYear();

        currentDecade = startYear - (startYear % 10);
        nextDecade = currentDecade + 10;
        lastDecade = (endYear - (endYear % 10)) + 10;

        currentBucket = {
            label: currentDecade.toString(),
            leftItems: [],
            rightItems: []
        }

        let bucketIndex = 0, itemDate;
        for(let index=0; index < items.length; index++) {

            itemDate = new Date(items[index].date);

            if(itemDate.getFullYear() >= currentDecade && itemDate.getFullYear() < nextDecade) {
                if(items[index].layout == 'left' || bucketIndex % 2 == 0) {
                    currentBucket.leftItems.push(items[index]);
                }
                else if(items[index].layout == 'right' || bucketIndex % 2 != 0) {
                    currentBucket.rightItems.push(items[index]);
                }

                if(nextDecade == lastDecade) sorted.push(currentBucket)
                else bucketIndex++;
            }
            else {
                currentDecade = nextDecade;
                nextDecade += 10;

                sorted.push(currentBucket);
                currentBucket = {
                    label: currentDecade.toString(),
                    leftItems: [],
                    rightItems: []
                }

                index--;
                bucketIndex = 0;
            }
        }

        return sorted;
    }

    $: init();

    onMount(async () => {
        setTheme(styles);
        dispatch('mount-template-item', {});
    });
</script>

<div class="vertical-timeline-item-grid" bind:this={timelineSection}>
    <div id={id ?? undefined} class="anchor-offset"></div>
    
    <div class="container">
        {#if title}<div class="title-heading" bind:this={titleElement}>{@html title}</div><br>{/if}

        <!-- TODO add text section -->

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
                                            <Grid_Item_Vertical_Timeline {item} on:click-item />
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
                                            <Grid_Item_Vertical_Timeline {item} on:click-item />
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
        --timelineMainColor: #181818;
    }

    /*
    =====
    DU 2-column update
    =====
    */

    .title-heading {
        text-transform: uppercase;
    }

    .timeline-wrapper {
        margin: 50px auto 0 auto;
        width: 100%;
    }

    .timeline {
        border: none;
    }

    .timeline-section > div {
        padding-right: 0px;
        padding-left: 0px;
    }

    .timeline-right,
    .timeline-left {
        border: 0;
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
        border-radius: 15px;
        box-shadow: 3px 3px 11px -5px #000;
    }

    :global(.vertical-timeline-item-grid .timeline-left .timeline__card) {
        margin: 0;
    }

    :global(.vertical-timeline-item-grid .timeline-right .timeline__card) {
        margin: 0;
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

    @media screen and (min-width: 992px) {
        .timeline-left {
            border-right: var(--timelineLineWidth, 3px) solid var(--timelineLineBackgroundColor, var(--uiTimelineMainColor));
            padding-left: 15px;
        }

        .timeline-right {
            border-left: var(--timelineLineWidth, 3px) solid var(--timelineLineBackgroundColor, var(--uiTimelineMainColor));
            padding-right: 15px;
        }

        :global(.vertical-timeline-item-grid .timeline-left .timeline__card) {
            margin-left: 0;
            margin-right: 9.65vw;
        }

        :global(.vertical-timeline-item-grid .timeline-right .timeline__card) {
            margin-right: 0;
            margin-left: 9.65vw;
        }
    }
</style>