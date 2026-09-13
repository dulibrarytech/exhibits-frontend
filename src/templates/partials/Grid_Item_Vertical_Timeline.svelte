<script>
    'use-strict'

    import { onMount } from 'svelte';
    import Item from '../../templates/partials/Item.svelte';
    import Item_Display from '../../components/Item_Display.svelte';

    export let item = {};

    let _itemElement;

    const {
        uuid: id = "null",
        title: title = null,
        styles: styles = null,
    } = item;

    const setTheme = (styles) => {
        Object.assign(_itemElement.style, styles);
    }

    onMount(() => {
        if(styles && Object.keys(styles).length > 0) setTheme(styles); 
    });
</script>

<div class="vertical-timeline-grid-item" {id}>
    
    <div class="timeline__card">

        <div class="card" bind:this={_itemElement}>
            <header class="card__header">

                {#if title}
                    <div class="card__title"><h4>{@html title}</h4></div>
                    <hr>
                {/if}

            </header>

            <div class="card__content">
                <div class="vertical-timeline-item">
                    <div class="preview">

                        <Item_Display 
                            {item} 
                            
                            template={Item} 
                            args={{
                                isThumbnail: true,
                                showTitle: true,
                                showPreview: true,
                                mediaItemWidth: 100,
                                gridItem: true,
                            }} 
                            on:click-item 
                        />

                    </div>
                </div>
            </div>
        </div>

        
    </div>
</div>

<style>
    /*
    =====
    DEPENDENCES
    =====
    */

    .r-title{
        margin-top: var(--rTitleMarginTop, 0) !important;
        margin-bottom: var(--rTitleMarginBottom, 0) !important;
    }
    
    
    p:not([class]){
        line-height: var(--cssTypographyLineHeight, 1.78);
        margin-top: var(--cssTypographyBasicMargin, 1em);
        margin-bottom: 0;
    }
    
    p:not([class]):first-child{
        margin-top: 0;
    }

    /*
    core styles
    */

    .time{
        display: var(--timeDisplay, inline-flex);
    }
    
    /*
    extensions
    */
    
    .time__month{
        margin-left: var(--timelineMounthMarginLeft, .25em);
    }
    
    /*
    skin
    */
    
    .time{
        font-size: var(--timeFontSize, 1.24rem);
        font-weight: var(--timeFontWeight, 700);
        text-transform: var(--timeTextTransform, uppercase);
        color: var(--timeColor, currentColor);
    }

    .card{
        padding: var(--timelineCardPadding, 1.5rem 1.5rem 1.25rem);
    }
    
    .card__content{
        margin: 0 auto 1rem auto;
        width: 100%;
    }

    .card__content > a {
        text-decoration: none;
        color: inherit;
    }
    
    /*
    skin
    */
    
    .card{
        background-color: var(--timelineCardBackgroundColor, #fff);
    }
    
    /*
    extensions
    */
    
    .card__title{
        --rTitleMarginTop: var(--cardTitleMarginTop, 1rem);
        font-size: var(--cardTitleFontSize, 1.25rem);
    }

    /*
    text component
    */
    /* removed local text element with the update to use Item template, so applying this style to the text component within the Item template JR 9/13/26 */
    .text{
        display: var(--textDisplay, inline-flex);
        font-size: var(--textFontSize, 1rem);  
    }
    :global(.vertical-timeline-grid-item .item .text-content) {
        font-size: var(--textFontSize, 1rem);  
    }

    :global(.vertical-timeline-grid-item .item) {
        margin-top: 1rem;
    }

    /* DU updates */
    p.text {
        margin-top: 1rem;
    }

    .vertical-timeline-grid-item {
        scroll-margin-top: 150px;
    }
</style>