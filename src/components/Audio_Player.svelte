<script>
    import Embed_Code_Content from "./Embed_Code_Content.svelte";
    //import JWPlayer_Content from "./JWPlayer_Content.svelte";

    // import Kaltura
    import Kaltura_Content from "./Kaltura_Content.svelte";

    export let args = {};

    let {
        url=null, 
        embedCode=null, 
        caption=null, 
        mimeType=null,
        kalturaId=null
        
    } = args;

    $: {
        render();
    }

    const render = () => {
        if(!url && !kalturaId && !embedCode) console.error("Error loading audio content: path to source not found")
    }
</script>

<div class="audio-player">
    {#if kalturaId}
        <Kaltura_Content entryId={kalturaId} {caption} /> 
    {:else}
        <div class="audio">
            {#if embedCode}
                <Embed_Code_Content code={embedCode} /> <!-- Enforce <audio></audio> in embed code string. EmbedCode removes <script> code-->
            {:else if url}
                <div class="content">   
                    {#if mimeType}
                        <audio src={url} type={mimeType} controls></audio>
                    {:else}
                        <audio src={url} controls></audio>
                    {/if}
                    
                    {#if caption}<div class="caption">{caption}</div>{/if}
                </div>
            {:else}
                <h6>Loading audio content...</h6>
            {/if}
        </div>
    {/if}
</div>

<style>
    .audio {
        padding: 0 30px;
    }
</style>
