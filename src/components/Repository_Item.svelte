<script>
    import { getItemTypeForMimeType } from '../libs/media_helpers';
    import { repository } from '../libs/repository';
    import Media_Item from './Media_Item.svelte';
    import IIIF_Item from './IIIF_Item.svelte';
    
    export let item; // this component may not use item data, just passes on to iiif or media item
    export let args = {};

    /* Repository object fields to add to the exhibit item */
    //const EXHIBIT_ITEM_FIELDS = ['kaltura_id'];

    /* Map repository field to exhibit item field. These fields will be added to the exhibit item data object or override the field if it exists */
    const EXHIBIT_ITEM_FIELDS = {
        "entry_id": "kaltura_id",
        "mime_type": "mime_type"
    }

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
        console.log("TEST repo item: itemId/isIIIF:", itemId, isIIIF)

        if(itemId) render();
        else console.error("Repository item id is null");
    }

    const render = () => {
        message = "Loading content...";

        repository.getItemData(itemId)
        .then((repoItem) => {
            message = "";

            if(isIIIF) {
                console.log("TEST repo item: is iiif")

                component = IIIF_Item;
            }
            else {
                /* Get params from the repo item for the media item */
                params.url = repository.getItemDatastreamUrl( repoItem[ID_FIELD] || null )
                params = {...params, ...getExhibitItemData(repoItem)};
                console.log("TEST repo item: non iiif: params object for media item:", params)

                component = Media_Item;
            }

            params.type = getItemTypeForMimeType( repoItem[MIME_TYPE_FIELD] || null );
            params.metadata = repoItem[METADATA_OBJECT_FIELD] || {};

            console.log("TEST repo item: component:", component)
            console.log("TEST repo item: all params:", params)
        })
        .catch((error) => {
            message = "Error retrieving data";
            console.error(`Error connecting to repository: ${error}`);
        });
    }

    const getExhibitItemData = (repositoryItem) => {
        let data = {};

        let value;
        for(let field in EXHIBIT_ITEM_FIELDS) {
            console.log("field", EXHIBIT_ITEM_FIELDS[field])
            value = repositoryItem[field] || null;
            if(value) data[ EXHIBIT_ITEM_FIELDS[field] ] = repositoryItem[field];
        }

        return data;
    }
</script>

<div class="item">
    <h6 class="dev-label">Repository item</h6>
    {#if component}
        <!-- run -->
        <!-- <svelte:component this={component} {item} args={params} /> -->

        <!-- dev -->
        <h5>Component: {component}</h5>
    {:else if message}
        <h5>{message}</h5>
    {/if}
</div>