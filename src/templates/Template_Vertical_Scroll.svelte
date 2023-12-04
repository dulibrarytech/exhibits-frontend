<script>
    'use strict'
    
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    
    import Exhibit_Heading from './partials/Exhibit_Heading.svelte';
    import Item_Display from '../components/Item_Display.svelte';
    import Item_Grid from './partials/Item_Grid.svelte';
    import Item_Grid_Vertical_Timeline from './partials/Item_Grid_Vertical_Timeline_2.svelte';
    import Item from './partials/Item.svelte';

    import {ENTITY_TYPE, ITEM_TEMPLATE, USER_ROLE} from '../config/global-constants';

    export let items;
    export let styles = null;
    export let args = {};

    const dispatch = createEventDispatcher();

    let sortedItems;
    let role;
    let templateItemCount;
    var templateItemsMounted;

    const init = () => {
        sortedItems = null;
        role = args.userRole || USER_ROLE.STANDARD;
        
        templateItemCount = items.length-1;
        templateItemsMounted = 0;

        render();
    }

    const render = () => {
        if(!sortedItems) {
            sortedItems = sortTemplateItems(items);
        }
    }

    const sortTemplateItems = (items) => {
        // TODO: sort exhibit items, grid should contain order, so sort on order field asc.
        return items; 
    }

    const onMountTemplateItem = (event) => {
        if(templateItemsMounted++ >= templateItemCount) {
            dispatch('mount-items', {});
        }
    }

    init();

    onMount(async () => {
        dispatch('mount-template', {});
    });
</script>

<div class="exhibit-template">
    {#if sortedItems}
        <div class="exhibit-items">
            {#each sortedItems as {type = "", text = "", anchorId = null, is_visible=null}, index}

                <div class="exhibit-item">

                    <!-- exhibit heading -->
                    {#if type == ENTITY_TYPE.EXHIBIT_HEADING} 
                        <Exhibit_Heading id={anchorId} {text} styles={styles?.heading || null} display={is_visible} on:mount-template-item={onMountTemplateItem} />

                    <!-- exhibit item container - grid -->
                    {:else if type == ITEM_TEMPLATE.GRID}
                        <Item_Grid id={anchorId} grid={sortedItems[index]} args={{role}} templateStyles={styles} on:click-item on:mount-template-item={onMountTemplateItem} />

                    <!-- exhibit item container - vertical timeline grid -->
                    {:else if type == ITEM_TEMPLATE.VERTICAL_TIMELINE}
                        <Item_Grid_Vertical_Timeline id={anchorId} grid={sortedItems[index]} args={{role}} templateStyles={styles} on:click-item on:mount-template-item={onMountTemplateItem} />

                    <!--exhibit item - row layout -->
                    {:else if type == ENTITY_TYPE.ITEM}
                        <Item_Display id={anchorId} item={sortedItems[index]} template={Item} args={{role, showPreview: true}} {styles} on:click-item on:mount-template-item={onMountTemplateItem} />

                    {/if}

                </div>
                
            {/each}
        </div>
    {/if}
</div>

<style>
    .exhibit-template {
        font-size: inherit;
        line-height: 1.579em;
    }

    :global(.caption) {
        margin-top: 1rem;
        text-decoration: none;
        color: inherit;
        font-style: italic;
        font-size: 0.842em;
        line-height: 1.452em;
    }

    :global(.title-heading) {
        font-weight: bold;
        font-size: 1.737em;
        text-transform: uppercase;
    }
</style>