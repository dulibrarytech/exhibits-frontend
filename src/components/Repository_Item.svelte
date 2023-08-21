<script>
    import { getItemTypeForMimeType } from '../libs/media_helpers';
    import { Repository } from '../libs/repository';
    import Media_Item from './Media_Item.svelte';
    import IIIF_Item from './IIIF_Item.svelte';
    
    export let item;
    export let args = {};

    /* Define repository item fields */
    const ID_FIELD = "pid";
    const MIME_TYPE_FIELD = "mime_type";
    const METADATA_OBJECT_FIELD = "display_record";

    let itemId;
    let isIIIF;
    let component = null;
    let message = "";

    /* args object for child components */
    var params = {};

    $: {
        if(!itemId) itemId = args.id || item.url || null;
        if(!isIIIF) isIIIF = args.isIIIF || item.is_iiif || false;
        if(itemId) render();
        else console.error("Repository item id is null");
    }

    const render = () => {
        message = "Loading content...";

        Repository.getItemData(itemId)
        .then((repoItem) => {
            message = "";

            params.url = Repository.getItemDatastreamUrl( repoItem[ID_FIELD] || null )
            params = {...params, ...repoItem};
            params.type = getItemTypeForMimeType( repoItem[MIME_TYPE_FIELD] || null );
            params.metadata = repoItem[METADATA_OBJECT_FIELD] || {};

            if(isIIIF) {
                component = IIIF_Item;
            }
            else {
                component = Media_Item;
            }
        })
        .catch((error) => {
            message = "Error retrieving data from repository";
            console.error(`Error connecting to repository: ${error}`);
        });
    }
</script>

<div class="item">
    {#if component}
        <svelte:component this={component} {item} args={params} />
    {:else if message}
        <h5>{message}</h5>
    {/if}
</div>