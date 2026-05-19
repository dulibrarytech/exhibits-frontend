<script>
    import Image_Viewer from '../../components/Image_Viewer.svelte';

    // test_data = {
    // "A": {
    //     url: "",
    //     caption: ""
    // }
    import {test_data} from '../data/image-viewer.js';

    let data = test_data["E"];
</script>

<div class="test">
    <Image_Viewer args={data} />
</div>

<style>
    /* .test {
        width: 49%;
    } */
</style>
