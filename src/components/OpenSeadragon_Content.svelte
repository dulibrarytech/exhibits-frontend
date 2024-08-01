<script>
    import { onMount } from 'svelte';
    import OpenSeadragon from 'openseadragon'
    import {createEventDispatcher} from 'svelte';

    export let url;

    const dispatch = createEventDispatcher();

    let viewer;
    let messageDisplay;
    let viewerDisplay;

    const init = () => {
        viewer = null;
        messageDisplay = true;
        viewerDisplay = false;
    }

    init();

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
            })

            viewer.addHandler('open', function() {
                dispatch('loaded', {});

                messageDisplay = false;
                viewerDisplay = true;
            });

            viewer.addHandler('open-failed', function() {
                dispatch('load-failed', {});
                throw `Viewer load failed: ${url}`;
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

    <div class="message" style="display: {messageDisplay ? "block" : "none"}" >Loading, please wait...</div>
    
    <div class="openseadragon content" id="openseadragon1" style="display: {viewerDisplay ? "block" : "none"}"></div>
</div>

<style>
.openseadragon {
    height: 81vh;
}

.openseadragon-container {
    padding: 15px;
    background: #616161;
    overflow: hidden;
}

.openseadragon-container > .controls {
    padding-top: 8px;
    padding-left: 8px;
    position: absolute;
    z-index: 10;
}

.message {
    text-align: center;
    position: relative;
    top: 50%;
    font-size: 1.4em;
}

</style>