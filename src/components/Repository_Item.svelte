<script>
    import { onMount } from 'svelte';
    import { getItemTypeForMimeType } from '../libs/media_helpers';
    import { repository } from '../libs/repository';
    
    import Media_Item from './Media_Item.svelte';
    
    export let data;

    let uuid = data.uuid;
    let type = null;
    let repoItem = null;
    let message = "";

    onMount(async () => {
        message = "Loading content...";
        repository.getItemData(uuid)
        .then((itemData) => {
            message = "";
            repoItem = itemData;
            type = getItemTypeForMimeType(itemData.mimeType || null);
        })
        .catch((error) => {
            message = "Error retrieving data!";
            console.error(error);
        });
    });
</script>

<div class="repository-item">
    <h4>Repository item</h4>

    {#if repoItem}
        <Media_Item {data} {type} />
    {:else if message}
        <h5>{message}</h5>
    {/if}
</div>