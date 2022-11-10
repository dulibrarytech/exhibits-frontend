<script>
    export let item;

    console.log("Image viewer item in:", item)

    let sourceUrl = null;
    let altText = "";

    $: {
        sourceUrl = item.url || null;
        altText = item.altText || item.caption || "Image";
    }
</script>

<div class="content-container">
    <h6>Image viewer</h6>
    <div class="image-viewer>">
        {#if sourceUrl}
            <img src={sourceUrl} alt={altText} />
        {:else}
            <p>Loading image...</p>
        {/if}
    </div>
</div>