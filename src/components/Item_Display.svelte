<script>
    import { Settings } from '../config/settings';
    import * as Logger from '../libs/logger.js';
    import { getItemDisplayData } from '../libs/exhibits_data_helpers';
    import IIIF_Item from './IIIF_Item.svelte';

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
        manifest = null,

    } = item;

    const init = () => {
        console.log("test: init item display", item)

        /* add data display */
        let displayData = getItemDisplayData(item, itemDisplayLinks);
        if(is_repo_item) {
            let repoDisplayData = getItemDisplayData(repository_data, itemDisplayLinksRepositoryItem);
            displayData = repoDisplayData.concat(displayData);
        }
        item.data_display = displayData;
    }

    const onLoadError = async (event) => {
        const {is_member_of_exhibit, media} = item;
        const fileFound = await Resource.verifyResourceFile({is_member_of_exhibit, media});

        if(fileFound == false) {
            Logger.module().info(`Item resource file not found. Item id: ${item.uuid} ${item.is_repo_item ? "Repository item id: " + item.repository_data.id : ""}`);
        }
        else {
            Logger.module().error(`Error loading item resource: Item id: ${item.uuid} ${item.is_repo_item ? "Repository item id: " + item.repository_data.id : ""}`);
        }
    }

    init();
</script>

<div class="item-display">
    {#if manifest}
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