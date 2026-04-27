<script>
    import Embed_Code_Content from "./Embed_Code_Content.svelte";
    import Kaltura_Content from "./Kaltura_Content.svelte";
    import * as Logger from '../libs/logger.js';

    export let args = {};

    let {
        url=null, // universal viewer will pass in kaltura url from manifest
        title=null,
        altText=null,
        embedCode=null, 
        mimeType=null,
        kalturaId=null,
        isEmbedded=false,
        thumbnailImage=null,
        isKalturaItem=false, // UV will set to true if UVsettings.embedKalturaPlayer is true
        
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
    {#if isKalturaItem || kalturaId}
        <Kaltura_Content entryId={kalturaId} {title} {altText} args={{isEmbedded, type: "audio"}} />

    {:else}
        {#if isEmbedded && thumbnailImage}
            <img class="thumbnail" src={thumbnailImage} alt={altText || undefined} title={`${title} thumbnail image`}/>
        {/if}

        <div class="audio">
            {#if embedCode}
                <Embed_Code_Content code={embedCode} />
                
            {:else if url}
                <div class="content">
                    <audio src={url} type={mimeType || undefined} controls aria-label={altText || undefined} {title}></audio>
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
