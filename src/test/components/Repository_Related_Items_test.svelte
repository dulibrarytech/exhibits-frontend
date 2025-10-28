<script>
    import Repository_Related_Items from '../../components/Repository_Related_Items.svelte';
    import {test_data} from '../data/related-repo-items.js';

    console.log(test_data)
</script>

<div class="test">
    <Repository_Related_Items exhibitId={"bea561ce-5746-4adb-b7d2-b9f997fbcd37"} items={test_data} />
</div>