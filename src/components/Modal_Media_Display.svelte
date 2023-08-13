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
						<button on:click={() => dialog.close()}><i class="bi bi-x-lg"></i></button>
					</div>

					<div class="col-lg-5 col-md-4 col-sm-12">
						<!-- controls for text section or leave empty -->
					</div>
				</div>

				<div class="row dialog-content">
					<div class="col-lg-12">
						<div class="row">

							<div class="col-lg-7 col-md-8 col-sm-12">
								<Media_Display {item} args={{isTileImage: true}}/>
							</div>

							<div class="col-lg-5 col-md-4 col-sm-12">
								{#if title}<div class="title">{title}</div>{/if}
								<div class="text">
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


	.modal-content {
		background: #3C4043;
		border: none;
		height: 86vh;
    	overflow-y: scroll;
	}

	:global(.modal-item-viewer .media-item) {
		width: 100%;
		/* width: 67vw; */
	}

	:global(.modal-item-viewer .media-item .caption) {
		color: white;
	}

	:global(.modal-item-viewer .text-item) {
		background: white;
	}

	:global(.modal-item-viewer .openseadragon) {
		width: unset;
	}

	:global(.modal-item-viewer .text-item .content) {
		padding: 2.4em;
	}

	:global(.modal-item-viewer .text-item) {
		padding: 15px;
		overflow: hidden;
		overflow-y: scroll;
	}

	dialog {
		width: 100%;
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
		padding: 1em;
		width: 100%;
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
	button {
		display: block;
	}

	.text {
		height: 100%;
	}
</style>
