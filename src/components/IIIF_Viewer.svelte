<script>
    import UniversalViewer_Content from "./UniversalViewer_Content.svelte";
    import * as Logger from '../libs/logger.js';

    export let args;

    let {
        manifest,
        type,

    } = args;

    let manifestUrl;

    $: {
        if(manifest) {
            if(typeof manifest == 'string') manifest = JSON.parse(manifest);
            manifestUrl = manifest.id || "";
        }
        else {
            Logger.module().error("Can not initialize IIIF viewer, manifest is not present");
        }
    }
</script>

<div class="iiif-viewer">
    <div class="universal-viewer">
        {#if manifest}
            <UniversalViewer_Content manifest={manifestUrl} {type} />

        {:else}
            <div class="load-message">
                <h5>Loading content...</h5>
            </div>
        {/if}
    </div>

    <!-- can add additional viewers here, use feature toggles -->
</div>