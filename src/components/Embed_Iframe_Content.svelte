<script>
    export let args = {};

    var url = null;
    var caption = null;

    console.log("Embed external viewer data in:", args)

    $: {
        if(!url) url = args.url || null;
        if(!caption) caption = args.caption || "";
    }

    const render = () => {

    }
</script>

<div class="iframe-viewer">
    <h6>Iframe viewer</h6>
    <div class="external-content content">
        {#if url}
            <iframe src={url} title={caption} /> 
        {:else}
            <h6>Loading external content...</h6>
        {/if}
    </div>
</div>
