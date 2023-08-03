<script>
    import {createEventDispatcher} from 'svelte';
    import Media_Display from './Media_Display.svelte';

    export let item = null;

    const dispatch = createEventDispatcher();

	let dialog; // HTMLDialogElement

	$: if (dialog && item) dialog.showModal();

    const closeDialog = () => {
        dispatch('close', {});
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={closeDialog}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>

        Media_Display
        <!-- <Media_Display {item} /> -->

		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>close modal</button>
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
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
