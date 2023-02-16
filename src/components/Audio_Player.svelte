<script>
    import Kaltura_Content from "./Kaltura_Content.svelte";
    import Embed_Code_Content from "./Embed_Code_Content.svelte";
    //import JWPlayer_Content from "./JWPlayer_Content.svelte";

    export let args = {};

    let {
        url=null, 
        kalturaId=null, 
        embedCode=null, 
        caption=null, 
        mimeType=null
        
    } = args;

    $: {
        render();
    }

    const render = () => {
        if(!url && !kalturaId && !embedCode) console.error("Error loading audio content: path to source not found")
    }
</script>

<div class="audio-player">
    <div class="audio">
        {#if kalturaId}
            <Kaltura_Content id={kalturaId} />
        {:else if embedCode}
            <Embed_Code_Content code={embedCode} /> <!-- Enforce <audio></audio> in embed code string. EmbedCode removes <script> code-->
        {:else if url}
            <div class="content">   
                {#if mimeType}
                    <audio src={url} type={mimeType} controls></audio>
                {:else}
                    <audio src={url} controls></audio>
                {/if}
                
                {#if caption}<p>{caption}</p>{/if}
            </div>
        {:else}
            <h6>Loading audio content...</h6>
        {/if}
    </div>
</div>
