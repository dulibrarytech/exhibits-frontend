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
            let repositoryData = await Repository.getItemData(repositoryItemId);
            repositoryItem = structuredClone(item);
            repositoryItem['pid'] = repositoryItemId;

            // set the exhibit item type to the repository item type
            let repoItemType = getItemTypeForMimeType( repositoryData[MIME_TYPE_FIELD] || "unknown_repository_type" );
            repositoryItem.item_type = repoItemType;

            // set the item type flags
            let isImage = (repositoryItem.item_type == repositoryItemTypes[ITEM_TYPE.LARGE_IMAGE] || repositoryItem.item_type == repositoryItemTypes[ITEM_TYPE.IMAGE]);
            let isAudioVideo = (repositoryItem.item_type == repositoryItemTypes[ITEM_TYPE.AUDIO] || repositoryItem.item_type == repositoryItemTypes[ITEM_TYPE.VIDEO]);

            // get parent collection data
            let collectionData = await Repository.getItemData(repositoryData[PARENT_COLLECTION_ID]);
            repositoryData['collection_id'] = collectionData[ID_FIELD] || null;
            repositoryData['collection_name'] = collectionData[TITLE_FIELD] || null;

            // append the repository data to the item
            repositoryItem['data_display'] = getItemDisplayData(repositoryData);
            repositoryItem['repository_data'] = repositoryData;

            // update the media and thumbnail fields with repository sources
            if(isImage) { 
                // image is displayed on the exhibit template (embedded items)
                if(isTemplateItem) {
                    repositoryItem.media = Repository.getItemImageDatastreamUrl( repositoryData[ID_FIELD] || null );
                    repositoryItem.thumbnail = Repository.getItemImageDatastreamUrl(repositoryItemId);
                }
                // image is displayed in the item viewer
                else {
                    repositoryItem.media = Repository.getIIIFTilesourceUrl( repositoryData[ID_FIELD] || null );

                    if(showPreview) {
                        // use repository jpg derivative for preview images on the exhibit template
                        repositoryItem.thumbnail = Repository.getItemImageDatastreamUrl(repositoryItemId);
                    }
                    else {
                        // use repository thumbnail for other cases
                        repositoryItem.thumbnail = Repository.getItemThumbnailDatastreamUrl(repositoryItemId);
                    }
                }
            }
            else if(isAudioVideo) {
                // kaltura items
                if(repositoryData['entry_id']) {
                    repositoryItem.is_kaltura_item = 1;
                    repositoryItem.media = datrepositoryDataa['entry_id'];
                    repositoryItem.thumbnail = Repository.getItemThumbnailDatastreamUrl(repositoryItemId);
                }
                // non kaltura items
                else {
                    repositoryItem.media = Repository.getItemDatastreamUrl( repositoryData[ID_FIELD] || null );
                    repositoryItem.thumbnail = Repository.getItemThumbnailDatastreamUrl(repositoryItemId);
                }
            }
            else {
                repositoryItem.media = Repository.getItemDatastreamUrl( repositoryData[ID_FIELD] || null );
                repositoryItem.thumbnail = Repository.getItemThumbnailDatastreamUrl(repositoryItemId);
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