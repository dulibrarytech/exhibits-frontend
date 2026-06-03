<script>
    import Exhibit from '../../views/Exhibit.svelte';

    let currentRoute = { // mimic the svelte 'currentRoute' object
        namedParams: {
            id: "1" // exhibit uuid
        }
    }
</script>

<div class="test">
    <Exhibit {currentRoute} />
</div>