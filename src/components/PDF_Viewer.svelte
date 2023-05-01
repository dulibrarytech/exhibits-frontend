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
    <div class="pdf-content">
        {#if url}
            <iframe src={url} title={caption} /> 
        {:else}
            <h6>Loading pdf content...</h6>
        {/if}
    </div>
    {#if caption}<span class="caption">{caption}</span>{/if}
</div>

<style>
    iframe {
        width: 100%;
        height: 60vh;
    }

    .pdf-content {
        border-style: solid;
        border-width: 1px;
        border-color: #e5e3e1;
    }
</style>
