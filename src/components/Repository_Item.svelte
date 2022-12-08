<script>
    import { onMount } from 'svelte';
    import { getItemTypeForMimeType } from '../libs/media_helpers';
    import { repository } from '../libs/repository';
    
    import Media_Item from './Media_Item.svelte';
    
    export let data;
    console.log("DigitalDU_Repository_Item: data in:", data)

    let uuid = data.uuid;
    let type = null;
    let repoItem = null;

    onMount(async () => {
        repository.getItemData(uuid)
        .then((itemData) => {
            console.log("TEST repo item retrieved:", itemData)

            repoItem = itemData;
            type = getItemTypeForMimeType(itemData.mimeType || null);
            console.log("TEST repo item gets type from helper:", type)
        })
        .catch((error) => {
            console.error(error);
        });
    });
</script>

<div class="repository-item">
    <h4>Repository item</h4>

    {#if repoItem}
        <Media_Item {data} {type} />
    {/if}
</div>