<script>
    import UniversalViewer_Content from "./UniversalViewer_Content.svelte";

    export let url = null;

    $: {
        if(!url) console.error("IIIF manifest url not present");
    }
</script>

<div class="image-viewer">
    <h6>IIIF viewer</h6>
    <div class="image">
        {#if url}
            <UniversalViewer_Content {url} />
        {:else}
            <h5>Loading content...</h5>>
        {/if}
    </div>
</div>