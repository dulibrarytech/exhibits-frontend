<script>
    import { Settings } from '../config/settings';
    import UniversalViewer_Content from "./UniversalViewer_Content.svelte";
    import CloverIIIFViewer from "./Clover_IIIF_Viewer.svelte";
    import * as Logger from '../libs/logger.js';

    import {
        IIIF_VIEWER
    } from '../config/global-constants';

    export let args;

    const {
        manifestUrl,
        type,
    } = args;

    const {
        iiifViewer
    } = Settings.iiifViewerSettings;

    if(!manifestUrl) Logger.module().error("Can not initialize IIIF viewer, manifest url is not present");
</script>

<div class="iiif-viewer">

    {#if manifestUrl}

        {#if iiifViewer == IIIF_VIEWER.UNIVERSALVIEWER}
            <div class="universal-viewer">
                <UniversalViewer_Content manifest={manifestUrl} {type} on:loaded />
            </div>
        {:else if iiifViewer == IIIF_VIEWER.CLOVER}
            <div class="clover-viewer">
                <CloverIIIFViewer manifest={manifestUrl} {type} on:loaded />
            </div>
        {/if}

    {:else}
        <div class="load-message">
            <h5>Error loading media</h5>
        </div>
    {/if}

    <!-- can add additional viewers here, use feature toggles -->
    
</div>

<style>
    .universal-viewer {
        height: 100%;
    }
</style>