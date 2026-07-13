<script>
    import UniversalViewer_Content from "./UniversalViewer_Content.svelte";
    import * as Logger from '../libs/logger.js';

    export let args;

    const {
        manifestUrl,
        type,

    } = args;

    if(!manifestUrl) Logger.module().error("Can not initialize IIIF viewer, manifest url is not present");
</script>

<div class="iiif-viewer">
    <div class="universal-viewer">
        {#if manifestUrl}
            <UniversalViewer_Content manifest={manifestUrl} {type} on:loaded />

        {:else}
            <div class="load-message">
                <h5>Loading content...</h5>
            </div>
        {/if}
    </div>

    <!-- can add additional viewers here, use feature toggles -->
    
</div>

<style>
    .universal-viewer {
        height: 100%;
    }
</style>