<script>
    'use-strict'

    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    import Item_Preview from '../../components/Media_Item_Preview.svelte';

    export let item = {};

    const dispatch = createEventDispatcher();

    let id = null;
    let styles = null;

    let itemElement;
    let textElement;

    let type;
    var date;
    var title;
    var description;
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
        let {item_text = {}, item={}} = styles;

        /* set item styles */
        for(let style in item) {
            itemElement.style[style] = item[style];
        }

        /* set text (description) section styles */
        if(textElement) {
            for(let style in item_text) {
                textElement.style[style] = item_text[style];
            }
        }
    }

    const onClickPreview = (event) => {
        let itemId = event.target.getAttribute('data-item-id') || null;
        if(itemId) dispatch('click-item', {itemId});
    }

    onMount(() => {
        if(styles) setTheme(styles); 
    });
</script>

<div class="vertical-timeline-grid-item item">
    
    <div class="timeline__card card" bind:this={itemElement}>
        <header class="card__header">
            <!-- <time class="time" datetime="2008-02-02">
                <span class="time__day">2</span>
                <span class="time__month">Feb</span>
            </time> -->
            {#if date}
                <div class="time">{date}</div>
            {:else}
                <div class="time">N.D.</div>
            {/if}

        </header>
        {#if title}<div class="card__title">{title}</div>{/if}
        <hr>
        <div class="card__content">
            {#if media} 
                <a href data-item-id={id} on:click={onClickPreview}>
                    <Item_Preview {item} />
                </a>
            {/if}
            {#if description && description.length > 0}<p class="description">{description}</p>{/if}
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
        /* padding: var(--timePadding, .25rem 1.25rem .25rem);
        background-color: var(--timeBackgroundColor, #f0f0f0); */
    
        font-size: var(--timeFontSize, 1.24rem);
        font-weight: var(--timeFontWeight, 700);
        text-transform: var(--timeTextTransform, uppercase);
        color: var(--timeColor, currentColor);
    }

    .card{
        padding: var(--timelineCardPadding, 1.5rem 1.5rem 1.25rem);
    }
    
    .card__content{
        /* margin-top: var(--cardContentMarginTop, .5rem); */
        margin: 2rem auto;
        width: 90%;
    }

    .card__content > a {
        text-decoration: none;
        color: inherit;
    }
    
    /*
    skin
    */
    
    .card{
        box-shadow: var(--timelineCardBoxShadow, 0 1px 3px 0 rgba(0, 0, 0, .12), 0 1px 2px 0 rgba(0, 0, 0, .24));
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
    p.description {
        margin-top: 1rem;
    }

    :global(.vertical-timeline-grid-item .caption) {
        font-size: 0.6em;
    }
</style>