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
        _renderTemplate = false;

        let {is_member_of_exhibit, media} = item;
        let fileFound = await Resource.verifyResourceFile({is_member_of_exhibit, media});

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
    <svelte:component this={template} {id} {item} {args} on:click-item on:mount-template-item on:load-error={onLoadError} />
</div>

<style>
    .item-display {
        width: 100%;
        height: 100%;
    }
</style>