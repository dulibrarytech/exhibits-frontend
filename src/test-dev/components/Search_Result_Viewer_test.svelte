<script>
    import Search_Result_Viewer from '../../templates/partials/search-result-viewer/Search_Result_Viewer.svelte';

    // test_items
    // ['IMAGE', 'IMAGE_REPO', 'AUDIO', 'AUDIO_REPO', 'VIDEO', 'VIDEO_REPO', 'PDF', 'PDF_REPO', 'EXHIBIT']
    import {test_items} from '../data/items.js';

    let data = test_items["IMAGE"];

    let args = {
      totalResults: 5,
      resultIndex: 0,
    }
</script>

<div class="test">
    <Search_Result_Viewer {args} item={data} />
</div>

<style>
  .test {
    /* emulate the component in the modal dialog window dimensions/position */
    margin-inline: auto;
    width: 80%;
    height: 80vh;
  }
</style>