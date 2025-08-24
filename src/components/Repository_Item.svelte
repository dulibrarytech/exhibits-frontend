<script>
    import { createEventDispatcher } from 'svelte';
    import { getItemTypeForMimeType } from '../libs/media_helpers';
    import { Repository } from '../libs/repository';
    import { Resource } from '../libs/resource';
    import { Settings } from '../config/settings.js';
    import * as Logger from '../libs/logger.js';
    
    export let id = null; // dom element id
    export let item = {};
    export let args = {};
    export let template = null;

    const {
        fileExtensions
    } = Settings;

    let _exhibitItem;
    let _exhibitItemId;
    let _repositoryItemId;

    let _renderTemplate;

    const dispatch = createEventDispatcher();

    const init = async () => {
        _renderTemplate = false;
        _exhibitItem = {};
        _exhibitItemId = item?.uuid || "null";
        _repositoryItemId = args.id || item.media || null;

        try {
            Logger.module().info(`Fetching repository item data... Repository item id: ${_repositoryItemId}`);
            let itemData = await Repository.getItemData(_repositoryItemId); // UPDATE
            
            _exhibitItem = {...item};
            _exhibitItem.item_type = getItemTypeForMimeType( itemData.mime_type );
            _exhibitItem.media = `${_exhibitItemId}_repository_item_media.${fileExtensions[_exhibitItem.item_type][0]}`;
            _exhibitItem.data_display = getDataDisplay(itemData);

            _renderTemplate = true;
        }
        catch(error) {
            Logger.module().error(`Error retrieving item from repository: Item id: ${item.uuid} Error: ${error}`);

            dispatch('mount-template-item', {type: "item"});
        }

        if(_renderTemplate == false) Logger.module().error(`Can't render repository item: Item id: ${item.uuid} Repository item id: ${_repositoryItemId}`);
    }

    // get the data for the exhibit item viewer
    const getDataDisplay = (repositoryData) => {
        let display = [];

        let {
            link_to_item = "null", 
            link_to_collection = "null", 
            collection_name = "null",
            collection_id = "null",
            local_identifier = "null"

        } = repositoryData;

        // add local identifier
        display.push({
            "label": null,
            "value": local_identifier
        });

        // add link to object
        display.push({
            "label": null,
            "value": `<a href="${link_to_item}" target="_blank">Record in the University Libraries' Digital Repository</a>`
        });

        // add link to collection
        if(collection_id) {
            display.push({
                "label": null,
                "value": `<a href="${link_to_collection}" target="_blank">${collection_name || "Parent Collection"}</a>`
            });
        }

        return display;
    }

    const onLoadError = async (event) => {
        _renderTemplate = false;

        let fileFound = await Resource.verifyResourceFile(_exhibitItem);

        if(fileFound == false) {
            Logger.module().info(`Fetching repository item resource file... Repository item id: ${_repositoryItemId}`);
            await Repository.getItem(_repositoryItemId, _exhibitItemId);
            Logger.module().info(`Repository item resource file fetch complete. Repository item id: ${_repositoryItemId}`);
            _renderTemplate = true;
        }
        else {
            Logger.module().error(`Error loading repository item resource: exhibit item uuid: ${_exhibitItem.uuid} repository item uuid: ${_repositoryItemId}`);
        }
    }

    init();
</script>

{#if _renderTemplate}
    <div class="repository-item">
        <svelte:component this={template} {id} item={_exhibitItem} {args} on:click-item on:mount-template-item on:image-loaded on:load-error={onLoadError} />
    </div>

{:else}
    <!-- <div class="message">
        <p>Loading item, please wait...</p>
    </div> -->

{/if}

<style>
    .message {
        background: white;
        padding: 5px;
        border-style: solid;
        border-color: black;
        border-width: 1px;
    }

    .repository-item {
        height: 100%;
    }
</style>