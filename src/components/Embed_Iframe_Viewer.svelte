<script>
    export let args = {};

    var url = null;
    var caption = null;

    console.log("Embed external viewer data in:", args)

    $: {
        if(!url) url = args.url || null;
        if(!caption) caption = args.caption || "";
    }
</script>

<div class="iframe-viewer">
    <div class="external-content content">
        {#if url}
            <iframe src={url} title={caption} /> 
        {:else}
            <h6>Loading iframe content...</h6>
        {/if}
    </div>
</div>

<style>
    iframe {
        width: 100%;
    }
</style>