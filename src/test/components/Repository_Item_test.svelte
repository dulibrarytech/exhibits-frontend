<script>
    import Repository_Item from '../../components/Repository_Item.svelte';
    import {test_data} from '../data/repository-item.js';

    const TEST = "A";

    // test_data = {
    //      "A": {} // exhibit item
    // }
    let data = test_data[TEST];
</script>

<div class="test">
    <Repository_Item args={data.args} item={data.item} />
</div>