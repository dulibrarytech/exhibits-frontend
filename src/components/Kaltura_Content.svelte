<script>
    'use-strict'
    
    import { Settings } from '../config/settings';
    import { Kaltura } from '../libs/kaltura';

    export let entryId = null;
    export let caption = "Untitled content";
    export let args = {};

    let {   
        kalturaUniqueObjectID,
        kalturaPlayerHeight,
        kalturaPlayerWidth

    } = Settings;

    let {
        isEmbedded = false,
        mimeType = null,
        height = kalturaPlayerHeight,
        width = kalturaPlayerWidth

    } = args;

    let kalturaUrl = null;

    let contentSection;
    let iframeSection;
    let iframeElement;

    $: {
        if(isEmbedded) {
            // embedded html audio or video player on page will source from kaltura stream url
            kalturaUrl = Kaltura.getStreamingMediaUrl(entryId);
        }
        else {
            // modal viewer template displays the kaltura embedded player iframe
            kalturaUrl = Kaltura.getEmbeddedViewerUrl(entryId);
        }
    }

    const onLoadIframe = () => {
        iframeSection.style.visibility = "visible";

        window.addEventListener('resize', function(event) {
            iframeElement.src = iframeElement.src;
        }, true);
    }

    const onShowTranscriptSection = () => {
        //contentSection.style.height = "100%";
    }
</script>

<div class="kaltura-content content" bind:this={contentSection}>
    {#if kalturaUrl}
        {#if isEmbedded}
            <video src={kalturaUrl} type={mimeType} controls id={kalturaUniqueObjectID}></video>

        {:else}
            <div class="iframe-wrapper" bind:this={iframeSection}>
                <iframe bind:this={iframeElement} on:load={onLoadIframe} id={kalturaUniqueObjectID} title={caption} src={kalturaUrl} {width} {height} allowfullscreen webkitallowfullscreen mozAllowFullScreen allow='autoplay *; fullscreen *; encrypted-media *' frameborder='0'></iframe>
                <div class="subframe-content"></div>
            </div>
        {/if}

    {:else}
        <h5>Loading Kaltura player...</h5>
    {/if}
</div>

<style>
    .kaltura-content {
        height: 100%;
        width: 100%;
    }

    .kaltura-content iframe,
    .kaltura-content video {
        width: 100%;
    }

    .subframe-content {
        padding: 0 15px;
    }

    .transcript-expanded {
        height: 100%;
    }

    .iframe-wrapper {
        visibility: hidden;
        height: 100%;
    }

    .links {
        margin-top: 15px;
    }
</style>