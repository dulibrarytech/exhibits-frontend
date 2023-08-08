<script>
    import { onMount } from 'svelte';
    import OpenSeadragon from 'openseadragon'

    export let url;
    export let altText = "Image";

    var viewer = null;

    onMount(async () => {
        try {
            viewer = OpenSeadragon({
                id: "openseadragon1",
                prefixUrl: "/assets/images/openseadragon/",
                tileSources: url
            });
        }
        catch(e) {
            console.error(`Error initializing OpenSeadragon viewer: ${e}`);
        }
    });
</script>

<div class="openseadragon content" id="openseadragon1" title={altText}></div>
<!-- <div class="openseadragon content" id="openseadragon1" style="width: 100%" title={altText}></div> --> <!-- dev -->
<!-- <div style='height: 75vh'></div> --> <!-- dev -->

<style>
.openseadragon {
    height: 75vh;
}
</style>