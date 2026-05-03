<script>
    import Media_Item from './Media_Item.svelte';
    import Media_Item_Preview from './Media_Item_Preview.svelte';

    export let item = {};
    export let args = {};
    
    let component = null;

    let {
        showPreview = false,
    } = args;

    if(showPreview) {
        args.isThumbnail = false; // media display should always display the "preview" (large) image size, not the thumbnail image size.
        component = Media_Item_Preview;
    }
    else {
        component = Media_Item;
    }
</script>

{#if component}
    <svelte:component this={component} {item} {args} on:load-media on:load-error on:click-item/>
    
{:else}
    <div class="load-message">
        <h5>Loading media display...</h5>
    </div>
    
{/if}