<script>
    import IIIF_Viewer from "./IIIF_Viewer.svelte";

    export let item; // data layer
    export let args;

    let manifest = null; 

    $: {
        manifest = args.resourceId ? getManifestUrl(args.resourceId) : null;
    }

    const getManifestUrl = (resourceId) => {
        let url = null;
        if(resourceId) {
            url = "https://specialcollections.du.edu/iiif/{item_id}/manifest".replace('{item_id}', resourceId); // TODO get from config 'manifestEndpoint'
        }
        return url;
    }
</script>

<h6>IIIF Item</h6>
<div class="">
    {#if manifest}
        <IIIF_Viewer {manifest} />
    {/if}
</div>