<script>
    export let data = null;

    let container = null;
    let pageData = null;

    var message = "Loading...";

	$: {
		container = data.container || null;
        pageData = data.page || null;
	}
</script>

{#if data}
	<div class="modal-page-display">
		{#if pageData}
			<svelte:component this={container} data={pageData} />
		{:else}
			<h3>{message}</h3>
		{/if}
	</div>
{/if}

<style>
    .modal-page-display {
        padding:55px;
        background: white;
        height: 100%;
    }

    :global(.modal-page-display .modal-page .page-content) {
        margin-top: 30px;
    }
</style>
