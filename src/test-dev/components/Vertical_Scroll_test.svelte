<script>
    import Vertical_Scroll from '../../templates/Template_Vertical_Scroll.svelte';

    // test_items
    // ['IMAGE', 'IMAGE_REPO', 'AUDIO', 'AUDIO_REPO', 'VIDEO', 'VIDEO_REPO', 'PDF', 'PDF_REPO']
    import {test_items} from '../data/items.js';
    let data = test_items["PDF"];
</script>

<div class="test">
    <Vertical_Scroll items={data} on:click-item={() => console.log("Clicked item")}/>
</div>