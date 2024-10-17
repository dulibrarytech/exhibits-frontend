<script>
    import Audio_Player from '../../components/Audio_Player.svelte';

    // test_data = {
    // "A": {
    //     url : "", // to external resource
    //     caption : "Test caption"
    // }
    import {test_data} from '../data/audio-player.js';

    let data = test_data["A"];
</script>

<div class="test">
    <Audio_Player args={data} />
</div>

<style>
    
</style>
