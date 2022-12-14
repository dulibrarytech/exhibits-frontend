<script>
    import Kaltura_Content from "./Kaltura_Content.svelte";
    import Embed_Code_Content from "./Embed_Code_Content.svelte";
    //import JWPlayer_Content from "./JWPlayer_Content.svelte";

    export let args = {};

    var kalturaId = null;
    var embedCode = null;
    var url = null;

    console.log("Video player data in:", args)

    const render = () => {

    }
</script>

<div class="video-player">
    <h6>Video player</h6>
    <div class="video content">
        {#if kalturaId}
            <Kaltura_Content id={kalturaId} />
        {:else if embedCode}
            <Embed_Code_Content code={embedCode} />
        {:else if url}
            <video controls>
                <track kind="captions">
                <source src={url} type="video/mp4"> <!-- get src ext from url? -->
            </video>
        {:else}
            <h6>Loading video content...</h6>
        {/if}
    </div>
</div>
