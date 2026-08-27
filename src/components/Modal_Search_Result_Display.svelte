<script>
  import Search_Result_Viewer from '../templates/partials/search-result-viewer/Search_Result_Viewer.svelte';

  export let data = {};
  export let args = {};
</script>

<div class="modal-search-result-display">
  <Search_Result_Viewer item={data} {args} />
</div>

<style>
  .modal-search-result-display {
    height: 100%;
  }
</style>
