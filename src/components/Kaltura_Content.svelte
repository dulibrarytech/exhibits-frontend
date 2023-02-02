<script>
    export let id = null;
    export let caption = "Untitled content";
    export let width = "600";
    export let height = "400";

    // TODO: to settings
    const KALTURA_DOMAIN = "https://cdnapisec.kaltura.com";
    const PARTNER_ID = "2357732";
    const UI_ID = "44058172";
    const UNIQUE_OBJECT_ID = "kaltura_player_1559751114";

    var kalturaUrl = null;

    $: {
        if(id && !kalturaUrl) kalturaUrl = `${KALTURA_DOMAIN}/p/${PARTNER_ID}00/embedIframeJs/uiconf_id/${UI_ID}/partner_id/${PARTNER_ID}?iframeembed=true&playerId=${UNIQUE_OBJECT_ID}&entry_id=${id}&flashvars[leadWithHTML5]=true`;
    }
</script>

<div class="kaltura content">
    {#if kalturaUrl}
        <iframe id={UNIQUE_OBJECT_ID} title={caption} src={kalturaUrl} {width} {height} allowfullscreen webkitallowfullscreen mozAllowFullScreen allow='autoplay *; fullscreen *; encrypted-media *' frameborder='0'></iframe> 
    {:else}
        <h5>Loading Kaltura content...</h5>
    {/if}
</div>