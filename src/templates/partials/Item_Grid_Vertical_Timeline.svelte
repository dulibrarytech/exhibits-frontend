<script>
    'use strict'
    
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    import * as Logger from '../../libs/logger.js';

    import Grid_Item_Vertical_Timeline from './Grid_Item_Vertical_Timeline.svelte';
    
    export let grid = {};
    export let id = null;
    export let templateStyles = {};

    let titleElement;

    let timelineSection;
    let title;
    let text;
    let items;
    let sections = null;
    let styles = {};

    const dispatch = createEventDispatcher();

    const SHOW_EMPTY_DECADES = false;
    const CARD_MIN_HEIGHT = 500;
    const RIGHT_SIDE_ITEMS_TOP_OFFSET = 150;

    const init = () => {
        title = grid.title || null;
        text = grid.text || null;
        items = grid.items || [];

        if(items.length > 0) {
            sections = sortItemsToDecadeSections(items);

            items = items.map((item) => {
                item.styles = JSON.parse(item.styles);
                return item;
            }) || [];

            styles = grid.styles || {};
        }
        else console.log(`No items found in timeline grid: ${grid.uuid}`);
        
    }

    const setTheme = ({item = {}, heading = null}) => {
        if(typeof item == 'object') Object.assign(timelineSection.style, item);
        else Logger.module().error(`Invalid grid style object. Grid id: ${id}`);  

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

        // handle null or absent date field in the item
        items = items.map((item) => {
            if(!item.date) {
                item.date = new Date();
                Logger.module().error(`Error creating timeline grid: item has no date field. Item: ${item.uuid}`)
            }
            return item;
        });

        // sort items by date ascending
        items = items.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });

        // get the start and end year of the entire grid item set
        startYear = new Date(items[0].date).getFullYear();
        endYear = new Date(items[items.length-1].date).getFullYear();

        // get the initial decade values
        currentDecade = startYear - (startYear % 10);
        nextDecade = currentDecade + 10;
        lastDecade = (endYear - (endYear % 10)) + 10;

        // define the first decade bucket
        currentBucket = {
            label: currentDecade.toString(),
            leftItems: [],
            rightItems: []
        }

        let decadeIndex = 0, itemDate;
        for(let index=0; index < items.length; index++) {

            itemDate = new Date(items[index].date);

            // insert the item into the current decade
            if(itemDate.getFullYear() >= currentDecade && itemDate.getFullYear() < nextDecade) {

                // sort into specified side of timeline or left if odd, right if even
                if(items[index].layout == 'left' || decadeIndex % 2 == 0) {
                    currentBucket.leftItems.push(items[index]);
                }
                else if(items[index].layout == 'right' || decadeIndex % 2 != 0) {
                    currentBucket.rightItems.push(items[index]);
                }

                // end case
                if(index == items.length-1) {
                    sorted.push(currentBucket)
                }

                // increment the index within the current decade
                decadeIndex++;
            }

            else {
                // push the current decade to the sorted grid items, if the decade contains at least one item. 'SHOW_EMPTY_DECADES' will add a decade even if there are no items in that decade
                if(currentBucket.leftItems.length > 0 || 
                   currentBucket.rightItems.length > 0 ||
                   SHOW_EMPTY_DECADES == true) {

                        sorted.push(currentBucket);
                }

                // increment the decade, reset the index count
                decadeIndex = 0;
                currentDecade = nextDecade;
                nextDecade += 10;

                // define the next decade bucket
                currentBucket = {
                    label: currentDecade.toString(),
                    leftItems: [],
                    rightItems: []
                }

                // re-run the current item and test it in the next decade
                index--;
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

<div class="vertical-timeline-item-grid item-padding" bind:this={timelineSection}>
    <div id={id ?? undefined} class="anchor-offset"></div>
    
    <div class="container">

        {#if title}
            <div class="title-heading" bind:this={titleElement}><h3>{@html title}</h3></div>
        {/if}

        <div class="row timeline-line">
            <div class="col-6" style="border-right: solid"></div>
            <div class="col-6" style="border-left: solid"></div>
        </div> 

        {#if text}<div class="text">{text}</div>{/if}

        <div class="timeline-wrapper">
            {#if sections}

                {#each sections as section}
                    <!-- {#if section.label}<span class="timeline__year time" aria-hidden="true">{section.label}</span>{/if} -->
                    {#if section.label}<span class="timeline__year time"><h3>{section.label}</h3></span>{/if}

                    <div class="timeline-section">
                        {#each section.leftItems as leftItem, index}

                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="timeline timeline-left">
                                        <div class="timeline__group">
                                            <div class="timeline__cards">
                                                <Grid_Item_Vertical_Timeline item={leftItem} on:click-item />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="timeline timeline-right">
                                        <div class="timeline__group">
                                            <div class="timeline__cards" style="margin-top: 150px">
                                                {#if section.rightItems[index]}
                                                    <Grid_Item_Vertical_Timeline item={section.rightItems[index]} on:click-item />
                                                {/if}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        {/each}

                    </div>
                {/each}

            {/if}
        </div> <!-- timeline-wrapper -->
    </div> <!-- container -->
</div> <!-- vertical-timeline-item-grid -->

<style>
    /*
    * --topSpacing = 6.2em (replace 6.2em)
    */

    /*
    skin
    */
    
    .time{
        /* padding: var(--timePadding, .25rem 1.25rem .25rem);
        background-color: var(--timeBackgroundColor, #f0f0f0); */
    
        font-size: var(--timeFontSize, 1.25rem);
        font-weight: var(--timeFontWeight, 700);
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
    
    .timeline__year{
        --timePadding: var(--timelineYearPadding, .5rem 1.5rem);
        --timeColor: var(--uiTimelineSecondaryColor);
        --timeBackgroundColor: var(--uiTimelineMainColor);
        --timeFontWeight: var(--timelineYearFontWeight, 400);
    }

    .timeline__year {
        position: relative;
        left: calc(50% - 1.6em);
        font-size: 22px;
        width: 68px;
        padding: 5px;
    }

    .timeline__year h3 {
        margin-bottom: 0;
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
    .text {
        margin-bottom: 3.5rem;
    }

    .title-heading {
        text-transform: uppercase;
        margin-bottom: 3.5rem;
    }

    .title-heading > h3 {
        font-size: inherit;
    }

    .timeline-wrapper {
        margin: 0 auto;
        width: 100%;
    }

    .timeline {
        border: none;
    }

    .timeline-section .row .col-lg-6 {
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
        margin-top: 50px;
        margin-bottom: 50px;
    }

    /* .vertical-timeline-item-grid {
        padding: 80px 0;
    } */

    .vertical-timeline-item-grid > .container {
        position: relative;
    }

    .timeline-line {
        position: absolute;
        height: 97%;
        width: 100%;
        display: flex;
    }

    .anchor-offset {
        position: relative;
        top: -120px;
    }

    :global(.vertical-timeline-item-grid .vertical-timeline-grid-item) {
        position: relative;
        z-index: 0;
    }

    :global(.vertical-timeline-item-grid .timeline__card::before) {
        content: none;
    }

    :global(.vertical-timeline-item-grid .card) {
        border-radius: 15px;
        box-shadow: 3px 3px 11px -5px #000;
    }

    :global(.vertical-timeline-item-grid .timeline-left .card) {
        margin: 0;
    }

    :global(.vertical-timeline-item-grid .timeline-right .card) {
        margin: 0;
    }

    :global(.vertical-timeline-item-grid .timeline-right .timeline__cards) {
        padding-right: 0;
        padding-left: 0;
    }

    :global(.vertical-timeline-item-grid .timeline-left .timeline__card::after) {
        content: "";
        width: 25vw;
        height: 2px;
        background-color: var(--timelineCardLineBackgroundColor, var(--uiTimelineMainColor));
        position: absolute;
        z-index: -1;
        top: 50%;
        right: 0
    }

    :global(.vertical-timeline-item-grid .timeline-right .timeline__card::before) {
        content: "";
        width: 25vw;
        height: 2px;
        background-color: var(--timelineCardLineBackgroundColor, var(--uiTimelineMainColor));
        position: absolute;
        z-index: -1;
        top: 50%;
    }

    :global(.vertical-timeline-item-grid .card__title) {
        margin-top: 1.5rem;
    }

    :global(.vertical-timeline-grid-item .item-preview) {
        max-height: 600px;
        overflow: hidden;
        height: auto;
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

        .timeline-line {
            display: none;
        }

        .timeline__year {
            margin-top: 0px;
            margin-bottom: 0px;
        }

        :global(.vertical-timeline-item-grid .timeline-right .timeline__cards) {
            padding-right: 7px;
            padding-left: 0;
        }
        
        :global(.vertical-timeline-item-grid .timeline-left .card) {
            margin-left: 0;
            margin-right: 9.65vw;
        }
        :global(.vertical-timeline-item-grid .timeline-right .card) {
            margin-right: 0;
            margin-left: 9.65vw;
        }

        :global(.vertical-timeline-grid-item .item-preview) {
            max-height: 300px;
        }
    }
</style>