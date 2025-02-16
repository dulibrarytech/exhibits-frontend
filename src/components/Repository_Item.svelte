<script>
    import { createEventDispatcher } from 'svelte';
    import { getItemTypeForMimeType, getFileExtension } from '../libs/media_helpers';
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

    const MIME_TYPE_FIELD = "mime_type";
    const ITEM_SOURCE_URL_FIELD = "object";

    const init = async () => {
        _renderTemplate = false;
        _exhibitItem = {};
        _exhibitItemId = item?.uuid || "null";
        _repositoryItemId = args.id || item.media || null;

        Logger.module().info(`Fetching data from repository... Repo item id: ${_repositoryItemId}`);

        try {
            let repositoryData = await Repository.getItemData(_repositoryItemId);
            _exhibitItem = structuredClone(item);
            _exhibitItem.item_type = getItemTypeForMimeType( repositoryData[MIME_TYPE_FIELD] || "unknown_repository_type" );
            _exhibitItem.repository_data = repositoryData;
            _exhibitItem.data_display = getItemDisplayData(repositoryData);

            Logger.module().info(`Repository data fetch successful`);
        }
        catch(error) {
            Logger.module().error(`Error retrieving data from repository: Item id: ${item.uuid} Error: ${error}`);
            dispatch('mount-template-item', {type: "item"});
        }

        try {
            let fileExtension = getFileExtension(_exhibitItem.repository_data[ITEM_SOURCE_URL_FIELD]);
            Logger.module().info(`Fetching media source file for exhibit item: ${_exhibitItemId}. Please wait...`);
            _exhibitItem.media = await Repository.getSourceFile(_repositoryItemId, fileExtension, _exhibitItemId);

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
    const getItemDisplayData = (item) => {
        let display = [];
        let {link_to_item = "null", link_to_collection = "null"} = _exhibitItem.repository_data;

        // add local identifier
        let localIdentifier = item.display_record.identifiers.find((identifier) => {
            return identifier.type == 'local';
        }).identifier;
        display.push({
            "label": null,
            "value": localIdentifier
        });

        // add link to object
        let objectLink = link_to_item;
        display.push({
            "label": null,
            "value": `<a href="${objectLink}" target="_blank">Record in the University Libraries' Digital Repository</a>`
        });

        // add link to collection
        if(item.is_member_of_collection) {
            let collectionLink = link_to_collection;
            display.push({
                "label": null,
                "value": `<a href="${collectionLink}" target="_blank">${item.collection_name || "Parent Collection"}</a>`
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