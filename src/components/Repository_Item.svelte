<script>
    import { createEventDispatcher } from 'svelte';
    import { getItemTypeForMimeType } from '../libs/media_helpers';
    import { Repository } from '../libs/repository';
    import * as Logger from '../libs/logger.js';

    import { ITEM_TYPE } from '../config/global-constants.js';
    import { Settings } from '../config/settings.js';
    
    export let id = null; // dom element id
    export let item = {};
    export let args = {};
    export let template = null;
;
    let renderTemplate = false;
    let repositoryItemId = null;
    let repositoryItem = {};

    const dispatch = createEventDispatcher();

    const ID_FIELD = "pid";
    const TITLE_FIELD = "title";
    const MIME_TYPE_FIELD = "mime_type";
    const PARENT_COLLECTION_ID = "is_member_of_collection";

    let {
        repositoryItemTypes = {}

    } = Settings;

    let {
        showPreview = false,
        isTemplateItem = false
    } = args;

    if(!repositoryItemId) repositoryItemId = args.id || item.media || null;

    const init = async () => {
        Logger.module().info(`Fetching data from repository... Repo item id: ${repositoryItemId}`);

        try {
            let data = await Repository.getItemData(repositoryItemId);
            repositoryItem = structuredClone(item);
            repositoryItem['pid'] = repositoryItemId;

            // set the exhibit item type to the repository item type
            let repoItemType = getItemTypeForMimeType( data[MIME_TYPE_FIELD] || "unknown_repository_type" );
            repositoryItem.item_type = repoItemType;

            let isImage = (repositoryItem.item_type == ITEM_TYPE.LARGE_IMAGE || repositoryItem.item_type == ITEM_TYPE.IMAGE); // TODO: replace exhitits app types with repoItemTypes
            let isAudioVideo = (repositoryItem.item_type == ITEM_TYPE.AUDIO || repositoryItem.item_type == ITEM_TYPE.VIDEO); // TODO: replace exhitits app types with repoItemTypes

            // get parent collection data
            let collectionData = await Repository.getItemData(data[PARENT_COLLECTION_ID]);
            data['collection_id'] = collectionData[ID_FIELD] || null;
            data['collection_name'] = collectionData[TITLE_FIELD] || null;

            // append the repository data to the item
            repositoryItem['data_display'] = getItemDisplayData(data);
            repositoryItem['repository_data'] = data;

            // if the user thumbnail has not been set, assign the repository thumbnail path
            if(!repositoryItem.thumbnail) repositoryItem.thumbnail = Repository.getItemThumbnailDatastreamUrl(repositoryItemId);

            // update the media field for the repository item
            if(showPreview) {
                repositoryItem.media = await Repository.getPreviewImageUrl( data[ID_FIELD] || null );
            }
            else if(isImage) { 
                if(isTemplateItem) {
                    // image is displayed on the exhibit template
                    repositoryItem.media = await Repository.getPreviewImageUrl( data[ID_FIELD] || null );
                }
                else {
                    // image is displayed in the item viewer
                    repositoryItem.media = Repository.getIIIFTilesourceUrl( data[ID_FIELD] || null );
                }
            }
            else {
                // kaltura a/v item
                if(isAudioVideo && data['entry_id']) {
                    repositoryItem.is_kaltura_item = 1;
                    repositoryItem.media = data['entry_id'];
                }
                // non-kaltura a/v item
                else {
                    repositoryItem.media = Repository.getItemDatastreamUrl( data[ID_FIELD] || null ); 
                }
            }

            Logger.module().info(`Repository fetch successful`);
            renderTemplate = true;
        }
        catch(error) {
            Logger.module().error(`Error retrieving data from repository: Item id: ${item.uuid} Error: ${error}`);
            dispatch('mount-template-item', {type: "item"});
        }
    }

    const getItemDisplayData = (item) => {
        let display = [];

        // add local identifier
        let localIdentifier = item.display_record.identifiers.find((identifier) => {
            return identifier.type == 'local';
        }).identifier;
        display.push({
            "label": null,
            "value": localIdentifier
        });

        // add link to object
        let objectLink = Repository.getItemUrl(item.pid || 'null');
        display.push({
            "label": null,
            "value": `<a href="${objectLink}" target="_blank">Record in the University Libraries' Digital Repository</a>`
        });

        // add link to collection
        if(item.is_member_of_collection) {
            let collectionLink = Repository.getCollectionUrl(item.collection_id || 'null');
            display.push({
                "label": null,
                "value": `<a href="${collectionLink}" target="_blank">${item.collection_name || "Parent Collection"}</a>`
            });
        }

        return display;
    }

    init();
</script>

{#if renderTemplate}
    <div class="repository-item">
        <svelte:component this={template} {id} item={repositoryItem} {args} on:click-item on:mount-template-item />
    </div>
{/if}

<style>
    .repository-item {
        height: 100%;
    }
</style>