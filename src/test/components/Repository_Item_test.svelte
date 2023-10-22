<script>
    import Repository_Item from '../../components/Repository_Item.svelte';
    import {tests} from '../data/repository-item.js';

    const TEST = "A";

    let data = tests[TEST];
</script>

<div class="test">
    <Repository_Item args={data.args} item={data.item} />
</div>