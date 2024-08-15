<script>
    'use strict'

    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { Resource } from '../../libs/resource';
    
    import Text_Display from '../../components/Text_Display.svelte';
    import Media_Display from '../../components/Media_Display.svelte';

    import { ITEM_TYPE, MEDIA_POSITION } from '../../config/global-constants';

    export let item = {};
    export let args = {};
    export let id = null; // dom element id

    const DEFAULT_MEDIA_WIDTH = "50";

    let itemElement;
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
        uuid        = item.uuid;
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

        showPreview = !isEmbedded;

        if(Object.values(MEDIA_POSITION).includes(layout) == false) console.error(`Invalid layout value: layout: ${layout} item: ${uuid}`);
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

    const onClickItem = (event) => {
        let itemId = event.target.getAttribute('data-item-id');
        if(itemId) dispatch('click-item', {itemId});
    }

    onMount(async () => {
        if(styles) setTheme(styles);
        dispatch('mount-template-item', {type: "item"});
    });
</script>

<div class="item {mediaPadding ? 'item-padding' : ''}" data-uuid={uuid} bind:this={itemElement}>
    <div id={id ?? undefined} class="anchor-offset"></div>

    <div class={mediaPadding ? "container" : "container-no-margin"}>
        {#if title && showTitle}
            <div class="title-heading {mediaPadding ? '' : 'title-padding'}" bind:this={titleElement}>{title}</div>
        {/if}

        {#if layout == MEDIA_POSITION.RIGHT}
            {#if wrapText}
                <div class="item-content wrap-text text media-right">
                    <div class="media width-{mediaWidth}">
                        <a href data-item-id={uuid} on:click|stopPropagation|preventDefault={onClickItem}>
                            <Media_Display {item} {caption} args={{showPreview, isEmbedded}} />
                        </a>
                        {#if caption}<div class="caption {mediaPadding ? '' : 'caption-padding'}">{caption}</div>{/if}
                    </div>
                    <div class={mediaPadding ? '' : 'text-padding'} bind:this={textElement}>
                        <Text_Display {item} />
                    </div>
                </div>

            {:else}
                <div class="item-content media-right">
                    <div class="media width-{mediaWidth}">
                        <a href data-item-id={uuid} on:click|stopPropagation|preventDefault={onClickItem}>
                            <Media_Display {item} args={{showPreview, isEmbedded}} />
                        </a>
                        {#if caption}<div class="caption {mediaPadding ? '' : 'caption-padding'}">{caption}</div>{/if}
                    </div>
                    <div class="text width-{100 - mediaWidth}">
                        <div class={mediaPadding ? '' : 'text-padding'} bind:this={textElement}>
                            <Text_Display {item} />
                        </div>
                    </div>
                </div>

            {/if}

        {:else if layout == MEDIA_POSITION.LEFT}
            {#if wrapText}

                <div class="item-content wrap-text text media-left">
                    <div class="media width-{mediaWidth}">
                        <a href data-item-id={uuid} on:click|stopPropagation|preventDefault={onClickItem}>
                            <Media_Display {item} args={{showPreview, isEmbedded}} />
                        </a>
                        {#if caption}<div class="caption {mediaPadding ? '' : 'caption-padding'}">{caption}</div>{/if}
                    </div>
                    <div class={mediaPadding ? '' : 'text-padding'}>
                        <Text_Display {item} />
                    </div>
                </div>
            {:else}
                <div class="item-content media-left">
                    <div class="media width-{mediaWidth}">
                        <a href data-item-id={uuid} on:click|stopPropagation|preventDefault={onClickItem}>
                            <Media_Display {item} args={{showPreview, isEmbedded}} />
                        </a>
                        {#if caption}<div class="caption {mediaPadding ? '' : 'caption-padding'}">{caption}</div>{/if}
                    </div>
                    <div class="text width-{100 - mediaWidth}">
                        <div class={mediaPadding ? '' : 'text-padding'} bind:this={textElement}>
                            <Text_Display {item} />
                        </div>
                    </div>
                </div>

            {/if}
            
        {:else if layout == MEDIA_POSITION.TOP}
            <div class="item-content media-top">
                <div class="media media-fullwidth width-{mediaWidth}">
                    <a href data-item-id={uuid} on:click|stopPropagation|preventDefault={onClickItem}>
                        <Media_Display {item} args={{showPreview, isEmbedded}} />
                    </a>
                    {#if caption}<div class="caption {mediaPadding ? '' : 'caption-padding'}">{caption}</div>{/if}
                </div>
                <div class="text">
                    <div class={mediaPadding ? '' : 'text-padding'} bind:this={textElement}>
                        <Text_Display {item} />
                    </div>
                </div>
            </div>

        {:else if layout == MEDIA_POSITION.BOTTOM}
            <div class="item-content media-bottom">
                <div class="text">
                    <div class={mediaPadding ? '' : 'text-padding'} bind:this={textElement}>
                        <Text_Display {item} />
                    </div>
                </div>
                <div class="media media-fullwidth width-{mediaWidth}">
                    <a href data-item-id={uuid} on:click|stopPropagation|preventDefault={onClickItem}>
                        <Media_Display {item} args={{showPreview, isEmbedded}} />
                    </a>
                    {#if caption}<div class="caption {mediaPadding ? '' : 'caption-padding'}">{caption}</div>{/if}
                </div>
            </div>

        {:else if layout == MEDIA_POSITION.MEDIA_ONLY}
            <div class="item-content">
                <div class="media media-fullwidth width-{mediaWidth}">
                    <a href data-item-id={uuid} on:click|stopPropagation|preventDefault={onClickItem}>
                        <Media_Display {item} args={{showPreview}} />
                    </a>
                    {#if caption}<div class="caption {mediaPadding ? '' : 'caption-padding'}">{caption}</div>{/if}
                </div>
            </div>

        {:else if layout == MEDIA_POSITION.TEXT_ONLY}
            <div class="item-content text">
                <div class={mediaPadding ? '' : 'text-padding'} bind:this={textElement}>
                    <Text_Display {item} />
                </div>
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
        padding-top: 3.5rem;
        padding-bottom: 3.5rem;
    }

    .title-heading {
        text-transform: uppercase;
        margin: 0 0 3.5rem 0;
    }

    .title-padding {
        padding: 3.5rem 0 0 3.5rem;
        margin: 0;
    }

    .text-padding {
        padding: 3.5rem;
    }

    .caption-padding {
        padding: 0 0 3.5rem 0;
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
        .width-75 {width: 50%}

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

        /* pad around the media element if text wraps */
        .media-left.wrap-text > .media {
            padding: 0 50px 50px 0;
        }
        .media-right.wrap-text > .media {
            padding: 0 0 50px 50px;
        }

        /* add side padding to text if the text does not wrap */
        .media-left .text {
            padding-left: 50px;
        }
        .media-right .text {
            padding-right: 50px;
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
    }
</style>