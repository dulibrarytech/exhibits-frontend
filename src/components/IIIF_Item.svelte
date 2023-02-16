<script>
    import { Configuration } from '../config/config.js';
    import IIIF_Viewer from "./IIIF_Viewer.svelte";

    export let item; // data layer (gets metadata from the exhibit item for the iiif viewer)
    export let args;

    var { iiifManifestUrl } = Configuration;

    const VIEWER_METADATA = { // TODO move to settings? (data layer)
        title: "title"
    }

    var { IIIFManifestUrl } = Configuration;

    let { type = null, metadata = {} } = args;

    let resourceId; // iiif resource id, for the manifest url
    let manifest = null; 
    let viewerMetadata = {};

    $: {
        resourceId = item.url || "[id field missing]";
        render();
    }

    const render = () => {
        /* Create iiif manifest url */
        manifest = iiifManifestUrl.replace('{item_id}', resourceId);

        /* Add metadata fields to viewer metadata display */
        for(let field in VIEWER_METADATA) {
            if(metadata[ VIEWER_METADATA[field] ]) viewerMetadata[ field ] = metadata[ VIEWER_METADATA[field] ];
        }
    }

    console.log("TEST iiif item manifest/metadata:", manifest, metadata)
</script>

<div class="item">
    {#if manifest}
        <IIIF_Viewer {manifest} metedata={viewerMetadata} {type} />
    {/if}
</div>