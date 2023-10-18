<script>
    'use strict'

    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { Resource } from '../libs/resource';
    
    import Text_Display from './Text_Display.svelte';
    import Media_Display from './Media_Display.svelte';
    import Item_Preview from './Item_Preview.svelte';

    import { MEDIA_POSITION, MEDIA_BLOCK_WIDTH, ITEM_TYPE } from '../config/global-constants';

    export let item = {};
    export let id = null;

    const DEFAULT_MEDIA_WIDTH = "50";

    let itemElement;
    let modalViewerLink;
    let mediaComponent;

    let uuid;
    let itemType;
    let title;
    let text;
    let layout;
    let mediaWidth;
    let wrapText;
    let showTitle;
    let isPublished;
    let styles;

    const dispatch = createEventDispatcher();

    $: init();

    const init = () => {

        uuid        = item.uuid;
        itemType    = item.item_type || ITEM_TYPE.IMAGE;
        title       = item.title || null;
        text        = item.text || "";
        isPublished = item.is_published ?? 0;
        layout      = item.layout || MEDIA_POSITION.RIGHT;
        mediaWidth  = item.media_width || DEFAULT_MEDIA_WIDTH;
        wrapText    = item.wrap_text ?? 1;
        showTitle   = item.show_title ?? 0;
        styles      = item.styles || null;

        if(Object.values(MEDIA_POSITION).includes(layout) == false) console.error(`Invalid layout value: item: ${uuid}`);

        switch(itemType) {
            case ITEM_TYPE.LARGE_IMAGE:
            case ITEM_TYPE.PDF:
            case ITEM_TYPE.EXTERNAL_SOURCE:
                mediaComponent = Item_Preview;
                break;
            default:
                mediaComponent = Media_Display;
        }
    }

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

<div class="item" id={id ?? undefined} data-uuid={uuid} bind:this={itemElement}>
    {#if isPublished == 1} 
        <div class="container">

            {#if layout == MEDIA_POSITION.RIGHT}
                {#if wrapText}
                    <div class="item-content wrap-text text media-right">
                        <div class="media" style="width:{mediaWidth}%">
                            <a href data-item-id={uuid} bind:this={modalViewerLink} on:click|stopPropagation|preventDefault={showModalViewer}>
                                <svelte:component this={mediaComponent} {item} />
                            </a>
                        </div>
                        <Text_Display {item} />
                    </div>
                {:else}
                    <div class="item-content media-right">
                        <div class="media" style="width:{mediaWidth}%">
                            <a href data-item-id={uuid} bind:this={modalViewerLink} on:click|stopPropagation|preventDefault={showModalViewer}>
                                <svelte:component this={mediaComponent} {item} />
                            </a>
                        </div>
                        <div class="text" style="width:{100 - mediaWidth}%">
                            <Text_Display {item} />
                        </div>
                    </div>
                {/if}

            {:else if layout == MEDIA_POSITION.LEFT}
                {#if wrapText}
                    <div class="item-content wrap-text text media-left">
                        <div class="media" style="width:{mediaWidth}%">
                            <a href data-item-id={uuid} bind:this={modalViewerLink} on:click|stopPropagation|preventDefault={showModalViewer}>
                                <svelte:component this={mediaComponent} {item} />
                            </a>
                        </div>
                        <Text_Display {item} />
                    </div>
                {:else}
                    <div class="item-content media-left">
                        <div class="media" style="width:{mediaWidth}%">
                            <a href data-item-id={uuid} bind:this={modalViewerLink} on:click|stopPropagation|preventDefault={showModalViewer}>
                                <svelte:component this={mediaComponent} {item} />
                            </a>
                        </div>
                        <div class="text" style="width:{100 - mediaWidth}%">
                            <Text_Display {item} />
                        </div>
                    </div>
                {/if}
                
            {:else if layout == MEDIA_POSITION.TOP}
                <div class="item-content media-top">
                    {#if showTitle}<h4>{title}</h4>{/if}
                    <div class="media media-fullwidth" style="width:{mediaWidth}%">
                        <a href data-item-id={uuid} bind:this={modalViewerLink} on:click|stopPropagation|preventDefault={showModalViewer}>
                            <svelte:component this={mediaComponent} {item} />
                        </a>
                    </div>
                    <div class="text">
                        <Text_Display {item} />
                    </div>
                </div>

            {:else if layout == MEDIA_POSITION.BOTTOM}
                <div class="item-content media-bottom">
                    <div class="text">
                        <Text_Display {item} />
                    </div>
                    <div class="media media-fullwidth" style="width:{mediaWidth}%">
                        <a href data-item-id={uuid} bind:this={modalViewerLink} on:click|stopPropagation|preventDefault={showModalViewer}>
                            <svelte:component this={mediaComponent} {item} />
                        </a>
                    </div>
                </div>

            {:else if layout == MEDIA_POSITION.MEDIA_ONLY}
                <div class="item-content">
                    {#if showTitle}<h4>{title}</h4>{/if}
                    <div class="media media-fullwidth" style="width:{mediaWidth}%">
                        <a href data-item-id={uuid} bind:this={modalViewerLink} on:click|stopPropagation|preventDefault={showModalViewer}>
                            <svelte:component this={mediaComponent} {item} />
                        </a>
                    </div>
                </div>

            {:else if layout == MEDIA_POSITION.TEXT_ONLY}
                <div class="item-content">
                    <Text_Display {item} />
                </div>

            {/if}

        </div>
    {/if}
</div>

<style>
    .item {
        padding-top: 4.5em;
        padding-bottom: 4.5em;
        margin-left: auto;
        margin-right: auto;
        display: flex;
    }

    .item a { color: inherit }

    .item-content {
        width: 100%;
    }

    .media-fullwidth {
        margin: 0 auto;
    }

    .media-right > .media {
        float: none;
        padding: 0;
    }

    .media-right > .text {
        float: none;
    }

    .media-left > .media {
        float: none;
        padding: 0;
    }

    .media-left > .text {
        float: none;
    }

    .media-top > .media {
        padding: 0 0 30px 0;
    }

    .media-bottom > .media {
        padding: 30px 0 0 0;
    }

    :global(.item .caption) {
        font-style: italic;
        font-size: 0.8em;
    }

    :global(.item button:not(:first-child)) {
        margin-left: 20px;
    }

    :global(.item a) {
        color: black;
        text-decoration: none;
    }

    :global(.item > a) {
        height: 100%;
        display: block;
    }

    :global(.item .image > .content) {
        height: 100%;
    }

    @media (min-width:768px) {
        .media-right > .media {
            float: right;
            padding: 0 0 30px 30px;
        }

        .media-right > .text {
            float: left;
        }

        .media-left > .media {
            float: left;
            padding: 0 30px 30px 0;
        }

        .media-left > .text {
            float: right;
        }
    }

    @media (max-width:768px) {
        .media, .text {
            width: 100% !important;
        }
    }
</style>