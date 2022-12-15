<script>
    export let args = {};

    var url = null;
    var caption = null;

    console.log("PDF viewer data in:", args)

    $: {
        if(!url) url = args.url || null;
        if(!caption) caption = args.caption || "";
    }

    const render = () => {

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
