<script>
    import Embed_Code_Content from "./Embed_Code_Content.svelte";
    import Kaltura_Content from "./Kaltura_Content.svelte";

    export let args = {};
    export let height = null;
    export let width = null;

    let {
        url=null, 
        embedCode=null, 
        mimeType=null,
        kalturaId=null,
        isEmbedded=false,
        thumbnailImage=null
        
    } = args;

    $: {
        render();
    }

    const render = () => {
        if(!url && !kalturaId && !embedCode) console.error("Error loading video content: path to source not found")
    }
</script>

<div class="video-player">
    {#if kalturaId}
        <Kaltura_Content entryId={kalturaId} preview={thumbnailImage} args={{isEmbedded, mimeType}} />
    
    {:else}
        <div class="video">
            {#if embedCode}
                <Embed_Code_Content code={embedCode} /> <!-- Enforce <video></video> in embed code string. EmbedCode removes <script> code-->
            {:else if url}
                <div class="content">   
                    {#if mimeType}
                        <video src={url} type={mimeType} controls></video>
                    {:else}
                        <video src={url} controls></video>
                    {/if}
                </div>
            {:else}
                <h6>Loading video content...</h6>
            {/if}
        </div>
    {/if}
</div>

<style>
    .content video {
        width: 100%;
    }
</style>
