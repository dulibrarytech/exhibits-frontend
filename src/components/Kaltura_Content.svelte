<script>
    'use-strict'
    
    import { Settings } from '../config/settings';
    import { Kaltura } from '../libs/kaltura';

    export let entryId = null;
    export let caption = "Untitled content";
    export let preview = null;
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
        width = kalturaPlayerWidth,
        type = "video"

    } = args;

    let kalturaUrl = null;

    let previewImageUrl;
    let contentSection;
    let iframeSection;
    let iframeElement;
    let iframeLoadMessage;
    let previewElement;
    let previewImageElement;
    let htmlPlayerElement;
    let htmlPlayer;

    $: {
        if(isEmbedded) {
            // embedded html audio or video player will source from kaltura stream url
            kalturaUrl = Kaltura.getStreamingMediaUrl(entryId);
        }
        else {
            // modal viewer template displays the kaltura embedded player iframe
            kalturaUrl = Kaltura.getEmbeddedViewerUrl(entryId);
        }

        previewImageUrl = preview || Kaltura.getThumbnailUrl(entryId, 1000, 1000);
    }

    const onLoadIframe = () => {
        iframeSection.style.visibility = "visible";
        iframeLoadMessage.style.display = "none";

        window.addEventListener('resize', function(event) {
            iframeElement.src = iframeElement.src;
        }, true);
    }

    const onShowTranscriptSection = () => {
        //contentSection.style.height = "100%";
    }

    const onClickKalturaPreview = (event) => {
        previewElement.style.display = "none";
        htmlPlayerElement.style.display = "block";
        htmlPlayer.play();
    }

    const onImageLoadError = () => {
        previewImageElement.src = Kaltura.getThumbnailUrl(entryId, 1000, 1000);
    }
</script>

<div class="kaltura-content content" bind:this={contentSection}>
    {#if kalturaUrl}
        {#if isEmbedded}
            <div class="preview" bind:this={previewElement}>
                <img class="preview-image" src={previewImageUrl} on:click={onClickKalturaPreview} on:keypress={onClickKalturaPreview} on:error={onImageLoadError} bind:this={previewImageElement}/> 
                <img class="preview-icon" src="../assets/images/play-button-icon-png-18919.png" />
            </div>

            {#if type == "audio"}
                <div class="embedded-audio" style="display: none" bind:this={htmlPlayerElement}>
                    <audio src={kalturaUrl} type={mimeType} controls id={kalturaUniqueObjectID} bind:this={htmlPlayer} ></audio>
                </div>
            {:else if type == "video"}
                <div class="embedded-video" style="display: none" bind:this={htmlPlayerElement}>
                    <video src={kalturaUrl} type={mimeType} controls id={kalturaUniqueObjectID} bind:this={htmlPlayer} ></video>
                </div>
            {:else}
                <h6>Invalid media type</h6>
            {/if}

        {:else}
            <div class="player-load-message" bind:this={iframeLoadMessage}>
                <h5>Loading Kaltura player...</h5>
            </div>
            <div class="iframe-wrapper" bind:this={iframeSection}>
                <iframe bind:this={iframeElement} on:load={onLoadIframe} id={kalturaUniqueObjectID} title={caption} src={kalturaUrl} {width} {height} allowfullscreen webkitallowfullscreen mozAllowFullScreen allow='autoplay *; fullscreen *; encrypted-media *' frameborder='0'></iframe>
                <div class="subframe-content"></div>
            </div>

        {/if}

    {:else}
        <div class="player-load-message" bind:this={iframeLoadMessage}>
            <h6>Null Kaltura entry id</h6>
        </div>
        
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

    .preview {
        position: relative;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 10;
    }

    .preview:hover {
        cursor: pointer;
    }

    .preview-image {
        width: 100%;
        height: 100%;
    }

    .preview-icon {
        width: 128px;
        height: 128px;
        position: absolute;
        top: calc(50% - 64px);
        left: calc(50% - 64px);
        pointer-events: none;
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

    .player-load-message {
        position: relative;
        top: 50%;
        left: calc(50% - 100px);
    }
</style>