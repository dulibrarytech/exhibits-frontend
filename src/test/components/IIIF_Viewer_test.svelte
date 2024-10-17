<script>
    import IIIF_Viewer from '../../components/IIIF_Viewer.svelte';

    // test_data = {
    // "A": {
    //     url: "" // iiif manifest url
    // }
    import {test_data} from '../data/iiif-viewer.js';

    let data = test_data["E"];
</script>

<div class="test">
    <IIIF_Viewer url={data.media} />
</div>

<style>
    
</style>
