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

<div class="audio-player">
    <h6>Audio player</h6>
    <div class="audio">
        {#if kalturaId}
            <Kaltura_Content id={kalturaId} />
        {:else if embedCode}
            <Embed_Code_Content code={embedCode} /> <!-- Enforce <audio></audio> in embed code string. EmbedCode removes <script> code-->
        {:else if url}
            {#if type}
                <audio src={url} {type} controls></audio>
            {:else}
                <audio src={url} controls></audio>
            {/if}
        {:else}
            <h6>Loading audio content...</h6>
        {/if}
    </div>
</div>
