<script>
    import { onMount } from 'svelte';
	import {createEventDispatcher} from 'svelte';

    export let modalDisplay = null;
    export let modalData = null;

    let dialogElement;

    const dispatch = createEventDispatcher();

    const render = () => {
		if (dialogElement && modalData) {
            dialogElement.showModal();
        }
	}

    const closeDialog = () => {
        dispatch('close', {});
    }
	
	onMount(async () => {
        render();
    });
</script>

<div class="modal-dialog-window">
	<dialog bind:this={dialogElement} on:close={closeDialog}>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div>
			<div class="dialog-content">

				<!-- dialog controls -->
				<div class="row dialog-controls">
					<div class="col-lg-8 col-md-9 col-sm-12">
						<button class="button-close" type="button" title="Close dialog window" aria-label="Close dialog window" on:click={() => dialogElement.close()}>
							<i class="bi bi-x-lg"></i>
						</button>
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
		width: 100%;
		height: 100%;
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
	}

	.dialog-controls {
		height: 50px;
	}

	.display-content {
		height: 100%;
		overflow-y: scroll;
	}

    dialog {
		width: 100vw;
		height: 100vh;
		max-width: 100vw;
    	max-height: 100vh;

		border-radius: 0.2em;
		border: none;
		padding: 0;
		overflow: hidden;
		background: #e5e3e1;
		margin: 0;
		
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
		dialog {
			width: 98vw;
			height: 98vh;
			max-width: 98vw;
			max-height: 98vh;
			margin: auto;
		}
    }

    @media screen and (min-width: 992px) {
        /* start of large tablet styles */
		.display-content {
			overflow-y: clip;
		}
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