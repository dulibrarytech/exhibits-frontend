<script>
    import IIIF_Viewer from '../../components/IIIF_Viewer.svelte';

    // test_items
    // ['IMAGE', 'IMAGE_REPO', 'AUDIO', 'AUDIO_REPO', 'VIDEO', 'VIDEO_REPO', 'PDF', 'PDF_REPO']
    import {test_items} from '../data/items.js';

    let data = test_items["PDF_REPO"];
</script>

<div class="test">
    <IIIF_Viewer manifestUrl={data.media_iiif.manifest_url} />
</div>

<style>
    
</style>
