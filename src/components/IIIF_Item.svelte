<script>
    import { Configuration } from '../config/config.js';
    import IIIF_Viewer from "./IIIF_Viewer.svelte";

    export let item; // data layer (gets metadata from the exhibit item for the iiif viewer)
    export let args;

    var { iiifManifestUrl } = Configuration;

    const VIEWER_METADATA = {
        title: "title"
    }

    var { IIIFManifestUrl } = Configuration;

    let { type = null, metadata = {} } = args;

    let id; // iiif resource id, for the manifest url
    let manifest = null; 
    let viewerMetadata = {};

    $: {
        id = item.url || "[id field missing]";
        console.log("TEST IIIF item id:", id)
        render();
    }

    const render = () => {
        /* Create iiif manifest url */
        manifest = iiifManifestUrl.replace('{item_id}', id);

        /* Add metadata fields to viewer metadata display */
        for(let field in VIEWER_METADATA) {
            if(metadata[ VIEWER_METADATA[field] ]) viewerMetadata[ field ] = metadata[ VIEWER_METADATA[field] ];
        }
    }

    console.log("TEST iiif item manifest/metadata:", manifest, metadata)
</script>

<div class="item">
    <h6>IIIF Item</h6>
    {#if manifest}
        <IIIF_Viewer {manifest} metedata={viewerMetadata} {type} />
    {/if}
</div>