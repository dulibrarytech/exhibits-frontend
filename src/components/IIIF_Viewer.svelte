<script>
    import UniversalViewer_Content from "./UniversalViewer_Content.svelte";

    export let manifest = null;
    export let type = null; // may not be used for iiif viewer, unless content component has various styles for different types

    $: {
        if(!manifest) console.error("IIIF manifest url not present");
    }
</script>

<div class="image-viewer">
    <h6>IIIF Viewer</h6>
    <div class="image">
        {#if manifest}
            <UniversalViewer_Content {manifest} {type} />
        {:else}
            <h5>Loading content...</h5>>
        {/if}
    </div>
</div>