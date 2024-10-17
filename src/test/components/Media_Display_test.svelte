<script>
    import Media_Display from '../../components/Media_Display.svelte';

    // test_data = {
    //     "repo_source__small-image__no_iiif": {}, // exhibit item
    //     "repo_source__small-image__is_iiif": {},
    //     "repo_source__large-image__no_iiif": {},
    //     "repo_source__large-image__is_iiif": {},
    //     "user_source__small-image__remote-url": {},
    //     "user_source__small-image__local-file": {},
    //     "user_source__large-image__remote-url": {},
    //     "user_source__large-image__local-file": {}
    // }
    import {test_data} from '../data/media-display.js';

    let TEST_ITEM = "user_source__small-image__local-file";

    let args = {
        isTileImage: true
    }

</script>

<div class="test">
    <Media_Display item={test_data[TEST_ITEM]} {args} />
</div>
