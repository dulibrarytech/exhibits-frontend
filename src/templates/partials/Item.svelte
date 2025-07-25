<script>
    'use strict'

    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
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
        text        = item.text || "";
        itemType    = item.item_type || undefined;
        layout      = item.layout || MEDIA_POSITION.RIGHT;
        mediaWidth  = item.media_width || DEFAULT_MEDIA_WIDTH;
        mediaPadding = item.media_padding ?? true;
        wrapText    = item.wrap_text ?? true;
        isEmbedded  = item.is_embedded || false; 
        styles      = item.styles || null;
        
        // set member variables
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
            itemElement.style.backgroundImage = `url('${ itemStyles.backgroundImage }')`;
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

<!-- {#if layout == MEDIA_POSITION.RIGHT}
    <Media_Right>
        {#if title && showTitle && mediaPadding}
            <div class="title-heading" bind:this={titleElement} slot="title"><h3>{@html title}</h3></div>
        {/if}
    </Media_Right>
{/if} -->

<!-- <div class="item {mediaPadding ? 'item-padding' : ''}" data-uuid={uuid} bind:this={itemElement}> -->
 <div class="item item-padding" data-uuid={uuid} bind:this={itemElement}>
    <div id={itemElementId ?? undefined} class="anchor-offset"></div>

    <div class="{mediaPadding ? "container" : "container-no-margin"}">
        {#if title && showTitle && mediaPadding}
            <div class="title-heading" bind:this={titleElement}><h3>{@html title}</h3></div>
        {/if}

        {#if layout == MEDIA_POSITION.RIGHT}
            <!-- <Media_Right  -->
            {#if wrapText}
                <div class="item-content wrap-text text media-right">
                    <div class="media width-{mediaWidth} {mediaPadding ? 'media-padding' : ''}">
                        <Media_Display {item} args={{showPreview, isEmbedded}} on:click-item />
                    </div>

                    {#if mediaPadding}
                        <div bind:this={textElement}>
                            <Text_Display {item} />
                        </div>

                    {:else}
                        {#if title}
                            <div class="title-heading title-padding" bind:this={titleElement}><h3>{@html title}</h3></div>
                        {/if}
                        <div class="text-padding" bind:this={textElement}>
                            <Text_Display {item} />
                        </div>

                    {/if}

                </div>

            {:else}
                <div class="item-content media-right">
                    <div class="media width-{mediaWidth} {mediaPadding ? 'media-padding' : ''}">
                        <Media_Display {item} args={{showPreview, isEmbedded}} on:click-item />
                    </div>
                    <div class="text width-{100 - mediaWidth}">
                        {#if mediaPadding}
                            <div bind:this={textElement}>
                                <Text_Display {item} />
                            </div>

                        {:else}
                            {#if title}
                                <div class="title-heading title-padding" bind:this={titleElement}><h3>{@html title}</h3></div>
                            {/if}
                            <div class="container" bind:this={textElement}>
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
                    </div>

                    {#if mediaPadding}
                        <div bind:this={textElement}>
                            <Text_Display {item} />
                        </div>

                    {:else}
                        {#if title}
                            <div class="title-heading title-padding" bind:this={titleElement}><h3>{@html title}</h3></div>
                        {/if}
                        <div class="text-padding" bind:this={textElement}>
                            <Text_Display {item} />
                        </div>

                    {/if}

                </div>

            {:else}
                <div class="item-content media-left">
                    <div class="media width-{mediaWidth} {mediaPadding ? 'media-padding' : ''}">
                        <Media_Display {item} args={{showPreview, isEmbedded}} on:click-item />
                    </div>

                    <div class="text width-{100 - mediaWidth}">
                        {#if mediaPadding}
                            <div bind:this={textElement}>
                                <Text_Display {item} />
                            </div>

                        {:else}
                            {#if title}
                                <div class="title-heading title-padding" bind:this={titleElement}><h3>{@html title}</h3></div>
                            {/if}
                            <div class="container" bind:this={textElement}>
                                <Text_Display {item} />
                            </div>
                            
                        {/if}
                    </div>
                </div>

            {/if}
            
        {:else if layout == MEDIA_POSITION.TOP}
            <div class="item-content media-top {mediaPadding ? '' : 'item-padding'}">
                {#if mediaPadding}
                    <div class="media media-fullwidth width-{mediaWidth} {mediaPadding ? 'media-padding' : ''}">
                        <Media_Display {item} args={{showPreview, isEmbedded}} on:click-item />
                    </div>
                    <div class="text">
                        <div bind:this={textElement}>
                            <Text_Display {item} />
                        </div>
                    </div>

                {:else}
                    {#if title}
                        <div class="title-heading container" bind:this={titleElement}><h3>{@html title}</h3></div>
                    {/if}
                    <div class="media media-fullwidth width-{mediaWidth} {mediaPadding ? 'media-padding' : ''}">
                        <Media_Display {item} args={{showPreview, isEmbedded}} on:click-item />
                    </div>
                    <div class="text">
                        <div class="container">
                            <div bind:this={textElement}>
                                <Text_Display {item} />
                            </div>
                        </div>
                    </div>

                {/if}
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
                            {#if title}
                                <div class="title-heading" bind:this={titleElement}><h3>{@html title}</h3></div>
                            {/if}
                            <div bind:this={textElement}>
                                <Text_Display {item} />
                            </div>
                        </div>

                    {/if}
                </div>
                <div class="media media-fullwidth width-{mediaWidth} {mediaPadding ? 'media-padding' : ''}">
                    <Media_Display {item} args={{showPreview, isEmbedded}} on:click-item />
                </div>
            </div>

        {:else if layout == MEDIA_POSITION.MEDIA_ONLY}
            <div class="item-content">

                {#if mediaPadding}
                    <div class="media media-fullwidth width-{mediaWidth} media-padding">
                        <Media_Display {item} args={{showPreview}} on:click-item />
                    </div>

                {:else}
                    {#if title}
                        <div class="title-heading title-padding container" bind:this={titleElement}><h3>{@html title}</h3></div>
                    {/if}
                    <div class="media media-fullwidth media-only width-{mediaWidth}">
                        <Media_Display {item} args={{showPreview}} on:click-item />
                    </div>

                {/if}
            </div>

        {:else if layout == MEDIA_POSITION.TEXT_ONLY}
            <div class="item-content text text-only">
                {#if mediaPadding}
                    <div bind:this={textElement}>
                        <Text_Display {item} />
                    </div>

                {:else}
                    {#if title}
                        <div class="title-heading title-padding" bind:this={titleElement}><h3>{@html title}</h3></div>
                    {/if}
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

    .item ~ .item-content:has(.text-only) {
        padding-top: 1.825em;
        padding-bottom: 1.825em;
    }

    .container-no-margin {
        width: 100%;
    }

    .container-no-margin .media {
        padding: 0 !important;
    }

    .media:not(.media-padding) + .text .title-padding {
        padding: 0 0 3.5rem 0;
    }

    .media:not(.media-padding) + .text .container {
        padding: 0;
    }

    .media-right.wrap-text .media:not(.media-padding) {
        margin: 0 0 50px 50px;
    }

    .media-left.wrap-text .media:not(.media-padding) {
        margin: 0 50px 50px 0;
    }

    .media-bottom .media:not(.media-padding) {
        margin: 50px auto 0 auto;
    }

    .media-top .media:not(.media-padding) {
        margin: 0 auto;
    }

    .media-left:not(.wrap-text) .media-padding {
        padding-right: 0;
    }

    .media-right:not(.wrap-text) .media-padding {
        padding-left: 0;
    }

    .item-content .media:not(.media-padding) + .text {
        padding: 3.65em 0;
    }

    .title-heading {
        margin-bottom: 3.65ex;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .title-heading > h3 {
        font-size: inherit;
        margin: 0;
    }

    .title-padding {
        padding: 3.5rem 0 0 3.5rem;
        margin: 0;
    }

    .text-padding {
        padding: 3.5rem;
    }

    .anchor-offset {
        position: relative;
        top: -120px;
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
    .width-100 {width: 100%}

    :global(.caption) {
        font-size: 0.842105em;
        font-style: italic;
    }

    :global(.item .media:not(.media-padding).width-100 .caption),
    :global(.item .media-left .media:not(.media-padding) .caption) {
        margin-left: 3.5rem;
    }

    :global(.item .media-right .media:not(.media-padding) .caption) {
        margin-right: 3.5rem;
    }

    :global(.item p:not(:last-child)) {
        margin-bottom: 2.5rem;
    }

    :global(.item p:last-child) {
        margin-bottom: 0;
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

    :global(.media-top .placeholder-image),
    :global(.media-bottom .placeholder-image) {
        max-width: 100%;
    }

    @media screen and (min-width: 768px) {
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

        .media-left.wrap-text > .media {
            padding: 0 50px 20px 0;
        }
        .media-right.wrap-text > .media {
            padding: 0 0 20px 50px;
        }

        .media-left.wrap-text > .media:not(.media-padding) {
            padding: 0 50px 0 0;
        }
        .media-right.wrap-text > .media:not(.media-padding) {
            padding: 0 0 0 50px;
        }

        .media-left:not(.wrap-text) .media-padding {
            padding-right: 2.5em;
        }

        .media-right:not(.wrap-text) .media-padding {
            padding-left: 2.5em;
        }

        :global(.placeholder-image) {
            max-width: 200px;
        }

        :global(.media-top .placeholder-image),
        :global(.media-bottom .placeholder-image) {
            max-width: 40%;
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
        .width-100 {width: 100%}

        .media-left:not(.wrap-text) > .media,
        .media-left:not(.wrap-text) > .text,
        .media-right:not(.wrap-text) > .media,
        .media-right:not(.wrap-text) > .text {
            height: 100%;
        }

        .item-content .media:not(.media-padding) + .text {
            padding: 3.65em;
        }
    }
</style>