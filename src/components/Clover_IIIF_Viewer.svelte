<svelte:head>
  <script src="https://www.unpkg.com/@samvera/clover-iiif@latest/dist/web-components/index.umd.js"></script>
</svelte:head>

<script>
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

  export let manifestUrl = "";

  const dispatch = createEventDispatcher();

  const onLoadViewer = (event) => {
    dispatch('loaded', {});
  }

  onMount(() => {
    onLoadViewer();
  });
</script>

<div class="clover-iiif-viewer">

  <h1>Clover IIIF Viewer</h1>

  <clover-viewer id={manifestUrl} options={"{}"} ></clover-viewer>
  
</div>

<style>
  .clover-iiif-viewer {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    background: #f9f9f9;
  }

  h1 {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    color: #555;
  }
</style>
