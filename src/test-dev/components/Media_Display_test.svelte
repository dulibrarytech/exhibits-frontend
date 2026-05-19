<script>
    import Media_Display from '../../components/Media_Display.svelte';

    // test_items
    // ['IMAGE', 'IMAGE_REPO', 'AUDIO', 'AUDIO_REPO', 'VIDEO', 'VIDEO_REPO', 'PDF', 'PDF_REPO']
    import {test_items} from '../data/items.js';
    let data = test_items["PDF"];

    let args = {
        isTileImage: true
    }

</script>

<div class="test">
    <Media_Display item={data} args={args} />
</div>
