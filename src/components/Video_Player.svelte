<script>
    import Kaltura_Content from "./Kaltura_Content.svelte";
    import Embed_Code_Content from "./Embed_Code_Content.svelte";
    //import JWPlayer_Content from "./JWPlayer_Content.svelte";

    export let args = {};

    var kalturaId = null;
    var embedCode = null;
    var url = null;
    var type = null;

    console.log("Audio_Player data in:", args)

    $: {
        if(!type) type = args.type || null;
    }
</script>

<div class="video-player">
    <h6>Video player</h6>
    <div class="video">
        {#if kalturaId}
            <Kaltura_Content id={kalturaId} />
        {:else if embedCode}
            <Embed_Code_Content code={embedCode} /> <!-- Enforce <audio></audio> in embed code string. EmbedCode removes <script> code-->
        {:else if url}
            {#if type}
                <video src={url} {type} controls></video>
            {:else}
                <video src={url} controls></video>
            {/if}
        {:else}
            <h6>Loading video content...</h6>
        {/if}
    </div>
</div>
