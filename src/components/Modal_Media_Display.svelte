<script>
    import {createEventDispatcher} from 'svelte';
    import Media_Display from './Media_Display.svelte';
	import Text_Display from './Text_Display.svelte';

    export let item = null;

    const dispatch = createEventDispatcher();

	let dialog; // HTMLDialogElement

	$: if (dialog && item) dialog.showModal();

    const closeDialog = () => {
        dispatch('close', {});
    }
</script>

<div class="modal-item-viewer">
	<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
	<dialog bind:this={dialog} on:close={closeDialog}>

		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div>
			<div class="modal-menu">
				<!-- svelte-ignore a11y-autofocus -->
				<button on:click={() => dialog.close()}>close</button>
			</div>

			<div class="modal-content" >
				<Media_Display {item} args={{isTileImage: true}}/>
				<Text_Display {item} />
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
	}

	.modal-content {
		background: #3C4043;
		border: none;
		height: 86vh;
    	overflow-y: scroll;
	}

	:global(.modal-item-viewer .media-item) {
		width: 100%;
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

	dialog {
		width: 85%;
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
</style>
