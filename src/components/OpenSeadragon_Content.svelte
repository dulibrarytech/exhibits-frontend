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

<div class="openseadragon-container">
    <div class="controls">
        <button id="openseadragon-zoom-in" title="Zoom In"><i class="bi bi-plus-lg"></i></button>
        <button id="openseadragon-zoom-out"><i class="bi bi-dash"></i></button>
        <button id="openseadragon-zoom-initial"><i class="bi bi-house"></i></button>
    </div>
    
    <div class="openseadragon content" id="openseadragon1"></div>
</div>

<style>
.openseadragon {
    height: 75vh;
}

.openseadragon-container {
    padding: 15px;
    background: #616161;
}
</style>