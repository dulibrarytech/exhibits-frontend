<script>
    import { onMount } from 'svelte';
    import OpenSeadragon from 'openseadragon'
    import {createEventDispatcher} from 'svelte';

    export let url;

    const dispatch = createEventDispatcher();

    let viewer;

    const init = () => {
        viewer = null;
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
                console.log(`Openseadragon loaded ${url}`);
                dispatch('loaded', {});
            });

            viewer.addHandler('open-failed', function(error) {
                dispatch('load-error', {error});
                throw `Viewer load failed: ${url}`;
            });
        }
        catch(e) {
            console.error(`Error initializing OpenSeadragon viewer: ${e}`);
        }

        // disable scroll by mousewheel over image
        document.querySelector("#openseadragon1").addEventListener("mousewheel", ()=>{}, false);

        // override the openseadragon "home" button title text
        document.querySelector("#openseadragon-zoom-initial").setAttribute('title', "Reset to default zoom level");
    });
</script>

<div class="openseadragon-container">
    <div class="controls">
        <button id="openseadragon-zoom-in"><i class="bi bi-plus-lg"></i></button>
        <button id="openseadragon-zoom-out"><i class="bi bi-dash"></i></button>
        <button id="openseadragon-zoom-initial"><i class="bi bi-arrow-clockwise"></i></button>
    </div>

    <div class="openseadragon content" id="openseadragon1"></div>
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
</style>