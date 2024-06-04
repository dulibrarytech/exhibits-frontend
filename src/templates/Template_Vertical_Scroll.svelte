<script>
    'use strict'
    
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    
    import Exhibit_Heading from './partials/Exhibit_Heading.svelte';
    import Item_Display from '../components/Item_Display.svelte';
    import Item_Grid from './partials/Item_Grid.svelte';
    import Item_Grid_Vertical_Timeline from './partials/Item_Grid_Vertical_Timeline.svelte';
    import Item_Grid_Vertical_Timeline_2 from './partials/Item_Grid_Vertical_Timeline_2.svelte';
    import Item from './partials/Item.svelte';

    import {ENTITY_TYPE, USER_ROLE} from '../config/global-constants';

    export let items = [];
    export let styles = null;
    export let args = {};

    const dispatch = createEventDispatcher();

    let displayItems;
    let role;
    let templateItemCount;
    var templateItemsMounted;

    const init = () => {
        console.log("Initializing template...");

        displayItems = null;
        role = args.userRole || USER_ROLE.STANDARD;
        
        templateItemCount = items.length-1;
        templateItemsMounted = 0;

        render();
    }

    const render = () => {
        console.log("Rendering template...");
        if(!displayItems) displayItems = formatTemplateItems(items);
    }

    const formatTemplateItems = (items) => {
        // TODO: update any data field
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
    {#if displayItems}
        <div class="exhibit-items">
            {#each displayItems as {uuid = "", type = "", text = "", anchorId = null, is_visible=null}, index}

                <div class="exhibit-item" id={uuid}>

                    <!-- exhibit heading -->
                    {#if type == ENTITY_TYPE.EXHIBIT_HEADING} 
                        <Exhibit_Heading id={anchorId} {text} styles={displayItems[index].styles || styles?.heading || null} display={is_visible} on:mount-template-item={onMountTemplateItem} />

                    <!-- exhibit item container - grid -->
                    {:else if type == ENTITY_TYPE.GRID}
                        <Item_Grid id={anchorId} grid={displayItems[index]} args={{role}} templateStyles={styles} on:click-item on:mount-template-item={onMountTemplateItem} />

                    <!-- exhibit item container - vertical timeline grid 1 column -->
                    {:else if type == ENTITY_TYPE.VERTICAL_TIMELINE}
                        <Item_Grid_Vertical_Timeline id={anchorId} grid={displayItems[index]} args={{role}} templateStyles={styles} on:click-item on:mount-template-item={onMountTemplateItem} />

                    <!-- exhibit item container - vertical timeline grid 2 column -->
                    {:else if type == ENTITY_TYPE.VERTICAL_TIMELINE_2}
                        <Item_Grid_Vertical_Timeline_2 id={anchorId} grid={displayItems[index]} args={{role}} templateStyles={styles} on:click-item on:mount-template-item={onMountTemplateItem} />
                    
                    <!--exhibit item - row layout -->
                    {:else if type == ENTITY_TYPE.ITEM}
                        <Item_Display id={anchorId} item={displayItems[index]} template={Item} args={{role, showPreview: true}} templateStyles={styles} on:click-item on:mount-template-item={onMountTemplateItem} />
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
        line-height: 1.45em;
    }
</style>