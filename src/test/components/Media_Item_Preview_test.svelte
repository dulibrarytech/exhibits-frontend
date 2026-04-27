<script>
    import Media_Item_Preview from '../../components/Media_Item_Preview.svelte';

    import {test_data} from '../data/media-item-preview.js';

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
    const TEST = "A";
    let data = test_data[TEST];
</script>

<div class="test">
    <Media_Item_Preview args={data.args} item={data.item} />
</div>

<style>
    .test {
        width: 400px;
        height: 400px;
    }
</style>