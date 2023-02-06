<script>
    import Text_Display from '../../Text_Display.svelte';
    import Media_Display from '../../Media_Display.svelte';

    export let item = {};
    console.log("TEST row item in:", item)

    const ITEM_POSITION = {
        TOP: 'item_top',
        BOTTOM: 'item_bottom',
        LEFT: 'item_left',
        RIGHT: 'item_right',
        ITEM_ONLY: 'item_only',
        TEXT_ONLY: 'text_only'
    }

    let {is_published, layout, uuid} = item;

    if(Object.values(ITEM_POSITION).includes(layout) == false) console.error(`Invalid layout value: item: ${uuid}`);
</script>

<div class="item">
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
                    <Media_Display {item} />
                    <Text_Display {item} />
                </div>
            {:else if layout == ITEM_POSITION.BOTTOM}
                <div class="col-md-12">
                    <Text_Display {item} />
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