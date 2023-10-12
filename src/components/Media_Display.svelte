<script>
    import Repository_Item from './Repository_Item.svelte';
    import Media_Item from './Media_Item.svelte';

    export let item = {};
    export let args = {};
    
    let component = null;

    let {item_type} = item;

        if(item_type) {
            if(item_type == "repo") {
                // args = {
                //     isIIIF: item.is_iiif, 
                //     id: item.media
                // }
                component = Repository_Item;
            }
            else {
                // args = {
                //     url: item.media,
                //     type: item_type
                // }
                component = Media_Item;
            }
        }
        else {
            console.error("Item type not found:", item_type);
        }
</script>

{#if component}
    <svelte:component this={component} {item} {args} />
{:else}
    <h5>Loading item...</h5>
{/if}