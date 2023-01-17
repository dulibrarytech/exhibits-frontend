<script>
    import { getItemTypeForMimeType } from '../libs/media_helpers';
    import { repository } from '../libs/repository';
    import Media_Item from './Media_Item.svelte';
    import IIIF_Item from './IIIF_Item.svelte';
    
    export let item; // this component may not use item data, just passes on to iiif or media item
    export let args = {};

    /* Repository object fields to add to the exhibit item */
    const EXHIBIT_ITEM_FIELDS = ['kaltura_id'];

    /* Define repository item fields */
    const ID = "pid";
    const MIME_TYPE = "mime_type";
    const METADATA_OBJECT = "display_record";

    /* args object for child components */
    var params = {};

    // let isIIIF = false;
    // let uuid = null;
    let component = null;
    let message = "";

    $: {
        let {uuid = null, isIIIF = false} = args;

        uuid = args.uuid || null;
        isIIIF = args.isIIIF || false;
        console.log("TEST repo item: uuid/args:", uuid, args)
        if(uuid) render();
    }

    const render = () => {
        message = "Loading content...";

        repository.getItemData(uuid)
        .then((repoItem) => {
            message = "";

            if(isIIIF) {
                //params.manifest = repository.getItemIIIFManifestUrl( repoItem[ID] || null )
                component = IIIF_Item;
            }
            else {
                params.url = repository.getItemDatastreamUrl( repoItem[ID] || null )
                params = {...params, ...getExhibitItemData(repoItem)}; // repo fields to add to exhibit item data, specified in settings. (kaltura_id (entry_id), etc included)
                console.log("TEST repo item: non iiif: params object for media item:", params)
                component = Media_Item;
            }

            params.type = getItemTypeForMimeType( repoItem[MIME_TYPE] || null );
            params.metadata = repoItem[METADATA_OBJECT] || {};

            console.log("TEST repo item: component:", component)
            console.log("TEST repo item: all params:", params)
        })
        .catch((error) => {
            message = "Error retrieving data!";
            console.error(`Error connecting to repository: ${error}`);
        });
    }

    const getExhibitItemData = (repositoryItem) => {
        data = {};

        let value;
        for(let field in EXHIBIT_ITEM_FIELDS) {
            value = repositoryItem[field] || null;
            if(value) data[field] = repositoryItem[field];
        }

        return data;
    }
</script>

<div class="item">
    <h4>Repository item</h4>
    {#if component}
        <!-- run -->
        <!-- <svelte:component this={component} {item} args={params} /> -->

        <!-- dev -->
        <h4>{component}</h4>
    {:else if message}
        <h5>{message}</h5>
    {/if}
</div>