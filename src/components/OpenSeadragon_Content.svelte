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
                prefixUrl: "/images/openseadragon/",
                tileSources: url
            });
        }
        catch(e) {
            console.error(`Error initializing OpenSeadragon viewer: ${e}`);
        }
    });
</script>

<div id="openseadragon1" style="width: 800px; height: 600px;" title={altText}></div>

<style>

</style>