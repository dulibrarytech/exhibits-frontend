<script>
    'use strict'

    import { onMount } from 'svelte';
    
    import Text_Display from '../../components/Text_Display.svelte';
    import Media_Display from '../../components/Media_Display.svelte';

    import { ITEM_POSITION } from '../../config/global-constants';

    export let item = {};

    const VERTICAL_ITEM_MARGIN = "30px";

    let itemElement;
    let {is_published, layout, uuid, styles = null} = item;

    if(Object.values(ITEM_POSITION).includes(layout) == false) console.error(`Invalid layout value: item: ${uuid}`);

    const setTheme = (styles) => {
        for(let style in styles) {
            itemElement.style[style] = styles[style];
        }
    }

    onMount(async () => {
        if(styles) setTheme(styles)
    });
</script>

<div class="item" data-uuid={uuid} bind:this={itemElement}>
    {#if is_published == 1} 
        <div class="section row">
            {#if layout == ITEM_POSITION.RIGHT}
                <div class="col-md-6 col-sm-12">
                    <Text_Display {item} />
                </div>
                <div class="col-md-6 col-sm-12">
                    <Media_Display {item} />
                </div>
            {:else if layout == ITEM_POSITION.LEFT}
                <div class="col-md-6 col-sm-12">
                    <Media_Display {item} />
                </div>
                <div class="col-md-6 col-sm-12">
                    <Text_Display {item} />
                </div>
            {:else if layout == ITEM_POSITION.TOP}
                <div class="col-md-12">
                    <div style="margin-bottom: {VERTICAL_ITEM_MARGIN}">
                        <Media_Display {item} />
                    </div>
                    <Text_Display {item} />
                </div>
            {:else if layout == ITEM_POSITION.BOTTOM}
                <div class="col-md-12">
                    <div style="margin-bottom: {VERTICAL_ITEM_MARGIN}">
                        <Text_Display {item} />
                    </div>
                    <Media_Display {item} />
                </div>
            {:else if layout == ITEM_POSITION.ITEM_ONLY}
                <div class="col-md-12">
                    <Media_Display {item} />
                </div>
            {:else if layout == ITEM_POSITION.TEXT_ONLY}
                <div class="col-md-12">
                    <Text_Display {item} />
                </div>
            {/if}
        </div>
    {/if}
</div>

<style>
    
</style>