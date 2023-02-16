<script>
    import { Settings } from '../config/settings';
    import { Kaltura } from '../libs/kaltura';

    export let id = null;
    export let caption = "Untitled content";

    var {   
        kalturaUniqueObjectID,
        kalturaPlayerHeight,
        kalturaPlayerWidth

    } = Settings;

    var kalturaUrl = null;

    $: {
        if(id) kalturaUrl = Kaltura.getEmbeddedViewerUrl(id);
        else console.error("Missing Kaltura entry id");
    }
</script>

<div class="kaltura content">
    {#if kalturaUrl}
        <iframe id={kalturaUniqueObjectID} title={caption} src={kalturaUrl} width={kalturaPlayerWidth} height={kalturaPlayerHeight} allowfullscreen webkitallowfullscreen mozAllowFullScreen allow='autoplay *; fullscreen *; encrypted-media *' frameborder='0'></iframe> 
    {:else}
        <h5>Loading Kaltura content...</h5>
    {/if}
</div>