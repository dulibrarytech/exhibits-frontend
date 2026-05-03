<script>
    import Media_Item_Preview from '../../components/Media_Item_Preview.svelte';

    // test_items
    // ['IMAGE', 'IMAGE_REPO', 'AUDIO', 'AUDIO_REPO', 'VIDEO', 'VIDEO_REPO', 'PDF', 'PDF_REPO']
    import {test_items} from '../data/items.js';

    let data = test_items["PDF_REPO"];

    let args = {
        isThumbnail: false,
        isInteractive: false,
        link: null,
        overlay: true,
    }
</script>

<div class="test">
    <Media_Item_Preview {args} item={data} />
</div>

<style>
    .test {
        width: 500px;
        height: 500px;
    }
</style>