<script>
    import UniversalViewer_Content from "./UniversalViewer_Content.svelte";
    import * as Logger from '../libs/logger.js';

    export let manifest = null;
    export let type = null; // may not be used for iiif viewer, unless content component has various styles for different types

    $: {
        if(!manifest) Logger.module().error("IIIF manifest url not present");
    }
</script>

<div class="image-viewer">
    <div class="image">
        {#if manifest}
            <UniversalViewer_Content {manifest} {type} />
        {:else}
            <h5>Loading content...</h5>
        {/if}
    </div>
</div>