<script>
    export let args = {};

    let url = null;
    let caption = null;

    let {height = null, width = null} = args;

    const DEFAULT_IFRAME_HEIGHT = "350";
    const DEFAULT_IFRAME_WIDTH = "100%";

    $: {
        if(!url) url = args.url || null;
        if(!caption) caption = args.caption || "";

        if(!height) height = DEFAULT_IFRAME_HEIGHT;
        if(!width) width = DEFAULT_IFRAME_WIDTH;
    }
</script>

<div class="iframe-viewer">
    <div class="external-content content">
        {#if url}
            <iframe src={url} title={caption} {height} {width} /> 

        {:else}
            <div class="load-message">
                <h6>Loading iframe content...</h6>
            </div>

        {/if}
    </div>
</div>

<style>

</style>