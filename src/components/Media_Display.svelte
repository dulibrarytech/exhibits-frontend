<script>
    import Media_Item from './Media_Item.svelte';
    import Media_Item_Preview from './Media_Item_Preview.svelte';

    export let item = {};
    export let args = {};
    
    let component = null;

    let {
        showPreview = false
    } = args;

    //$: uuid = item.uuid || "";

    if(showPreview) {
        component = Media_Item_Preview;
    }
    else {
        component = Media_Item; // not currently in use. Will use this if an item has 'is_embedded true' flag. (no preview)
    }
</script>

{#if component}
    <!-- <a href data-item-id={uuid} on:click> -->
        <svelte:component this={component} {item} {args} />
    <!-- </a> -->
{:else}
    <h5>Loading item...</h5>
{/if}