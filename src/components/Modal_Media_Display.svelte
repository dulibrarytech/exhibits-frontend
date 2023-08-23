<script>
    import Media_Display from './Media_Display.svelte';
	import Text_Display from './Text_Display.svelte';

    export let data = null;

	let title;

    $: {
        title = data.title || null;
    }
</script>

{#if data}
	<div class="modal-item-viewer">
		<div class="row">
			<div class="col-lg-8 col-md-9 col-sm-12 media-display-container">
				<Media_Display item={data} args={{viewerType: 'interactive'}}/>
			</div>

			<div class="col-lg-4 col-md-3 col-sm-12 text-display-container">
				<div class="text">
					<Text_Display item={data} {title} />
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-item-viewer {
		height: 100%;
	}

	.modal-item-viewer > .row {
		height: 100%;
	}

	.modal-item-viewer .text {
		background: #F4F2EC;
		padding: 30px 15px 30px 30px;
	}

    .media-display-container {
		height: 100%;
		padding-right: 0px;
	}

	.text-display-container {
		height: 100%;
		padding-left: 0px;
	}

    .text {
		height: 100%;
	}

	:global(.modal-item-viewer .media-item) {
		width: 100%;
		height: 100%;

		position: relative;
		padding: 30px;
		background: grey;
	}

	:global(.modal-item-viewer .media-item .caption) {
		color: white;
	}

	:global(.modal-item-viewer .openseadragon-container) {
		height: 100%;
		padding: 0px !important;
		overflow: hidden;
		background: white !important;
	}

	:global(.modal-item-viewer .openseadragon) {
		width: unset;
		height: 100% !important;
	}

	:global(.modal-item-viewer .text-item) {
		max-height: 100%;
    	overflow-y: scroll;
	}

	:global(.modal-item-viewer .text .text-item .text-content) {
		padding-right: 15px;
	}

	:global(.modal-item-viewer .audio-player) {
		background: #616161;
		color: white;
		height: 100%;
		position: absolute;
		bottom: 10px;
	}

	:global(.modal-item-viewer .audio-player .audio) {
		position: absolute;
		bottom: 0;
	}

	:global(.modal-item-viewer .video-player) {
		height: 100%;
		color: white;
	}

	:global(.modal-item-viewer .video-player .video) {
		height: 100%;
	}

	:global(.modal-item-viewer .video-player .video *) {
		height: 95%;
	}

	:global(.modal-item-viewer .pdf-viewer) {
		height: 100%;
	}

	:global(.modal-item-viewer .pdf-viewer *) {
		height: 100%;
	}

	:global(.modal-item-viewer .iframe-viewer) {
		height: 100%;
	}

	:global(.modal-item-viewer .iframe-viewer *) {
		height: 100%;
	}
</style>