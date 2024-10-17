<script>
    import Media_Item from '../../components/Media_Item.svelte';

    import {test_data} from '../data/media-item.js';

    // test_data = {
    //     "A": {
    //         args: { // The args override the values found in the exhibit item data object (item{}). Media Item should render with or without args
    //             type: "",
    //             url: "",
    //             isTileImage: true
    //         },
    //         item: {} // exhibit item
    //     }
    // }
    const TEST = "C";

    let data = test_data[TEST];
</script>

<div class="test">
    <Media_Item args={data.args} item={data.item} />
</div>