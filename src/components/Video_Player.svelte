<script>
    import Kaltura_Content from "./Kaltura_Content.svelte";
    import Embed_Code_Content from "./Embed_Code_Content.svelte";
    //import JWPlayer_Content from "./JWPlayer_Content.svelte";

    export let args = {};

    console.log("TEST Video_Player data in:", args)

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
        if(!url && !kalturaId && !embedCode) console.error("Error loading video content: path to source not found")
    }
</script>

<div class="video-player">
    <div class="video">
        {#if kalturaId}
            <Kaltura_Content id={kalturaId} />
        {:else if embedCode}
            <Embed_Code_Content code={embedCode} /> <!-- Enforce <video></video> in embed code string. EmbedCode removes <script> code-->
        {:else if url}
            <div class="content">   
                {#if mimeType}
                    <video src={url} type={mimeType} controls></video>
                {:else}
                    <video src={url} controls></video>
                {/if}
                
                {#if caption}<p>{caption}</p>{/if}
            </div>
        {:else}
            <h6>Loading video content...</h6>
        {/if}
    </div>
</div>

<style>
    .content video {
        width: 100%;
    }
</style>
