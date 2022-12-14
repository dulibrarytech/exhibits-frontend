<script>
    import { getItemTypeForMimeType } from '../../libs/media_helpers';
    import { repository } from '../../libs/repository';
    import { Settings } from '../../config/settings.js';
    import Media_Item from './Media_Item.svelte';
    import IIIF_Item from './IIIF_Item.svelte';
    
    export let item;
    export let args = {};

    var data = {};

    let {repositoryFields} = Settings;

    let isIIIF = false;
    let uuid = null;
    let type = null;
    let component = null;
    let message = "";

    $: {
        uuid = args.uuid || null;
        isIIIF = args.isIIIF || false;
        if(uuid) init();
    }

    const init = () => {
        message = "Loading content...";
        repository.getItemData(uuid)
        .then((itemData) => {
            message = "";
            type = getItemTypeForMimeType( itemData[repositoryFields.mimeType] || null );

            if(isIIIF) {
                data.resourceId = itemData[repositoryFields.id] || null;
                data.type = type;
                component = IIIF_Item;
            }
            else {
                data.url = repository.getItemDatastreamUrl( itemData[repositoryFields.id] || null )
                data.type = type;
                component = Media_Item;
            }
        })
        .catch((error) => {
            message = "Error retrieving data!";
            console.error(`Error connecting to repository: ${error}`);
        });
    }
</script>

<div class="repository-item">
    <h4>Repository item</h4>
    {#if component}
        <svelte:component this={component} {item} args={data} />
    {:else if message}
        <h5>{message}</h5>
    {/if}
</div>