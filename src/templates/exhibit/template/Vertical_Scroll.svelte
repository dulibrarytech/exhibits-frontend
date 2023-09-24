<script>
    'use strict'
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    
    import Item from '../../../components/Item.svelte';
    import Item_Grid from './partial/Item_Grid.svelte';
    import Vertical_Timeline_Item_Grid from './partial/Vertical_Timeline_Item_Grid.svelte';
    import Exhibit_Heading from './partial/Exhibit_Heading.svelte';

    import {ENTITY_TYPE, ITEM_TEMPLATE} from '../../../config/global-constants';

    export let items;

    const dispatch = createEventDispatcher();

    var exhibit = null;

    const render = () => {
        if(!exhibit) {
            exhibit = sortTemplateItems(items); // should order on "sort" field?
        }
    }

    const sortTemplateItems = (items) => {
        return items; // TODO impl: sort items [] on "order" field ascending. Need to add 'order' field to grid items from first child item.
    }

    const onClickItem = (event) => {
        let itemId = event.detail.itemId || null;
        dispatch('click-item', {itemId});
    }

    render();

    onMount(async () => {
        dispatch('mount', {});
    });
</script>

<div class="exhibit-template">
    {#if exhibit}
        <div class="exhibit-items">
            {#each exhibit as {type = "", text = "", subtext = "", id = null, is_visible=null}, index}

                <!-- exhibit heading -->
                {#if type == ENTITY_TYPE.EXHIBIT_HEADING} 
                    <Exhibit_Heading {id} {text} {subtext} display={is_visible} />
                    
                <!--exhibit item - row layout -->
                {:else if type == ENTITY_TYPE.ITEM}
                    <Item item={exhibit[index]} on:click-item={onClickItem} />

                <!-- exhibit item container - grid -->
                {:else if type == ITEM_TEMPLATE.GRID}
                    <Item_Grid grid={exhibit[index]} on:click-item={onClickItem} />

                <!-- exhibit item container - vertical timeline grid -->
                {:else if type == ITEM_TEMPLATE.VERTICAL_TIMELINE}
                    <Vertical_Timeline_Item_Grid grid={exhibit[index]} on:click-item={onClickItem} />
                {/if}
            {/each}
        </div>
    {/if}
</div>

<style>
.exhibit-template {
    padding-top: 85px;
}

:global(.item) {
    /* margin-bottom: 85px; */
}

:global(.caption) {
    color: inherit;
}

/* :global(.exhibit-template > *) {
    margin-bottom: 85px;
} */
</style>