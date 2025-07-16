<script>
    import Repository_Related_Items from '../../components/Repository_Related_Items.svelte';
    import {test_data} from '../data/related-repo-items.js';

    console.log(test_data)
</script>

<div class="test">
    <Repository_Related_Items items={test_data} />
</div>