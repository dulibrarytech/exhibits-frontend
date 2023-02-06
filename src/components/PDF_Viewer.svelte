<script>
    export let args = {};

    var url = null;
    var caption = null;

    console.log("TEST PDF viewer data in:", args)

    $: {
        if(!url) url = args.url || null;
        if(!caption) caption = args.caption || "";

        url = `${url}#toolbar=0&navpanes=0&scrollbar=0`;
    }
</script>

<div class="pdf-viewer">
    <h6>PDF viewer</h6>
    <div class="pdf content">
        {#if url}
            <iframe src={url} title={caption} /> 
        {:else}
            <h6>Loading pdf content...</h6>
        {/if}
    </div>
</div>

<style>
    iframe {
        width: 100%;
        height: 60vh;
    }
</style>
