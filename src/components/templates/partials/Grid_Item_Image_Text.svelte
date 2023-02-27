<script>
    'use strict'

    import { Settings } from '../../../config/settings';
    import Item_Preview from '../../../components/templates/partials/Item_Preview.svelte';

    export let item;
    export let url = null; // overrides item 'url' field
    export let link = null; // linkto
    export let onclick = null; // f()

    var layout = null;
    var date = null;
    var title = null;
    var description = null;

    const ITEM_POSITION = Settings.itemPositionOptions;

    $: {
        date = item.date || null;
        title = item.title || null;
        description = item.description || item.caption || item.text || null;
        layout = item.layout || Settings.gridItemDefaultLayout;
    }
</script>

<div class="grid-item">
    <a href="#">
        {#if layout == ITEM_POSITION.RIGHT}
            <div class="float-right">
                <Item_Preview {item} />
            </div>
            <div class="float-left">
                <div class="title">{title}</div>
                <div class="description">{description}</div>
            </div>
        {:else if layout == ITEM_POSITION.LEFT}
            <div class="float-right">
                <div class="title">{title}</div>
                <div class="description">{description}</div>
            </div>
            <div class="float-left">
                <Item_Preview {item} />
            </div>
        {:else if layout == ITEM_POSITION.TOP}
            <div class="title">{title}</div>
            <Item_Preview {item} />
            <div class="description"><p>{description}</p></div>
        {:else if layout == ITEM_POSITION.BOTTOM}
            <div class="title">{title}</div>
            <div class="description">{description}</div>
            <Item_Preview {item} />
        {:else if layout == ITEM_POSITION.TEXT_ONLY}
            <div class="title">{title}</div>
            <div class="description">{description}</div>
        {:else if layout == ITEM_POSITION.ITEM_ONLY}
            <Item_Preview {item} />
        {/if}
    </a>
</div>

<style>
    a {
        color: initial;
    }

    a:hover {
        text-decoration: none;
    }

    .float-left {float: left}
    .float-right {float: right}

    .title {
        font-weight: bold;
        margin-bottom: 1em;
    }
</style>