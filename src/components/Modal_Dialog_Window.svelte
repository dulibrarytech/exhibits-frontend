<script>
    import { onMount } from 'svelte';
	import {createEventDispatcher} from 'svelte';

    export let modalDisplay = null;
    export let modalData = null;

    let dialog; // HTMLDialogElement

    const dispatch = createEventDispatcher();

    const render = () => {
		if (dialog && modalData) {
            dialog.showModal();
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
	}

    .dialog-content {
		height: 100%;
	}

	.dialog-controls {
		height: 6%;
	}

	.display-content {
		height: 94%;
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
		top: 4px;
		left: 8px;
	}
</style>