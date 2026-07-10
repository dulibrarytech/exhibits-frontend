<script>
    import Item_Viewer from '../../templates/partials/Item_Viewer.svelte';

    // test_items
    // ['IMAGE', 'IMAGE_REPO', 'AUDIO', 'AUDIO_REPO', 'VIDEO', 'VIDEO_REPO', 'PDF', 'PDF_REPO']
    import {test_items} from '../data/items.js';

    let data = test_items["PDF"];

    let args = {}
</script>

<div class="test">
    <Item_Viewer {args} item={data} />
</div>