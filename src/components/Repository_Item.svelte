<script>
    import { getItemTypeForMimeType } from '../libs/media_helpers';
    import { Repository } from '../libs/repository';

    import { ITEM_TYPE } from '../config/global-constants.js';
    
    export let id = null; // anchor id
    export let item = {};
    export let args = {};
    export let template = null;

    let renderTemplate = false;
    let repositoryItemId = null;

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
            item['repository_data'] = data;

            let repoItemType = getItemTypeForMimeType( data[MIME_TYPE_FIELD] || "unknown_repository_type" );
            item.item_type = repoItemType;

            if(showPreview) {
                item.media = await Repository.getPreviewImageUrl( data[ID_FIELD] || null );
            }
            else if(type == ITEM_TYPE.LARGE_IMAGE) {
                item.media = Repository.getIIIFTilesourceUrl( data[ID_FIELD] || null ); 
            }
            else {
                item.media = Repository.getItemDatastreamUrl( data[ID_FIELD] || null ); 
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
        <svelte:component this={template} {id} {item} {args} />
    {:else}
        <h5>Loading repository item...</h5>
    {/if}
</div>

<style>
    .repository-item {
        height: 100%;
    }
</style>