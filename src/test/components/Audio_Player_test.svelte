<script>
    import Audio_Player from '../../components/Audio_Player.svelte';

    let tests = {
        "A": {
            // url : "https://specialcollections.du.edu/datastream/416aac52-de61-4c86-b329-32663c355789/object", // digcoll api
            url : "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            caption : "Test caption"
        },
        "B": {
            url : "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            kalturaId : "0_6mf7d2pb",
            caption : "Test caption"
        },
        "C": {
            url : "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            embedCode : '<audio controls="" autoplay="" src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" type="audio/mpeg" class="media-document audio mac"></audio>',
            caption : "Test caption"
        },
        "D": {
            url : "",
            kalturaId : "",
            embedCode : "",
        },
        "E": {
            caption : "Test caption"
        },
        "A": {
            // url : "https://specialcollections.du.edu/datastream/416aac52-de61-4c86-b329-32663c355789/object", // digcoll api
            url : "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            type: "audio/mp3",
            caption : "Test caption"
        },
    }

    let data = tests["A"];
</script>

<div class="test">
    <Audio_Player args={data} />
</div>

<style>
    
</style>
