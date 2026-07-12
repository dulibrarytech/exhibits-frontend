<script>
    'use-strict'
    
    import { createEventDispatcher } from 'svelte';
    import { Settings } from '../config/settings';
    import { Kaltura } from '../libs/kaltura';

    export let entryId = null;
    export let kalturaUrl = null;
    export let title = "kaltura media player";
    export let altText = "kaltura media player";
    export let args = {};

    const dispatch = createEventDispatcher();

    // module settings
    const EMBED_HTML_MEDIA_PLAYER = false;

    let {   
        kalturaUniqueObjectID,
        kalturaDomain

    } = Settings;

    let {
        preview = null,
        isEmbedded = false,
        mimeType = null,
        type = "video"

    } = args;

    let previewImageUrl;
    let iframeSection;
    let iframeElement;
    let previewElement;
    let previewImageElement;
    let htmlPlayerElement;
    let htmlPlayer;

    const init = () => {
        if(kalturaUrl) {
            kalturaUrl = validateKalturaUrl(kalturaUrl) ? kalturaUrl : null;
            if(!kalturaUrl) {
                console.error("Missing Kaltura URL or invalid Kaltura URL.");
            }   
        }

        else if(isEmbedded) {
            kalturaUrl = EMBED_HTML_MEDIA_PLAYER ? Kaltura.getStreamingMediaUrl(entryId) : Kaltura.getViewerUrl(entryId);
        }
        else {
            kalturaUrl = Kaltura.getViewerUrl(entryId);
        }        

        previewImageUrl = preview || Kaltura.getThumbnailUrl(entryId, "full");
    }

    const onLoadIframe = () => {
        iframeSection.style.visibility = "visible";

        window.addEventListener('resize', function(event) {
            iframeElement.src = iframeElement.src;
        }, true);

        dispatch('loaded', {entryId});
    }

    const onClickKalturaPreview = (event) => {
        previewElement.style.display = "none";
        htmlPlayerElement.style.display = "block";
        htmlPlayer.play();
    }

    const onPreviewImageLoadError = () => {
        previewImageElement.src = Kaltura.getThumbnailUrl(entryId, "full");
    }

    const validateKalturaUrl = (url) => {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.hostname.includes(kalturaDomain);
        }
        catch (error) {
            console.error("Error validating Kaltura URL: ", error);
            return false;
        }
    }

    init();
</script>

<div class="kaltura-content content {isEmbedded ? 'embedded' : ''}">

    {#if kalturaUrl}
        {#if EMBED_HTML_MEDIA_PLAYER && isEmbedded}
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
            <div class="iframe-wrapper" bind:this={iframeSection} aria-label={altText || undefined}>
                <iframe bind:this={iframeElement} on:load={onLoadIframe} id={kalturaUniqueObjectID} {title} src={kalturaUrl} allowfullscreen webkitallowfullscreen mozAllowFullScreen allow='autoplay *; fullscreen *; encrypted-media *' frameborder='0'></iframe>
                <div class="subframe-content"></div>
            </div>
        {/if}
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

    .iframe-wrapper iframe {
        height: 100%;
    }

    .subframe-content {
        padding: 0 15px;
    }

    .iframe-wrapper {
        visibility: hidden;
    }
</style>