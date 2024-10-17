<script>
    import IIIF_Item from '../../components/IIIF_Item.svelte';

    // test_data = {
    // "A": {
    //     args: {
    //         metadata: test_metadata
    //     },
    //     item: {} // exhibit item
    // }
    // test_metadata = {
    //     "title": "Test Title",
    //     "uri": "{handle}",
    //     "identifiers": [
    //         {
    //             "type": "local",
    //             "identifier": "M123.45.00006"
    //         }
    //     ],
    //     "resource_type": "sound recording nonmusical",
    //     "dates": [
    //         {
    //             "encoding": "w3cdtf",
    //             "label": "creation",
    //             "type": "single",
    //             "expression": "1999 August 5",
    //             "begin": "1999-08-05"
    //         },
    //         {
    //             "encoding": "w3cdtf",
    //             "label": "creation",
    //             "type": "single",
    //             "expression": "2003",
    //             "begin": "2003"
    //         }
    //     ]
    // }
    import {test_data} from '../data/iiif-item.js';

    const TEST = "E";

    let data = test_data[TEST];
</script>

<div class="test">
    <IIIF_Item args={data.args} item={data.item} />
</div>

<style>
    .test {
        width: 100%;
    }
</style>