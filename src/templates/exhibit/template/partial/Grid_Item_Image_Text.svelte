<script>
    'use strict'

    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { Settings } from '../../../../config/settings';

    import Item_Preview from '../../../../components/Item_Preview.svelte';

    import {ITEM_POSITION} from '../../../../config/global-constants';

    export let item;

    const dispatch = createEventDispatcher();

    let id = null;
    let itemElement;
    let textElement = null;
    let styles = null;

    var layout = null;
    var date = null;
    var title = null;
    var description = null;

    $: {
        id = item.uuid || "null";
        date = item.date || null;
        title = item.title || null;
        description = item.description || item.text || "text not found";
        layout = item.layout || Settings.gridItemDefaultLayout;
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

    const showModalViewer = (event) => {
        let itemId = event.target.getAttribute('data-item-id') || null;
        if(itemId) dispatch('click-preview', {itemId});
    }

    onMount(() => {
        if(styles) setTheme(styles); 
    });
</script>

<div class="grid-section">
    <div class="grid-item" bind:this={itemElement}>
        {#if date}
            <div class="date-heading exhibit-heading">
                <div class="item-date">{date}</div>
                <hr>
                <br>
            </div> 
        {/if}

        {#if layout == ITEM_POSITION.RIGHT}

            <div class="float-right">
                <a href data-itemm-id={id} on:click={showModalViewer}>
                    <Item_Preview {item} />
                </a>
            </div> 
            <div class="float-left">
                {#if title}<div class="title">{title}</div>{/if}
                <div class="description" bind:this={textElement}>{@html description}</div>
            </div>
            
        {:else if layout == ITEM_POSITION.LEFT} 
            <div class="float-right">
                {#if title}<div class="title">{title}</div>{/if}
                <div class="description" bind:this={textElement}>{@html description}</div>
            </div>
            <div class="float-left">
                <a href data-item-id={id} on:click={showModalViewer}>
                    <Item_Preview {item} />
                </a>
            </div>

        {:else if layout == ITEM_POSITION.TOP}
            {#if title}<div class="title">{title}</div>{/if}
            <a href data-item-id={id} on:click={showModalViewer}>
                <Item_Preview {item} />
            </a>
            <div class="description top-margin" bind:this={textElement}><p>{@html description}</p></div>

        {:else if layout == ITEM_POSITION.BOTTOM}
            {#if title}<div class="title">{title}</div>{/if}
            <div class="description" bind:this={textElement}>{@html description}</div>
            <a href data-item-id={id} on:click={showModalViewer}>
                <Item_Preview {item} />
            </a>
            
        {:else if layout == ITEM_POSITION.TEXT_ONLY}
            {#if title}<div class="title">{title}</div>{/if}
            <div class="description" bind:this={textElement}>{@html description}</div>

        {:else if layout == ITEM_POSITION.ITEM_ONLY}
            <div class="item-no-text">
                {#if title}<div class="title">{title}</div>{/if}
                <a href data-item-id={id} on:click={showModalViewer}>
                    <Item_Preview {item} />
                </a>
            </div>
        {/if}
    </div>
</div>

<style>
    a {
        color: inherit;
    }

    a:hover {
        text-decoration: none;
    }

    .grid-section {
        margin-bottom: 85px;
    }

    .grid-item {
        padding: 15px;
    }

    .top-margin {
        margin-top: 40px;
    }

    .bottom-margin {
        margin-bottom: 20px;
    }

    .item-date {
        font-weight: bold;
        font-size: 1.2em;
    }

    .date-heading {
        font-size: 1em;
    }

    .description {
        text-align: left;
        font-size: 0.9em;
        padding: 8px;
    }

    .description p {
        margin-bottom: 0;
    }

    .float-left {float: left}
    .float-right {float: right}

    .title {
        font-weight: bold;
        margin-bottom: 30px;
    }
</style>