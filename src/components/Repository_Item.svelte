<script>
    import { createEventDispatcher } from 'svelte';
    import { getItemTypeForMimeType } from '../libs/media_helpers';
    import { Repository } from '../libs/repository';
    import * as Logger from '../libs/logger.js';
    
    export let id = null; // dom element id
    export let item = {};
    export let args = {};
    export let template = null;

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

        Logger.module().info(`Fetching data from repository... Repo item id: ${_repositoryItemId}`);

        let repositoryData;
        try {
            repositoryData = await Repository.getItemData(_repositoryItemId);
            _exhibitItem = structuredClone(item);
            _exhibitItem.item_type = getItemTypeForMimeType( repositoryData.mime_type );
            _exhibitItem.data_display = getDataDisplay(repositoryData);

            Logger.module().info(`Repository data fetch successful`);
        }
        catch(error) {
            Logger.module().error(`Error retrieving data from repository: Item id: ${item.uuid} Error: ${error}`);
            dispatch('mount-template-item', {type: "item"});
        }

        try {
            Logger.module().info(`Fetching media source file for exhibit item: ${_exhibitItemId}. Please wait...`);
            _exhibitItem.media = await Repository.getResourceFile(_repositoryItemId, _exhibitItemId);

            Logger.module().info(`File fetch complete.`);
            _renderTemplate = true;
        }
        catch(error) {
            Logger.module().error(`Error retrieving source file(s) from repository: Item id: ${item.uuid} Error: ${error}`);
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

    init();
</script>

{#if _renderTemplate}
    <div class="repository-item">
        <svelte:component this={template} {id} item={_exhibitItem} {args} on:click-item on:mount-template-item />
    </div>

{:else}
    <div class="message">
        <p>Loading item...</p>
    </div>

{/if}

<style>
    .repository-item {
        height: 100%;
    }
</style>