<script>
    import Embed_Code_Content from "./Embed_Code_Content.svelte";
    import Kaltura_Content from "./Kaltura_Content.svelte";
    import * as Logger from '../libs/logger.js';

    export let args = {};

    let {
        url=null, 
        title=null,
        embedCode=null, 
        mimeType=null,
        kalturaId=null,
        isEmbedded=false,
        thumbnailImage=null,
        errorThumbnailImage=null
        
    } = args;

    $: {
        if(!title) title = "untitled audio";
        render();
    }

    const render = () => {
        if(!url && !kalturaId && !embedCode) {
            Logger.module().error("Error loading audio content: path to source not found");
        }
    }
</script>

<div class="audio-player">
    <!-- {#if isEmbedded && thumbnailImage}
        <img class="thumbnail" src={thumbnailImage} />
    {/if} -->

    {#if kalturaId}
        <Kaltura_Content entryId={kalturaId} preview={null} args={{isEmbedded, type: "audio"}} {title}/>

    {:else}
        {#if isEmbedded && thumbnailImage}
            <img class="thumbnail" src={thumbnailImage} alt={title} title={`${title} thumbnail image`}/>
        {/if}

        <div class="audio">
            {#if embedCode}
                <Embed_Code_Content code={embedCode} />
                
            {:else if url}
                <div class="content">
                    <!-- UPDATE type param assignment -->
                    <!-- {#if mimeType}
                        <audio src={url} type={mimeType} controls></audio> 
                    {:else}
                        <audio src={url} controls></audio>
                    {/if} -->

                    <audio src={url} type={mimeType || undefined} controls aria-label={title} {title}></audio>
                </div>

            {:else}
                <div class="load-message">
                    <h6>Loading audio content...</h6>
                </div>

            {/if}
        </div>
    {/if}
</div>

<style>
    .audio-player {
        padding: 0;
    }

    .thumbnail {
        width: 100%;
        height: 100%;
        margin-bottom: 15px;
    }
</style>
