<script>
    import {createEventDispatcher} from 'svelte';
    import Media_Display from './Media_Display.svelte';
	import Text_Display from './Text_Display.svelte';

    export let data = null;

    const dispatch = createEventDispatcher();

	let dialog; // HTMLDialogElement
	let title;

	$: {
		title = data.title || null;
		if (dialog && data) dialog.showModal();
	}

    const closeDialog = () => {
        dispatch('close', {});
    }
</script>

<div class="modal-item-viewer">
<!-- <div B class="modal-dialog-window"> -->

	<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
	<dialog bind:this={dialog} on:close={closeDialog}>

		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div>
			<div class="dialog-content">

				<!-- dialog controls -->
				<div class="row dialog-controls">
					<div class="col-lg-8 col-md-9 col-sm-12">
						<button class="button-close" on:click={() => dialog.close()}><i class="bi bi-x-lg"></i></button>
						<!-- <button class="button-close" on:click={() => dialog.close()}><i class="bi bi-chevron-left"></i>Back</button> --> <!-- "< back" button -->
					</div>

					<div class="col-lg-4 col-md-3 col-sm-12">
						<!-- controls for text section or leave empty -->
					</div>
				</div>

				<!-- item content (media/text) -->
				<div class="row item-content">

					<!-- Insert inner component here if dialog is abstracted -->
					<!-- B <div class="modal-item-viewer"> -->
					<div class="col-lg-12">
						<div class="row">
							<div class="col-lg-8 col-md-9 col-sm-12 media-display-container">
								<Media_Display item={data} args={{viewerType: 'interactive'}}/>
							</div>

							<div class="col-lg-4 col-md-3 col-sm-12 text-display-container">
								<div class="text">
									<Text_Display item={data} title={data.title || null} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- B </div> -->

			</div>
		</div>

	</dialog>
</div>

<style>
	.modal-item-viewer {
		height: 100vh;
		width: 100%;
	}

	.modal-item-viewer .text {
		/* background: white; */
		background: #F4F2EC;
		padding: 30px 15px 30px 30px;
	}

	.dialog-content {
		height: 100%;
	}

	.dialog-controls {
		height: 6%;
	}

	.item-content {
		height: 94%;
	}

	.item-content > div {
		max-height: 100%;
	}

	.item-content .row {
		height: 100%;
	}

	.media-display-container {
		height: 100%;
		padding-right: 0px;
	}

	.text-display-container {
		height: 100%;
		padding-left: 0px;
	}

	:global(.modal-item-viewer .media-item) {
		width: 100%;
		height: 100%;
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
		/* background: white; */
		max-height: 100%;
    	overflow-y: scroll;
	}

	:global(.modal-item-viewer .text .text-item .text-content) {
		padding-right: 15px;
	}

	:global(.modal-item-viewer .item-content .audio-player) {
		background: #616161;
		color: white;
		height: 100%;
		position: relative;
	}

	:global(.modal-item-viewer .item-content .audio-player .audio) {
		padding: 30px;
		position: absolute;
		bottom: 0;
	}

	:global(.modal-item-viewer .item-content .video-player) {
		height: 100%;
    	background: #616161;
		color: white;
	}

	:global(.modal-item-viewer .item-content .video-player .video) {
		height: 100%;
    	padding: 30px;
	}

	:global(.modal-item-viewer .item-content .video-player .video *) {
		height: 95%;
	}

	:global(.modal-item-viewer .item-content .pdf-viewer) {
		height: 100%;
	}

	:global(.modal-item-viewer .item-content .pdf-viewer *) {
		height: 100%;
	}

	:global(.modal-item-viewer .item-content .iframe-viewer) {
		height: 100%;
	}

	:global(.modal-item-viewer .item-content .iframe-viewer *) {
		height: 100%;
	}

	dialog {
		width: 100%;
		height: 100%;
		border-radius: 0.2em;
		border: none;
		padding: 0;
		overflow: hidden;
		background: #e5e3e1;
		
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.8);
	}
	dialog > div {
		width: 100%;
		height: 100%;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.button-close {
		display: block;
		position: relative;
		top: 5px;
		left: 8px;
	}

	.text {
		height: 100%;
	}
</style>
