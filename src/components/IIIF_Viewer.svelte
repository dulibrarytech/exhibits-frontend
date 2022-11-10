<script>
    import UniversalViewer from "./UniversalViewer.svelte";

    export let item;

    let manifest = null; 

    $: {
        manifest = getManifestUrl(item);
    }

    const getManifestUrl = (item) => {
        let url = null;
        if(item.resource) {
            url = "https://specialcollections.du.edu/iiif/{item_id}/manifest".replace('{item_id}', item.resource); // TODO get from config 'manifestEndpoint'
        }
        return url;
    }
</script>

<div class="content-container">
    <h6>IIIF viewer</h6>
    <div class="image-viewer>">
        <UniversalViewer {manifest} />
    </div>
</div>