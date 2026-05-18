<script>
    import { Settings } from '../config/settings';
    import * as Logger from '../libs/logger.js';

    import { getItemDisplayData } from '../libs/exhibits_data_helpers';

    export let item = null;
    export let id = null; // dom element id
    export let args = {};
    export let template = null;

    const {
        itemDisplayLinks,
        itemDisplayLinksRepositoryItem
    } = Settings;

    const init = () => {
        if(item) {

            let displayData = getItemDisplayData(item, itemDisplayLinks);

            let {
                is_repo_item = false,
                repository_data = {},
            } = item;

            if(is_repo_item) {
                let repoDisplayData = getItemDisplayData(repository_data, itemDisplayLinksRepositoryItem);
                displayData = repoDisplayData.concat(displayData);
            }

            item.data_display = displayData;
        }
        else {
            Logger.module().error("Null item")
        }
    }

    const onLoadError = async (event) => {
        const {
            uuid, 
            is_repo_item,
            repository_data,

        } = item;

        Logger.module().error(`Error loading item resource: Item id: ${uuid} ${is_repo_item ? "Repository item id: " + repository_data.id : ""}`);
    }

    init();
</script>

<div class="item-display">
    <svelte:component this={template} {id} {item} {args} on:click-item on:mount-template-item on:load-error={onLoadError} />
</div>

<style>
    .item-display {
        width: 100%;
        height: 100%;
    }
</style>