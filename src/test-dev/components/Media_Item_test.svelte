<script>
    import Media_Item from '../../components/Media_Item.svelte';

    // test_items
    // ['IMAGE', 'IMAGE_REPO', 'AUDIO', 'AUDIO_REPO', 'VIDEO', 'VIDEO_REPO', 'PDF', 'PDF_REPO']
    import {test_items} from '../data/items.js';

    let data = test_items["LARGE_IMAGE"];

    let args = {
        type: "",
        url: "",
        viewerType: "iiif", // ['static', 'interactive', 'iiif']
        isEmbedded: false,
    }
</script>

<div class="test">
    <Media_Item {args} item={data} />
</div>