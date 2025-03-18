<script>
    'use-strict'

    import { onMount } from 'svelte';
    import Item_Preview from '../../components/Media_Item_Preview.svelte';

    export let item = {};

    let id = null;
    let styles = null;

    let gridItemElement;

    let type;
    let date;
    let title;
    let description;
    let media;

    $: {
        id = item.uuid || "null";
        date = item.date || null;
        title = item.title || null;
        description = item.description || null;
        type = item.item_type || null;
        media = item.media || null;
        styles = item.styles || null;
    }

    const setTheme = (styles) => {
        Object.assign(gridItemElement.style, styles)
    }

    onMount(() => {
        if(styles) setTheme(styles); 
    });
</script>

<div class="vertical-timeline-grid-item item" {id}>
    
    <div class="timeline__card">

        <div class="card" bind:this={gridItemElement}>
            <header class="card__header">
                <!-- <time class="time" datetime="2008-02-02">
                    <span class="time__day">2</span>
                    <span class="time__month">Feb</span>
                </time> -->

                <!-- {#if date}
                    <div class="time">{date}</div>
                {:else}
                    <div class="time">N.D.</div>
                {/if} -->

                {#if title}<div class="card__title">{@html title}</div><hr>{/if}

            </header>

            <div class="card__content">
                {#if description && description.length > 0}<p class="description">{@html description}</p>{/if}

                {#if media} 
                    <div class="vertical-timeline-item">
                        <div class="preview">
                            <Item_Preview {item} on:click-item />
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
        margin: 0 auto 2rem auto;
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
        /* box-shadow: var(--timelineCardBoxShadow, 0 1px 3px 0 rgba(0, 0, 0, .12), 0 1px 2px 0 rgba(0, 0, 0, .24)); */
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

    p.description {
        margin-top: 1rem;
    }
</style>