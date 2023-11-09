<script>
    'use strict'
    
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    
    import Exhibit_Heading from './partials/Exhibit_Heading.svelte';
    import Item_Display from '../components/Item_Display.svelte';
    import Item_Grid from './partials/Item_Grid.svelte';
    import Item_Grid_Vertical_Timeline from './partials/Item_Grid_Vertical_Timeline_2.svelte';

    import {ENTITY_TYPE, ITEM_TEMPLATE, USER_ROLE} from '../config/global-constants';
    import Item from './partials/Item.svelte';

    export let items;
    export let styles = null;
    export let args = {};

    const dispatch = createEventDispatcher();

    let exhibit = null;
    let role;

    const init = () => {
        role = args.userRole || USER_ROLE.STANDARD;
        render();
    }

    const render = () => {
        if(!exhibit) {
            exhibit = sortTemplateItems(items);
        }
    }

    const sortTemplateItems = (items) => {
        // TODO: sort exhibit items, grid should contain order, so sort on order field asc.
        return items; 
    }

    init();

    onMount(async () => {
        dispatch('mount', {});
    });
</script>

<div class="exhibit-template">
    {#if exhibit}
        <div class="exhibit-items">
            {#each exhibit as {type = "", text = "", anchorId = null, is_visible=null, is_published=false}, index}

                <!-- exhibit heading -->
                {#if type == ENTITY_TYPE.EXHIBIT_HEADING} 
                    <Exhibit_Heading id={anchorId} {text} styles={styles?.heading || null} display={is_visible} />

                <!-- exhibit items -->
                {:else if is_published || role == USER_ROLE.ADMIN}

                    <!--exhibit item - row layout -->
                    {#if type == ENTITY_TYPE.ITEM}
                        <Item_Display id={anchorId} item={exhibit[index]} on:click-item template={Item} args={{showPreview: true}}/>

                    <!-- exhibit item container - grid -->
                    {:else if type == ITEM_TEMPLATE.GRID}
                        <Item_Grid id={anchorId} grid={exhibit[index]} on:click-item />

                    <!-- exhibit item container - vertical timeline grid -->
                    {:else if type == ITEM_TEMPLATE.VERTICAL_TIMELINE}
                        <Item_Grid_Vertical_Timeline id={anchorId} grid={exhibit[index]} on:click-item />
                    {/if}

                {/if}
            {/each}
        </div>
    {/if}
</div>

<style>
    :global(.caption) {
        color: inherit;
    }

    :global(.title-heading) {
        font-weight: bold;
        font-size: 1.65em;
        text-transform: uppercase;
    }
</style>