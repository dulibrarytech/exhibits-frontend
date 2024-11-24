<script>
    'use strict'

    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { Resource } from '../../libs/resource';
    import * as Logger from '../../libs/logger.js';
    
    import Text_Display from '../../components/Text_Display.svelte';
    import Media_Display from '../../components/Media_Display.svelte';

    import { MEDIA_POSITION, ITEM_TYPE } from '../../config/global-constants';

    export let item = {};
    export let args = {};
    export let id = null; // dom element id

    const DEFAULT_MEDIA_WIDTH = "50";

    let itemElement;
    let itemElementId;
    let titleElement;
    let textElement;

    let uuid;
    let title;
    let caption;
    let text;
    let itemType;
    let layout;
    let mediaWidth;
    let mediaPadding;
    let wrapText;
    let isEmbedded;

    let styles;

    let {
        showTitle = true,
        showPreview = true

    } = args;

    const dispatch = createEventDispatcher();

    $: init();

    const init = async () => {
        // handle a null item value
        if(!item) {
            item = {};
            Logger.module().error("Null item data");
        }

        // assign item data
        uuid        = item.uuid || null;
        title       = item.title || null;
        caption     = item.caption || null;
        text        = item.text || "";
        itemType    = item.item_type || undefined;
        layout      = item.layout || MEDIA_POSITION.RIGHT;
        mediaWidth  = item.media_width || DEFAULT_MEDIA_WIDTH;
        mediaPadding = item.media_padding ?? true;
        wrapText    = item.wrap_text ?? true;
        isEmbedded  = item.is_embedded || false;
        styles      = item.styles || null;

        // set member variables
        showPreview = !isEmbedded;
        itemElementId = id;

        // ensure the text items use the TEXT_ONLY layout
        if(item.item_type == ITEM_TYPE.TEXT) layout = MEDIA_POSITION.TEXT_ONLY;

        // detect invalid or missing layout
        if(Object.values(MEDIA_POSITION).includes(layout) == false) Logger.module().error(`Invalid layout value: layout: ${layout} item: ${uuid}`);
    }

    const setTheme = ({item, heading}) => {

        let itemStyles = item || {};
        let headingStyles = heading || {};

        // set permitted styles
        let {
            fontFamily = null,
            fontSize = null,
            color = null,
            backgroundColor = null

        } = itemStyles;

        // assign permitted styles to the item element
        if(itemElement) {
            Object.assign(itemElement.style,  {fontFamily, color, backgroundColor});
        }

        // append background image
        if(itemStyles.backgroundImage) {
            itemElement.style.backgroundImage = `url('${ Resource.getFileUrl(itemStyles.backgroundImage ) }')`;
        }

        // set title font family to heading style font family
        if(titleElement) {
            titleElement.style.fontFamily = headingStyles.fontFamily || 'inherit';
        }

        // set text section to item font size, title font size is inherites from the exhibit font family
        if(textElement) {
            if(fontSize) textElement.style.fontSize = fontSize;
        }
    }

    onMount(async () => {
        if(styles) setTheme(styles);
        dispatch('mount-template-item', {type: "item"});
    });
</script>

<div class="item {mediaPadding ? 'item-padding' : ''}" data-uuid={uuid} bind:this={itemElement}>
    <div id={itemElementId ?? undefined} class="anchor-offset"></div>

    <div class={mediaPadding ? "container" : "container-no-margin"}>
        {#if title && showTitle && mediaPadding}
            <div class="title-heading" bind:this={titleElement}>{@html title}</div>
        {/if}

        {#if layout == MEDIA_POSITION.RIGHT}
            {#if wrapText}
                <div class="item-content wrap-text text media-right">
                    <div class="media width-{mediaWidth} {mediaPadding ? 'media-padding' : ''}">
                        <Media_Display {item} args={{showPreview, isEmbedded}} on:click-item />
                        {#if caption}<div class="caption">{caption}</div>{/if}
                    </div>

                    {#if mediaPadding}
                        <div bind:this={textElement}>
                            <Text_Display {item} />
                        </div>

                    {:else}
                        {#if title}<div class="title-heading title-padding" bind:this={titleElement}>{@html title}</div>{/if}
                        <div class="text-padding" bind:this={textElement}>
                            <Text_Display {item} />
                        </div>

                    {/if}

                </div>

            {:else}
                <div class="item-content media-right">
                    <div class="media width-{mediaWidth} {mediaPadding ? 'media-padding' : ''}">
                        <Media_Display {item} args={{showPreview, isEmbedded}} on:click-item />
                        {#if caption}<div class="caption">{caption}</div>{/if}
                    </div>
                    <div class="text width-{100 - mediaWidth}">
                        {#if mediaPadding}
                            <div bind:this={textElement}>
                                <Text_Display {item} />
                            </div>

                        {:else}
                            {#if title}<div class="title-heading title-padding" bind:this={titleElement}>{@html title}</div>{/if}
                            <div class="text-padding" bind:this={textElement}>
                                <Text_Display {item} />
                            </div>

                        {/if}
                    </div>
                </div>

            {/if}

        {:else if layout == MEDIA_POSITION.LEFT}
            {#if wrapText}

                <div class="item-content wrap-text text media-left">
                    <div class="media width-{mediaWidth} {mediaPadding ? 'media-padding' : ''}">
                        <Media_Display {item} args={{showPreview, isEmbedded}} on:click-item />
                        {#if caption}<div class="caption" style="margin-left: {mediaPadding ? '0' : '20px'}">{caption}</div>{/if}
                    </div>

                    {#if mediaPadding}
                        <div bind:this={textElement}>
                            <Text_Display {item} />
                        </div>

                    {:else}
                        {#if title}<div class="title-heading title-padding" bind:this={titleElement}>{@html title}</div>{/if}
                        <div class="text-padding" bind:this={textElement}>
                            <Text_Display {item} />
                        </div>

                    {/if}

                </div>

            {:else}
                <div class="item-content media-left">
                    <div class="media width-{mediaWidth} {mediaPadding ? 'media-padding' : ''}">
                        <Media_Display {item} args={{showPreview, isEmbedded}} on:click-item />
                        {#if caption}<div class="caption" style="margin-left: {mediaPadding ? '0' : '20px'}">{caption}</div>{/if}
                    </div>

                    <div class="text width-{100 - mediaWidth}">
                        {#if mediaPadding}
                            <div bind:this={textElement}>
                                <Text_Display {item} />
                            </div>

                        {:else}
                            {#if title}<div class="title-heading title-padding" bind:this={titleElement}>{@html title}</div>{/if}
                            <div class="text-padding" bind:this={textElement}>
                                <Text_Display {item} />
                            </div>
                            
                        {/if}
                    </div>
                </div>

            {/if}
            
        {:else if layout == MEDIA_POSITION.TOP}
            <div class="item-content media-top {mediaPadding ? '' : 'item-padding'}">
                <div class="media media-fullwidth width-{mediaWidth} {mediaPadding ? 'media-padding' : ''}">
                    <Media_Display {item} args={{showPreview, isEmbedded}} on:click-item />
                    {#if caption}<div class="caption" style="margin-left: {mediaPadding ? '0' : '20px'}">{caption}</div>{/if}
                </div>
                <div class="text">
                    {#if mediaPadding}
                        <div bind:this={textElement}>
                            <Text_Display {item} />
                        </div>

                    {:else}
                        <div class="container">
                            {#if title}<div class="title-heading" bind:this={titleElement}>{@html title}</div>{/if}
                            <div bind:this={textElement}>
                                <Text_Display {item} />
                            </div>
                        </div>

                    {/if}
                </div>
            </div>

        {:else if layout == MEDIA_POSITION.BOTTOM}
            <div class="item-content media-bottom {mediaPadding ? '' : 'item-padding'}">
                <div class="text">
                    {#if mediaPadding}
                        <div bind:this={textElement}>
                            <Text_Display {item} />
                        </div>

                    {:else}
                        <div class="container">
                            {#if title}<div class="title-heading" bind:this={titleElement}>{@html title}</div>{/if}
                            <div bind:this={textElement}>
                                <Text_Display {item} />
                            </div>
                        </div>

                    {/if}
                </div>
                <div class="media media-fullwidth width-{mediaWidth} {mediaPadding ? 'media-padding' : ''}">
                    <Media_Display {item} args={{showPreview, isEmbedded}} on:click-item />
                    {#if caption}<div class="caption" style="margin-left: {mediaPadding ? '0' : '20px'}">{caption}</div>{/if}
                </div>
            </div>

        {:else if layout == MEDIA_POSITION.MEDIA_ONLY}
            <div class="item-content {mediaPadding ? '' : 'item-padding'}">

                {#if mediaPadding}
                    <div class="media media-fullwidth width-{mediaWidth} media-padding">
                        <Media_Display {item} args={{showPreview}} on:click-item />
                        {#if caption}<div class="caption">{caption}</div>{/if}
                    </div>

                {:else}
                    {#if title}<div class="title-heading title-padding container" bind:this={titleElement}>{@html title}</div>{/if}
                    <div class="media media-fullwidth media-only width-{mediaWidth}">
                        <Media_Display {item} args={{showPreview}} on:click-item />
                        {#if caption}<div class="caption" style="margin-left: 20px">{caption}</div>{/if}
                    </div>

                {/if}
            </div>

        {:else if layout == MEDIA_POSITION.TEXT_ONLY}
            <div class="item-content text">
                {#if mediaPadding}
                    <div bind:this={textElement}>
                        <Text_Display {item} />
                    </div>

                {:else}
                    {#if title}<div class="title-heading title-padding" bind:this={titleElement}>{@html title}</div>{/if}
                    <div class="text-padding" bind:this={textElement}>
                        <Text_Display {item} />
                    </div>

                {/if}
            </div>

        {/if}
    </div>
</div>

<style>
    .item {
        margin-left: auto;
        margin-right: auto;
        display: flex;
    }

    .item a { color: inherit }

    .item-padding {
        padding-top: 4.5rem;
        padding-bottom: 4.5rem;
    }

    .title-heading {
        text-transform: uppercase;
        margin: 0 0 4.5rem 0;
    }

    .title-padding {
        padding: 3.5rem 0 0 3.5rem;
        margin: 0;
    }

    .text-padding {
        padding: 3.5rem;
    }

    .media:not(.media-padding) .caption {
        padding: 0 0 3.5rem 0;
    }

    .media-left:not(.wrap-text) .media-padding {
        padding-right: 0;
    }

    .media-right:not(.wrap-text) .media-padding {
        padding-left: 0;
    }

    .anchor-offset {
        position: relative;
        top: -120px;
    }

    .item-content {
        width: 100%;
        height: 100%;
    }

    .media {
        margin-bottom: 55px;
    }

    .media-fullwidth {
        margin: 0 auto;
    }

    .media-only {
        margin-top: 3.5em;
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
        padding: 0 0 50px 0;
    }

    .media-bottom > .media {
        padding: 50px 0 0 0;
    }

    .width-25 {width: 100%}
    .width-33 {width: 100%}
    .width-34 {width: 100%}
    .width-50 {width: 100%}
    .width-66 {width: 100%}
    .width-67 {width: 100%}
    .width-75 {width: 100%}

    .caption {
        margin-top: 1rem;
        text-decoration: none;
        color: inherit;
        font-style: italic;
        font-size: 0.8em;
        line-height: 1.5em;
    }

    :global(.item p:not(:last-child)) {
        margin-bottom: 2.5rem;
    }

    :global(.item p:last-child) {
        margin-bottom: 0;
    }

    :global(.item .caption) {
        font-style: italic;
        font-size: 0.85em;
    }

    :global(.item button.item-button:not(:first-child)) {
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

    :global(.item .container .item-preview) {
        box-shadow: 3px 3px 11px -5px #000;
    }

    @media screen and (min-width: 768px) {
        .width-25 {width: 50%}
        .width-33 {width: 50%}
        .width-34 {width: 50%}
        .width-50 {width: 50%}
        .width-66 {width: 50%}
        .width-67 {width: 50%}
        .width-75 {width: 100%}

        .media {
            margin-bottom: 0;
        }

        .media-right > .media {
            float: right;
        }

        .media-right > .text {
            float: left;
        }

        .media-left > .media {
            float: left;
        }

        .media-left > .text {
            float: right;
        }

        .media-left:not(.wrap-text) > .media,
        .media-left:not(.wrap-text) > .text,
        .media-right:not(.wrap-text) > .media,
        .media-right:not(.wrap-text) > .text {
            height: 100%;
        }

        /* pad around the media element if text wraps AND media padding is enabled */
        .media-left.wrap-text > .media {
            padding: 0 50px 20px 0;
        }
        .media-right.wrap-text > .media {
            padding: 0 0 20px 50px;
        }
        /* pad to the left or right of the media element, not top or bottom, if text wraps AND media padding is not enabled */
        .media-left.wrap-text > .media:not(.media-padding) {
            padding: 0 50px 0 0;
        }
        .media-right.wrap-text > .media:not(.media-padding) {
            padding: 0 0 0 50px;
        }
    }

    @media screen and (min-width: 768px) {
        .media-left:not(.wrap-text) .media-padding {
            padding-right: 2.5em;
        }

        .media-right:not(.wrap-text) .media-padding {
            padding-left: 2.5em;
        }
    }

    @media screen and (min-width: 992px) {
        .width-25 {width: 25%}
        .width-33 {width: 33%}
        .width-34 {width: 34%}
        .width-50 {width: 50%}
        .width-66 {width: 66%}
        .width-67 {width: 67%}
        .width-75 {width: 75%}

        :global(.media-top .width-100 .video-player .content),
        :global(.media-bottom .width-100 .video-player .content),
        :global(.media-only .width-100 .video-player .content),
        :global(.media-top .width-100 .audio-player .content),
        :global(.media-bottom .width-100 .audio-player .content),
        :global(.media-only .width-100 .audio-player .content) {
            margin: 0 auto;
            width: 80%;
        } 
    }
</style>