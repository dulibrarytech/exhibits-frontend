<script>
    import { createEventDispatcher } from 'svelte';
    import { getItemTypeForMimeType } from '../libs/media_helpers';
    import { Repository } from '../libs/repository';

    import { ITEM_TYPE } from '../config/global-constants.js';
    
    export let id = null; // dom element id
    export let item = {};
    export let args = {};
    export let template = null;
;
    let renderTemplate = false;
    let repositoryItemId = null;
    let repositoryItem = {};

    const dispatch = createEventDispatcher();

    // TODO: move to settings
    const ID_FIELD = "pid";
    const TITLE_FIELD = "title";
    const MIME_TYPE_FIELD = "mime_type";
    const PARENT_COLLECTION_ID = "is_member_of_collection";

    let{
        showPreview = false
    } = args;

    if(!repositoryItemId) repositoryItemId = args.id || item.media || null;

    const init = async () => {
        console.log(`Fetching data from repository... Repo item id: ${repositoryItemId}`);

        try {
            let data = await Repository.getItemData(repositoryItemId);
            console.log("Successfully retrieved item data");
            repositoryItem = structuredClone(item);

            // set the exhibit item type to the repository item type
            let repoItemType = getItemTypeForMimeType( data[MIME_TYPE_FIELD] || "unknown_repository_type" );
            repositoryItem.item_type = repoItemType;

            // get parent collection data
            let collectionData = await Repository.getItemData(data[PARENT_COLLECTION_ID]);
            data['collection_id'] = collectionData[ID_FIELD] || null;
            data['collection_name'] = collectionData[TITLE_FIELD] || null;

            // append the repository data to the item
            repositoryItem['data_display'] = getItemDisplayData(data);
            repositoryItem['repository_data'] = data;

            // get the thumbnail path
            repositoryItem.thumbnail = Repository.getItemThumbnailDatastreamUrl(repositoryItemId) || undefined;

            // get the media url to access the repository item preview image, image tilesource or object datastream based on item type
            if(showPreview) {
                repositoryItem.media = await Repository.getPreviewImageUrl( data[ID_FIELD] || null );
            }
            else if(repositoryItem.item_type == ITEM_TYPE.LARGE_IMAGE || repositoryItem.item_type == ITEM_TYPE.IMAGE) {
                repositoryItem.media = Repository.getIIIFTilesourceUrl( data[ID_FIELD] || null );
            }
            else {
                repositoryItem.media = Repository.getItemDatastreamUrl( data[ID_FIELD] || null ); 
            }   

            renderTemplate = true;
        }
        catch(error) {
            console.error(`Error repository data error: Item id: ${item.uuid} Error: ${error}`);
            dispatch('mount-template-item', {type: "item"});
        }
    }

    const getItemDisplayData = (item) => {
        let display = [];

        // display local id
        let localIdentifier = item.display_record.identifiers.find((identifier) => {
            return identifier.type == 'local';
        }).identifier;
        display.push({
            "label": null,
            "value": localIdentifier
        });

        // link to object
        let objectLink = `https://specialcollections.du.edu/object/${item.pid || 'null'}`;
        display.push({
            "label": null,
            "value": `<a href="${objectLink}">Record in the University Libraries' Digital Repository</a>`
        });

        // link to collection
        if(item.is_member_of_collection) {
            let collectionLink = `https://specialcollections.du.edu/object/${item.collection_id || 'null'}`;
            display.push({
                "label": null,
                "value": `<a href="${collectionLink}">${item.collection_name || "Parent Collection"}</a>`
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