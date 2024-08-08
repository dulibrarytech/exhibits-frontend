<script>
    import { onMount } from 'svelte';
	import {createEventDispatcher} from 'svelte';

    export let modalDisplay = null;
    export let modalData = null;

    let dialogElement; // HTMLDialogElement
	let height;
	let width;

    const dispatch = createEventDispatcher();

	const DEFAULT_DIALOG_HEIGHT = 100;
	const DEFAULT_DIALOG_WIDTH = 100;
	const MODAL_WINDOW_PADDING = 30;

	$: {
		height = DEFAULT_DIALOG_HEIGHT.toString() + "%";
		width = DEFAULT_DIALOG_WIDTH.toString() + "%";
	}

    const render = () => {
		if (dialogElement && modalData) {
            dialogElement.showModal();
			setDialogDimensions();
        }
	}

    const closeDialog = () => {
        dispatch('close', {});
    }

	const setDialogDimensions = () => {
		height = (window.innerHeight - MODAL_WINDOW_PADDING).toString() + "px";
		width = (window.innerWidth - MODAL_WINDOW_PADDING).toString() + "px";
	}

	onMount(async () => {
        render();
    });
</script>

<div class="modal-dialog-window">
	<dialog bind:this={dialogElement} style="height: {height}; width: {width}; max-height: {height}; max-width: {width}" on:close={closeDialog}>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div>
			<div class="dialog-content">

				<!-- dialog controls -->
				<div class="row dialog-controls">
					<div class="col-lg-8 col-md-9 col-sm-12">
						<button class="button-close" on:click={() => dialogElement.close()}><i class="bi bi-x-lg"></i></button>
					</div>

					<div class="col-lg-4 col-md-3 col-sm-12">
						<!-- controls for text section or leave empty -->
					</div>
				</div>

				<!-- display content -->
				<div class="row display-content">
					<svelte:component this={modalDisplay} data={modalData} on:close={closeDialog} />
				</div>
			</div>
		</div>
	</dialog>
</div>

<style>
    .modal-dialog-window {
		height: 100vh;
		width: 100%;
		/* height: 100%; */
	}

	:global(.modal-dialog-window .caption) {
		display: none;
	}

	/* dialog control buttons/openseadragon buttons */
	:global(.modal-dialog-window .dialog-controls button, .modal-dialog-window .controls > button) {
		width: 40px;
		height: 40px;
	}
	:global(.modal-dialog-window .dialog-controls button > i, .modal-dialog-window .controls > button > i) {
		bottom: 1px;
    	position: relative;
	}
	/* End dialog control buttons/openseadragon buttons */

    .dialog-content {
		height: 100%;
		overflow-y: scroll;
	}

	.dialog-controls {
		height: 50px;
	}

	.display-content {
		/* height: calc(50% - 50px); */
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
		height: 40px;
	}

	/* begin responsive breakpoints: small mobile devices/phones first ^ */
    @media screen and (min-width: 480px) {
        /* start of portrait tablet styles */

    }

    @media screen and (min-width: 768px) {
        /* start of landscape/large tablet styles */

    }

    @media screen and (min-width: 992px) {
        /* start of large tablet styles */

    }

    @media screen and (min-width: 1280px) {
        /* start of medium/large desktop styles */
		.display-content {
			height: calc(100% - 50px);
		}
    }

    @media screen and (min-width: 1920px) {
        /* start of extra large desktop styles */

    }
</style>