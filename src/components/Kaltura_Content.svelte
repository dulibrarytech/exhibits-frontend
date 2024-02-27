<script>
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

    $: {
        if(entryId) kalturaUrl = Kaltura.getEmbeddedViewerUrl(entryId);
        else console.error("Missing Kaltura entry id");

        console.log("TEST rendering Kaltura_Content: kal url:", kalturaUrl)
    }
</script>

<div class="kaltura content">
    {#if kalturaUrl}
        <iframe id={kalturaUniqueObjectID} title={caption} src={kalturaUrl} width={kalturaPlayerWidth} height={kalturaPlayerHeight} allowfullscreen webkitallowfullscreen mozAllowFullScreen allow='autoplay *; fullscreen *; encrypted-media *' frameborder='0'></iframe> 
    {:else}
        <h5>Loading Kaltura content...</h5>
    {/if}
</div>