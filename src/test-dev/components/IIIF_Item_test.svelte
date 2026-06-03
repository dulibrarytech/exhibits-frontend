<script>
    import IIIF_Item from '../../components/IIIF_Item.svelte';

    // test_items
    // ['IMAGE', 'IMAGE_REPO', 'AUDIO', 'AUDIO_REPO', 'VIDEO', 'VIDEO_REPO', 'PDF', 'PDF_REPO']
    import {test_items} from '../data/items.js';
    let data = test_items["PDF"];

    // args
    let args = {};
</script>

<div class="test">
    <IIIF_Item args={args} item={data} />
</div>

<style>
    .test {
        width: 100%;
    }
</style>