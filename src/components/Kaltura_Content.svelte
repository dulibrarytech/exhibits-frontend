<script>
    'use-strict'
    
    import { Settings } from '../config/settings';
    import { Kaltura } from '../libs/kaltura';

    export let entryId = null;
    export let title = "kaltura media player";
    export let altText = "kaltura media player";
    export let height = null;
    export let width = null;
    export let args = {};

    const EMBED_HTML_PLAYER = false;

    let {   
        kalturaUniqueObjectID,
        kalturaPlayerHeight,
        kalturaPlayerWidth

    } = Settings;

    let {
        preview = null,
        isEmbedded = false,
        mimeType = null,
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

    const init = () => {
        if(!height) height = kalturaPlayerHeight;
        if(!width) width = kalturaPlayerWidth;

        if(isEmbedded) {
            kalturaUrl = EMBED_HTML_PLAYER ? Kaltura.getStreamingMediaUrl(entryId) : Kaltura.getViewerUrl(entryId);
        }
        else {
            kalturaUrl = Kaltura.getTranscriptViewerUrl(entryId);
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
        // contentSection.style.height = "100%";
    }

    const onClickKalturaPreview = (event) => {
        previewElement.style.display = "none";
        htmlPlayerElement.style.display = "block";
        htmlPlayer.play();
    }

    const onPreviewImageLoadError = () => {
        previewImageElement.src = Kaltura.getThumbnailUrl(entryId, 1000, 1000);
    }

    init();
</script>

<div class="kaltura-content content {isEmbedded ? 'embedded' : ''}" bind:this={contentSection} >
    {#if kalturaUrl}
        {#if EMBED_HTML_PLAYER && isEmbedded}
            {#if type == "audio"}
                {#if previewImageUrl}
                    <div class="preview" bind:this={previewElement}>
                        <img class="preview-image audio-preview-image" src={previewImageUrl} alt="preview image for audio file" {title} on:error={onPreviewImageLoadError}/>
                    </div>
                {/if}

                <div class="embedded-audio" style="" bind:this={htmlPlayerElement}>
                    <audio src={kalturaUrl} 
                        type={mimeType} 
                        controls 
                        id={kalturaUniqueObjectID} 
                        aria-label={altText || undefined}
                        bind:this={htmlPlayer}>
                    </audio>
                </div>
            {:else if type == "video"}
                <div class="preview" bind:this={previewElement}>
                    <button type="button" on:click={onClickKalturaPreview}>
                        <img class="preview-image" 
                            src={previewImageUrl} 
                            alt={`${altText || undefined}`} 
                            aria-label="click to play video"
                            title={title} 
                            on:keypress={onClickKalturaPreview} 
                            on:error={onPreviewImageLoadError} 
                            bind:this={previewImageElement}/> 
                    </button>
                    
                    <img class="video-preview-overlay" src="../assets/images/play-button-icon-png-18919.png" />
                </div>

                <div class="embedded-video" style="display: none" bind:this={htmlPlayerElement}>
                    <video src={kalturaUrl} 
                        type={mimeType} 
                        controls 
                        id={kalturaUniqueObjectID} 
                        aria-label={altText || undefined}
                        bind:this={htmlPlayer}>
                    </video>
                </div>
            {:else}
                <h6>Invalid media type</h6>
            {/if}

        {:else}
            <div class="player-load-message" bind:this={iframeLoadMessage}>
                <h5>Loading Kaltura player...</h5>
            </div>
            <div class="iframe-wrapper" bind:this={iframeSection} aria-label={altText || undefined}>
                <iframe bind:this={iframeElement} on:load={onLoadIframe} id={kalturaUniqueObjectID} {title} src={kalturaUrl} {width} {height} allowfullscreen webkitallowfullscreen mozAllowFullScreen allow='autoplay *; fullscreen *; encrypted-media *' frameborder='0'></iframe>
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
    .kaltura-content:not(.embedded) {
        height: 100%;
        width: 100%;
    }

    .kaltura-content.embedded {
        height: 75vw;
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

    .preview > button {
        width: 100%;
    }

    .preview:hover {
        cursor: pointer;
    }

    .preview-image {
        width: 100%;
        height: 100%;
    }

    .audio-preview-image {
        margin-bottom: 15px;
    }

    .video-preview-overlay {
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