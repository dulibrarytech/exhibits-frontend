<script>
    import { Settings } from '../config/settings';
    import { Resource } from '../libs/resource';
    import { getItemDisplayData } from '../libs/exhibits_data_helpers';
    import IIIF_Item from './IIIF_Item.svelte';
    import * as Logger from '../libs/logger.js';

    export let item = null;
    export let id = null; // dom element id
    export let args = {};
    export let template = null;

    const {
        itemDisplayLinks,
        itemDisplayLinksRepositoryItem,

    } = Settings;

    const {
        is_repo_item = false,
        repository_data = {},
        iiif_manifest = null,

    } = item;

    const init = () => {

        /* add data display */
        let displayData = getItemDisplayData(item, itemDisplayLinks);
        if(is_repo_item) {
            let repoDisplayData = getItemDisplayData(repository_data, itemDisplayLinksRepositoryItem);
            displayData = repoDisplayData.concat(displayData);
        }
        item.data_display = displayData;
    }

    const onLoadError = async (event) => {
        const {
            uuid, 
            is_member_of_exhibit, 
            is_repo_item,
            repository_data,
            media
        } = item;

        Logger.module().error(`Error loading item resource: Item id: ${uuid} ${is_repo_item ? "Repository item id: " + repository_data.id : ""}`);

    }

    init();
</script>

<div class="item-display">
    {#if iiif_manifest}
        <IIIF_Item {item} {template} {args} on:click-item on:mount-template-item on:load-error={onLoadError} />
    {:else}
        <svelte:component this={template} {id} {item} {args} on:click-item on:mount-template-item on:load-error={onLoadError} />
    {/if}
</div>

<style>
    .item-display {
        width: 100%;
        height: 100%;
    }
</style>