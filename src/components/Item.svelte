<script>
    'use strict'

    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { Resource } from '../libs/resource';
    
    import Text_Display from './Text_Display.svelte';
    import Media_Display from './Media_Display.svelte';

    import { MEDIA_POSITION, MEDIA_BLOCK_WIDTH } from '../config/global-constants';

    export let item = {};
    export let id = null;

    const DEFAULT_MEDIA_WIDTH = "50";

    let itemElement;
    let modalViewerLink;
    
    let {
        uuid, 
        title = null,
        text = "",
        is_published = 0, 
        layout = MEDIA_POSITION.RIGHT,  
        media_width = DEFAULT_MEDIA_WIDTH,
        wrap_text = 0,
        styles = null

    } = item;

    const dispatch = createEventDispatcher();

    if(Object.values(MEDIA_POSITION).includes(layout) == false) console.error(`Invalid layout value: item: ${uuid}`);

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
    {#if is_published == 1} 
        <div class="container">

            {#if layout == MEDIA_POSITION.RIGHT}

                {#if wrap_text}
                    <div class="item-content wrap-text text media-right">
                        <div class="media" style="width:{media_width}%">
                            <Media_Display {item} />
                        </div>
                        {text}
                    </div>
                {:else}
                    <div class="item-content media-right">
                        <div class="media" style="width:{media_width}%">
                            <Media_Display {item} />
                        </div>
                        <div class="text" style="width:{100 - media_width}%">
                            {text}
                        </div>
                    </div>
                {/if}

                {:else if layout == MEDIA_POSITION.LEFT}
                    {#if wrap_text}
                        <div class="item-content wrap-text text media-left">
                            <div class="media" style="width:{media_width}%">
                                <Media_Display {item} />
                            </div>
                            {text}
                        </div>
                    {:else}
                        <div class="item-content media-left">
                            <div class="media" style="width:{media_width}%">
                                <Media_Display {item} />
                            </div>
                            <div class="text" style="width:{100 - media_width}%">
                                {text}
                            </div>
                        </div>
                    {/if}
                    
                {:else if layout == MEDIA_POSITION.TOP}
                    <div class="item-content media-top">
                        <div class="media">
                            <a href data-item-id={uuid} bind:this={modalViewerLink} on:click|stopPropagation|preventDefault={showModalViewer}>
                                <Media_Display {item} />
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
                        <div class="media">
                            <a href data-item-id={uuid} bind:this={modalViewerLink} on:click|stopPropagation|preventDefault={showModalViewer}>
                                <Media_Display {item} />
                            </a>
                        </div>
                    </div>

                {:else if layout == MEDIA_POSITION.MEDIA_ONLY}
                    <div class="item-content">
                        <a href data-item-id={uuid} bind:this={modalViewerLink} on:click|stopPropagation|preventDefault={showModalViewer}>
                            <Media_Display {item} />
                        </a>
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

    :global(.item-component .image > .content) {
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