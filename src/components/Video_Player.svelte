<script>
    import Embed_Code_Content from "./Embed_Code_Content.svelte";
    import Kaltura_Content from "./Kaltura_Content.svelte";
    import * as Logger from '../libs/logger.js';

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
        if(!url && !kalturaId && !embedCode) Logger.module().error("Error loading video content: path to source not found")
    }
</script>

<div class="video-player">
    {#if kalturaId}
        <Kaltura_Content entryId={kalturaId} preview={thumbnailImage} args={{isEmbedded, mimeType, type: "video"}} />
    
    {:else}
        <div class="video">
            {#if embedCode}
                <Embed_Code_Content code={embedCode} />
            {:else if url}
                <div class="content">   
                    {#if mimeType}
                        <video src={url} type={mimeType} controls></video>
                    {:else}
                        <video src={url} controls></video>
                    {/if}
                </div>
            {:else}
                <div class="load-message">
                    <h6>Loading video content...</h6>
                </div>
                
            {/if}
        </div>
    {/if}
</div>

<style>
    .content video {
        width: 100%;
    }
</style>
