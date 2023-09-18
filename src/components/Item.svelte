<script>
    'use strict'

    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { Resource } from '../libs/resource';
    
    import Text_Display from './Text_Display.svelte';
    import Media_Display from './Media_Display.svelte';

    import { ITEM_POSITION, MEDIA_BLOCK_WIDTH } from '../config/global-constants';

    export let item = {};

    const VERTICAL_ITEM_MARGIN = "30px";

    let itemElement;
    let modalViewerLink;
    
    let {
        uuid, 
        title = null, 
        is_published = 0, 
        layout = ITEM_POSITION.RIGHT,  
        media_width = MEDIA_BLOCK_WIDTH.HALF,
        styles = null

    } = item;

    const dispatch = createEventDispatcher();

    if(Object.values(ITEM_POSITION).includes(layout) == false) console.error(`Invalid layout value: item: ${uuid}`);

    const setTheme = (styles) => {
        for(let style in styles.item) {

            if(style == "backgroundImage") {
                let filename = styles.item[style];
                itemElement.style[style] = `url('${ Resource.getUrl(filename) }')`;
            }

            else {
                if(style == "width") {
                    itemElement.style.marginBottom = "80px";
                }

                itemElement.style[style] = styles.item[style];  
            }
        }
    }

    const showModalViewer = (event) => {
        let itemId = modalViewerLink.getAttribute('data-item-id') || null;
        if(itemId) dispatch('click-item', {itemId});
    }

    onMount(async () => {
        if(styles) setTheme(styles)
    });
</script>

<div class="item" data-uuid={uuid} bind:this={itemElement}>
    {#if is_published == 1} 
        <div class="container">
            <div class="section row">
                {#if title}<div class="title">{@html title}</div>{/if}

                {#if layout == ITEM_POSITION.RIGHT}
                    {#if media_width == MEDIA_BLOCK_WIDTH.HALF}
                        <div class="item-component col-lg-6 col-md-6 col-sm-12 text-left">
                            <Text_Display {item} />
                        </div>
                        <div class="item-component col-lg-6 col-md-6 col-sm-12">
                            <a href data-item-id={uuid} bind:this={modalViewerLink} on:click|stopPropagation|preventDefault={showModalViewer}>
                                <Media_Display {item} />
                            </a>
                        </div>
                    {:else if media_width == MEDIA_BLOCK_WIDTH.THIRD}
                        <div class="item-component col-lg-8 col-md-6 col-sm-12 text-left">
                            <Text_Display {item} />
                        </div>
                        <div class="item-component col-lg-4 col-md-6 col-sm-12">
                            <a href data-item-id={uuid} bind:this={modalViewerLink} on:click|stopPropagation|preventDefault={showModalViewer}>
                                <Media_Display {item} />
                            </a>
                        </div>
                    {:else if media_width == MEDIA_BLOCK_WIDTH.QUARTER}
                        <div class="item-component col-lg-9 col-md-6 col-sm-12 text-left">
                            <Text_Display {item} />
                        </div>
                        <div class="item-component col-lg-3 col-md-6 col-sm-12">
                            <a href data-item-id={uuid} bind:this={modalViewerLink} on:click|stopPropagation|preventDefault={showModalViewer}>
                                <Media_Display {item} />
                            </a>
                        </div>
                    {/if}

                {:else if layout == ITEM_POSITION.LEFT}
                    {#if media_width == MEDIA_BLOCK_WIDTH.HALF}
                        <div class="item-component col-lg-6 col-md-6 col-md-12">
                            <a href data-item-id={uuid} bind:this={modalViewerLink} on:click|stopPropagation|preventDefault={showModalViewer}>
                                <Media_Display {item} />
                            </a>
                        </div>
                        <div class="item-component col-lg-6 col-md-6 col-md-12 text-right">
                            <Text_Display {item} />
                        </div>
                    {:else if media_width == MEDIA_BLOCK_WIDTH.THIRD}
                        <div class="item-component col-lg-4 col-md-6 col-md-12">
                            <a href data-item-id={uuid} bind:this={modalViewerLink} on:click|stopPropagation|preventDefault={showModalViewer}>
                                <Media_Display {item} />
                            </a>
                        </div>
                        <div class="item-component col-lg-8 col-md-6 col-md-12 text-right">
                            <Text_Display {item} />
                        </div>
                    {:else if media_width == MEDIA_BLOCK_WIDTH.QUARTER}
                        <div class="item-component col-lg-3 col-md-6 col-md-12">
                            <a href data-item-id={uuid} bind:this={modalViewerLink} on:click|stopPropagation|preventDefault={showModalViewer}>
                                <Media_Display {item} />
                            </a>
                        </div>
                        <div class="item-component col-lg-9 col-md-6 col-md-12 text-right">
                            <Text_Display {item} />
                        </div>
                    {/if}

                {:else if layout == ITEM_POSITION.TOP}
                    <div class="col-md-12">
                        <div style="margin-bottom: {VERTICAL_ITEM_MARGIN}">
                            <a href data-item-id={uuid} bind:this={modalViewerLink} on:click|stopPropagation|preventDefault={showModalViewer}>
                                <Media_Display {item} />
                            </a>
                        </div>
                        <div>
                            <Text_Display {item} />
                        </div>
                    </div>

                {:else if layout == ITEM_POSITION.BOTTOM}
                    <div class="col-md-12">
                        <div style="margin-bottom: {VERTICAL_ITEM_MARGIN}">
                            <Text_Display {item} />
                        </div>
                        <a href data-item-id={uuid} bind:this={modalViewerLink} on:click|stopPropagation|preventDefault={showModalViewer}>
                            <Media_Display {item} />
                        </a>
                        
                    </div>

                {:else if layout == ITEM_POSITION.ITEM_ONLY}
                    <div class="col-md-12">
                        <a href data-item-id={uuid} bind:this={modalViewerLink} on:click|stopPropagation|preventDefault={showModalViewer}>
                            <Media_Display {item} />
                        </a>
                    </div>

                {:else if layout == ITEM_POSITION.TEXT_ONLY}
                    <div class="col-md-12">
                        <Text_Display {item} />
                    </div>

                {/if}
            </div>
        </div>
    {/if}
</div>

<style>
    .item {
        padding-top: 4.5em;
        padding-bottom: 4.5em;
        margin-left: auto;
        margin-right: auto;
    }

    .item-component {
        /* margin-bottom: 30px; */
        padding: 0;
    }

    .title {
        margin-bottom: 30px;
        font-weight: bold;
    }

    :global(.item > .container) {
        padding-right: 3.3em;
        padding-left: 3.3em;
    }

    :global(.caption) {
        font-style: italic;
        font-size: 0.8em;
    }

    :global(button:not(:first-child)) {
        margin-left: 20px;
    }

    :global(.item-component a) {
        color: black;
        text-decoration: none;
    }

    :global(.item-component > a) {
        height: 100%;
        display: block;
    }

    :global(.item-component .media-item) {
        height: 100%;
    }

    :global(.item-component .image > .content) {
        height: 100%;
    }
</style>