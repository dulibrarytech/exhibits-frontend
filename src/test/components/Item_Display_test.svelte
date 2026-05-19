<script>
    import Item_Display from '../../components/Item_Display.svelte';
    import Item from '../../templates/partials/Item.svelte';
    import Item_Viewer from '../../templates/partials/Item_Viewer.svelte';

    // test_items
    // ['IMAGE', 'IMAGE_REPO', 'AUDIO', 'AUDIO_REPO', 'VIDEO', 'VIDEO_REPO', 'PDF', 'PDF_REPO']
    import {test_items} from '../data/items.js';

    let data = test_items["PDF"];

    data.media_iiif = null;
    data.is_embedded = 0; // not used in item_viewer

    let args = {
      useThumbnailPreview: false,
    }

    let templates = [Item, Item_Viewer];
    let template = templates[0];
</script>

<div class="test">
    <Item_Display {args} item={data} template={template} />
</div>