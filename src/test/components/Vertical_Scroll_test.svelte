<script>
    import Vertical_Scroll from '../../templates/Vertical_Scroll.svelte';

    import {data} from '../data/vertical-scroll.js';
</script>

<div class="test">
    <Vertical_Scroll items={data} on:click-item={() => console.log("Clicked item")}/>
</div>