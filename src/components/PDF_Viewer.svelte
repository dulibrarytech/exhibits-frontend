<script>
    export let args = {};

    var url = null;

    $: {
        if(!url) url = args.url || null;
        url = `${url}#toolbar=0&navpanes=0&scrollbar=0`;
    }
</script>

<div class="pdf-viewer">
    <div class="pdf-content">
        {#if url}
            <!-- <iframe src={url} title={caption} />  -->
            <object data={url} type="application/pdf" title={caption} width="100%" height="100%"></object>
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

    .pdf-viewer {
        height: 100%;
    }

    .pdf-content {
        border-style: solid;
        border-width: 1px;
        border-color: #e5e3e1;
        height: 100%;
    }
</style>
