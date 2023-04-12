<script>
    'use strict'
    
    import Text_Display from '../../components/Text_Display.svelte';
    import Media_Display from '../../components/Media_Display.svelte';

    import { ITEM_POSITION } from '../../config/global-constants';

    export let item = {};

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