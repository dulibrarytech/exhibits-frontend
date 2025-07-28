<script>
    'use strict'

    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import * as Logger from '../../libs/logger.js';
    
    import Text_Display from "../../components/Text_Display.svelte";
    import Media_Display from "../../components/Media_Display.svelte";
    import Media_Right from "./media-templates/Media_Right.svelte";
    import Media_Left from "./media-templates/Media_Left.svelte";
    import Media_Top from "./media-templates/Media_Top.svelte";
    import Media_Bottom from "./media-templates/Media_Bottom.svelte";
    import Media_Only from "./media-templates/Media_Only.svelte";
    import Text_Only from "./media-templates/Text_Only.svelte";

    import { MEDIA_POSITION, ITEM_TYPE } from '../../config/global-constants';

    export let item = {};
    export let args = {};
    export let id = null; // dom element id

    const DEFAULT_MEDIA_WIDTH = "50";

    let itemElement;
    let titleElement;

    let uuid;
    let title;
    let text;
    let caption;
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

        uuid        = item.uuid || null;
        title       = item.title || null;
        text        = item.text || "";
        caption     = item.caption || null;
        itemType    = item.item_type || undefined;
        layout      = item.layout || MEDIA_POSITION.RIGHT;
        mediaWidth  = item.media_width || DEFAULT_MEDIA_WIDTH;
        mediaPadding = item.media_padding ?? true;
        wrapText    = item.wrap_text ?? true;
        isEmbedded  = item.is_embedded || false;
        styles      = item.styles || null;
        
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
    }

    onMount(async () => {
        if(styles) setTheme(styles);
        dispatch('mount-template-item', {type: "item"});
    });
</script>

<div class="item item-padding" data-uuid={uuid} bind:this={itemElement}>
    <div id={id ?? undefined} class="anchor-offset"></div>

    {#if layout == MEDIA_POSITION.RIGHT}
        <Media_Right {wrapText} {mediaPadding} {mediaWidth} {caption}>
            <div slot="title">
                {#if title}<div bind:this={titleElement}><h3>{@html title}</h3></div>{/if}
            </div>
            <div slot="media-display">
                <Media_Display {item} args={{showPreview, isEmbedded}} on:click-item />
            </div>
            <div slot="text-display">
                <Text_Display {item} />
            </div>
        </Media_Right>

    {:else if layout == MEDIA_POSITION.LEFT}
        <Media_Left {wrapText} {mediaPadding} {mediaWidth} {caption}>
            <div slot="title">
                {#if title}<div bind:this={titleElement}><h3>{@html title}</h3></div>{/if}
            </div>
            <div slot="media-display">
                <Media_Display {item} args={{showPreview, isEmbedded}} on:click-item />
            </div>
            <div slot="text-display">
                <Text_Display {item} />
            </div>
        </Media_Left>

    {:else if layout == MEDIA_POSITION.TOP}
        <Media_Top {mediaPadding} {mediaWidth} {caption}>
            <div slot="title">
                {#if title}<div bind:this={titleElement}><h3>{@html title}</h3></div>{/if}
            </div>
            <div slot="media-display">
                <Media_Display {item} args={{showPreview, isEmbedded}} on:click-item />
            </div>
            <div slot="text-display">
                <Text_Display {item} />
            </div>
        </Media_Top>

    {:else if layout == MEDIA_POSITION.BOTTOM}
        <Media_Bottom {mediaPadding} {mediaWidth} {caption}>
            <div slot="title">
                {#if title}<div bind:this={titleElement}><h3>{@html title}</h3></div>{/if}
            </div>
            <div slot="media-display">
                <Media_Display {item} args={{showPreview, isEmbedded}} on:click-item />
            </div>
            <div slot="text-display">
                <Text_Display {item} />
            </div>
        </Media_Bottom>

    {:else if layout == MEDIA_POSITION.MEDIA_ONLY}
        <Media_Only {mediaPadding} {mediaWidth} {caption}>
            <div slot="title">
                {#if title}<div bind:this={titleElement}><h3>{@html title}</h3></div>{/if}
            </div>
            <div slot="media-display">
                <Media_Display {item} args={{showPreview, isEmbedded}} on:click-item />
            </div>
        </Media_Only>

    {:else if layout == MEDIA_POSITION.TEXT_ONLY}
        <Text_Only>
            <div slot="title">
                {#if title}<div bind:this={titleElement}><h3>{@html title}</h3></div>{/if}
            </div>
            <div slot="text-display">
                <Text_Display {item} />
            </div>
        </Text_Only>

    {/if}

</div>

<style>
    :global(.item .text-item a) {
        text-decoration: underline;
    }

    :global(.item .title-heading) {
        margin-bottom: 3.65rem;
        text-transform: uppercase;
    }

    :global(.item .title-heading h3) {
        font-size: inherit;
        margin: 0;
    }

    :global(.item .caption) {
        margin-top: 0.9rem;
        text-decoration: none;
        color: inherit;
        line-height: 1.5em;
    }
</style>