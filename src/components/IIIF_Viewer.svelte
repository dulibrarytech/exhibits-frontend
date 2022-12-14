<script>
    import UniversalViewer_Content from "./UniversalViewer_Content.svelte";

    export let url = null;
</script>

<div class="">
    <h6>IIIF viewer</h6>
    <div class="image-viewer">
        {#if url}
            <UniversalViewer_Content {url} />
        {:else}
            <h6>Path to resource not found</h6>
        {/if}
    </div>
</div>