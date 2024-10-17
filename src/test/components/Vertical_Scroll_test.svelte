<script>
    import Vertical_Scroll from '../../templates/Template_Vertical_Scroll.svelte';

    // test_data = exhibit items []
    import {test_data} from '../data/vertical-scroll.js';
</script>

<div class="test">
    <Vertical_Scroll items={test_data} on:click-item={() => console.log("Clicked item")}/>
</div>