<script>
    import { getItemTypeForMimeType } from '../libs/media_helpers';
    import { Repository } from '../libs/repository';

    import { ITEM_TYPE } from '../config/global-constants.js';
    
    export let id = null; // dom element id
    export let item = {};
    export let args = {};
    export let template = null;

    let renderTemplate = false;
    let repositoryItemId = null;
    let repositoryItem = {};

    // TODO: move to settings
    const ID_FIELD = "pid";
    const MIME_TYPE_FIELD = "mime_type";
    const METADATA_OBJECT_FIELD = "display_record";

    let{
        showPreview = false
    } = args;

    if(!repositoryItemId) repositoryItemId = args.id || item.media || null;

    const init = () => {
        console.log("Fetching data from repository...");

        Repository.getItemData(repositoryItemId)
        .then(async (data) => {

            // Create a copy of the item for a single viewer instance. Original item data should not be updated permanently
            repositoryItem = structuredClone(item);
            repositoryItem['repository_data'] = data;

            let repoItemType = getItemTypeForMimeType( data[MIME_TYPE_FIELD] || "unknown_repository_type" );
            repositoryItem.item_type = repoItemType;

            if(showPreview) {
                repositoryItem.media = await Repository.getPreviewImageUrl( data[ID_FIELD] || null );
            }
            else if(repositoryItem.item_type == ITEM_TYPE.LARGE_IMAGE || 
                    repositoryItem.item_type == ITEM_TYPE.IMAGE) {

                repositoryItem.media = Repository.getIIIFTilesourceUrl( data[ID_FIELD] || null ); 
            }
            else {
                repositoryItem.media = Repository.getItemDatastreamUrl( data[ID_FIELD] || null ); 
            }   

            renderTemplate = true;
        })
        .catch((error) => {
            console.error(`Error connecting to repository: Item id: ${item.uuid} Error: ${error}`);
        });
    }

    init();
</script>

<div class="repository-item">
    {#if renderTemplate}
        <svelte:component this={template} {id} item={repositoryItem} {args} on:click-item />
    {:else}
        <h5>Loading repository item...</h5>
    {/if}
</div>

<style>
    .repository-item {
        height: 100%;
    }
</style>