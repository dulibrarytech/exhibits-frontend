<script>
    import {createEventDispatcher} from 'svelte';
    import Media_Display from './Media_Display.svelte';
	import Text_Display from './Text_Display.svelte';

    export let item = null;

    const dispatch = createEventDispatcher();

	let dialog; // HTMLDialogElement
	let title;

	$: if (dialog && item) dialog.showModal();

	$: {
		title = item.title || null;
	}

    const closeDialog = () => {
        dispatch('close', {});
    }
</script>

<div class="modal-item-viewer">
	<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
	<dialog bind:this={dialog} on:close={closeDialog}>

		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div>
			<div class="dialog-content">

				<!-- dialog controls -->
				<div class="row dialog-controls">
					<div class="col-lg-7 col-md-8 col-sm-12">
						<button class="button-close" on:click={() => dialog.close()}><i class="bi bi-x-lg"></i></button>
						<!-- <button class="button-close" on:click={() => dialog.close()}><i class="bi bi-chevron-left"></i></button> -->
					</div>

					<div class="col-lg-5 col-md-4 col-sm-12">
						<!-- controls for text section or leave empty -->
					</div>
				</div>

				<div class="row item-content">
					<div class="col-lg-12">
						<div class="row">

							<div class="col-lg-7 col-md-8 col-sm-12 media-display-container">
								<Media_Display {item} args={{isTileImage: true}}/>
							</div>

							<div class="col-lg-5 col-md-4 col-sm-12 text-display-container">
								<div class="text">
									{#if title}
										<div class="title">{title}</div>
										<hr>
										<br>
									{/if}
									<Text_Display {item} />
								</div>
							</div>
						</div>

						<!-- viewer-links -->
						<div class="row">
							<div class="col-lg-12">

							</div>
						</div>

					</div>

				</div>

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
		background: white;
		padding: 30px 15px 30px 30px;
	}

	.modal-menu {
		height: 50px;
		pointer-events: initial;
		display: inline-flex;
	}
	
	.modal-menu button {
		color: #818181;
		min-width: 42px;
		font-size: 18px;
	}


	.dialog-content {
		height: 100%;
	}

	.item-content {
		/* height: 86vh; */
		height: 95%;
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
		/* width: 67vw; */
		height: 100%;
	}

	:global(.modal-item-viewer .media-item .caption) {
		color: white;
	}

	:global(.modal-item-viewer .text-item) {
		background: white;
		max-height: 88%;
    	overflow-y: scroll;
	}

	:global(.modal-item-viewer .openseadragon-container) {
		height: 100%;
	}

	:global(.modal-item-viewer .openseadragon) {
		width: unset;
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
		background: rgba(0, 0, 0, 0.5);
	}
	dialog > div {
		/* padding: 1em; */
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
		top: 4px;
		left: 4px;
	}

	.text {
		height: 100%;
	}
</style>
