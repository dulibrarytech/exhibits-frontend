<script>
    'use-strict'

    import { onMount } from 'svelte';
    import * as Logger from '../../libs/logger.js';
    import Item_Preview from '../../components/Media_Item_Preview.svelte';
    import Item_Display from '../../components/Item_Display.svelte';

    export let item = {};

    let id = null;
    let styles = null;

    let gridItemElement;

    let type;
    let date;
    let title;
    let text;
    let media;

    $: {
        id = item.uuid || "null";
        date = item.date || null;
        title = item.title || null;
        text = item.text || null;
        type = item.item_type || null;
        media = item.media || null;
        styles = item.styles || null;

        if(title) item.title = null;
    }

    const setTheme = (styles) => {
        if(typeof styles == 'object') Object.assign(gridItemElement.style, styles);
        else Logger.module().error(`Invalid grid item style object. Grid item id: ${id}`);    
    }

    onMount(() => {
        if(styles) setTheme(styles); 
    });
</script>

<div class="vertical-timeline-grid-item" {id}>
    
    <div class="timeline__card">

        <div class="card" bind:this={gridItemElement}>
            <header class="card__header">

                {#if title}
                    <div class="card__title"><h4>{@html title}</h4></div>
                    <hr>
                {/if}

            </header>

            <div class="card__content">
                {#if text && text.length > 0}<p class="text">{@html text}</p>{/if}

                {#if media} 
                    <div class="vertical-timeline-item">
                        <div class="preview">
                            <Item_Display {item} template={Item_Preview} args={{showTitle: true, showPreview: true}} on:click-item />
                        </div>
                    </div>
                {/if}
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
    
    .text{
        display: var(--textDisplay, inline-flex);
        font-size: var(--textFontSize, 1rem);  
    }

    /* DU updates */
    .preview {
        margin-top: 30px;
    }

    p.text {
        margin-top: 1rem;
    }
</style>