<script>
    import { onMount } from 'svelte';
    import OpenSeadragon from 'openseadragon'

    export let url;

    var viewer = null;

    onMount(async () => {
        try {
            viewer = OpenSeadragon({
                id: "openseadragon1",
                prefixUrl: "/assets/images/openseadragon/",
                tileSources: url,
                zoomPerScroll: 1.2,
                showFullPageControl: false,
                zoomInButton: "openseadragon-zoom-in",
                zoomOutButton: "openseadragon-zoom-out",
                homeButton: "openseadragon-zoom-initial"
            });
        }
        catch(e) {
            console.error(`Error initializing OpenSeadragon viewer: ${e}`);
        }

        document.querySelector("#openseadragon1").addEventListener("mousewheel", ()=>{}, false);
    });
</script>

<div class="openseadragon content" id="openseadragon1"></div>
<!-- <div class="openseadragon content" id="openseadragon1" style="width: 100%" title={altText}></div> --> <!-- dev -->
<!-- <div style='height: 75vh'></div> --> <!-- dev -->

<style>
.openseadragon {
    height: 75vh;
}
</style>