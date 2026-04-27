<script>
    import UniversalViewer_Content from "./UniversalViewer_Content.svelte";
    import * as Logger from '../libs/logger.js';

    export let manifest = null;
    export let type = null; // may not be used for iiif viewer, unless content component has various styles for different types

    $: {
        console.log("test: init iiif viewer: manifest json:", manifest)

        if(manifest) {
            manifest = JSON.parse(manifest);
        }
        else {
            Logger.module().error("Can not initialize IIIF viewer, manifest is not present");
        }
    }
</script>

<div class="iiif-viewer">
    <!-- can add additional viewers here -->
    <div class="universal-viewer">
        {#if manifest}
            <UniversalViewer_Content {manifest} {type} />

        {:else}
            <div class="load-message">
                <h5>Loading content...</h5>
            </div>
            
        {/if}
    </div>
</div>