<script>
    import Media_Item from './Media_Item.svelte';
    import Media_Item_Preview from './Media_Item_Preview.svelte';

    export let item = {};
    export let args = {};
    
    let component = null;

    let {
        showPreview = false
    } = args;

    if(showPreview) {
        component = Media_Item_Preview;
    }
    else {
        component = Media_Item;
    }
</script>

{#if component}
    <svelte:component this={component} {item} {args} on:load-media on:load-media-fail />
{:else}
    <h5>Loading item...</h5>
{/if}