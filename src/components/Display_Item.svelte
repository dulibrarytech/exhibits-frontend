<script>
    import { onMount } from 'svelte';
    import Repository_Item from './Repository_Item.svelte';
    import Media_Item from './Media_Item.svelte';

    export let data = {};

    let component = null;
    let type;

    onMount(async () => {
        let {item_type} = data;

        console.log("Display item: item type:", item_type)
        if(item_type) {
            component = item_type == "repo" ? Repository_Item : Media_Item;
        }
        else console.error("Item type not found");
    });
</script>

{#if component}
    <svelte:component this={component} {data} {type} />
{:else}
    <h3>Loading content...</h3>
{/if}