<script>
    import { onMount } from 'svelte';

    export let url;
    export let altText = "Image";

    var viewer = null;

    onMount(async () => {
        try {
            viewer = OpenSeadragon({
                id: "openseadragon1",
                prefixUrl: "/libs/openseadragon/images/",
                tileSources: url
            });
        }
        catch(e) {
            console.error(`Error initializing OpenSeadragon viewer: ${e}`);
        }

        console.log("Init OSD:", viewer)
    });
</script>

<div id="openseadragon1" style="width: 800px; height: 600px;" title={altText}></div>

<style>

</style>