<script>
    'use-strict'
    
    import { Settings } from '../config/settings';
    import { Kaltura } from '../libs/kaltura';

    export let entryId = null;
    export let caption = "Untitled content";

    var {   
        kalturaUniqueObjectID,
        kalturaPlayerHeight,
        kalturaPlayerWidth

    } = Settings;

    var kalturaUrl = null;

    let contentSection;
    let iframeSection;
    let iframeElement;

    $: {
        if(entryId) kalturaUrl = Kaltura.getEmbeddedViewerUrl(entryId);
        else console.error("Missing Kaltura entry id");
    }

    const onLoadIframe = () => {
        //contentSection.style.height = "calc(100% - 250px)";
        iframeSection.style.visibility = "visible";

        window.addEventListener('resize', function(event) {
            iframeElement.src = iframeElement.src;
        }, true);
    }

    const onShowTranscriptSection = () => {
        //contentSection.style.height = "100%";
    }
</script>

<div class="kaltura-content" bind:this={contentSection}>
    {#if kalturaUrl}
    <div class="iframe-wrapper" bind:this={iframeSection}>

        <iframe bind:this={iframeElement} on:load={onLoadIframe} id={kalturaUniqueObjectID} title={caption} src={kalturaUrl} width={kalturaPlayerWidth} height={kalturaPlayerHeight} allowfullscreen webkitallowfullscreen mozAllowFullScreen allow='autoplay *; fullscreen *; encrypted-media *' frameborder='0'></iframe>
        
        <div class="subframe-content">
            <!-- <div class="links">
                <button on:click|preventDefault={onShowTranscriptSection}>View Transcript</button>
            </div> -->
        </div>
        
    </div>

    {:else}
        <h5>Loading Kaltura player...</h5>
    {/if}
</div>

<style>
    .kaltura-content {
        height: 100%;
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