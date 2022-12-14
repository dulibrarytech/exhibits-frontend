<script>
    import Kaltura_Content from "./Kaltura_Content.svelte";
    import Embed_Code_Content from "./Embed_Code_Content.svelte";
    //import JWPlayer_Content from "./JWPlayer_Content.svelte";

    export let args = {};

    var kalturaId = null;
    var embedCode = null;
    var url = null;

    console.log("Audio player data in:", args)

    const render = () => {

    }
</script>

<div class="audio-player">
    <h6>Audio player</h6>
    <div class="audio content">
        {#if kalturaId}
            <Kaltura_Content id={kalturaId} />
        {:else if embedCode}
            <Embed_Code_Content code={embedCode} />
        {:else if url}
            <audio src={url}></audio>
        {:else}
            <h6>Loading audio content...</h6>
        {/if}
    </div>
</div>
