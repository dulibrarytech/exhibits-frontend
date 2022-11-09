<script>
    import { onMount } from 'svelte';
    import { index } from '../libs/elastic-index.js';

    var exhibits = [];

    const init = async () => {
        const data = await index.getAllExhibits();

        if(data.length > 0) {
            exhibits = data;
        }
        console.log("Exhibits:", exhibits);
    }

    onMount(async () => {
        init();
    });
</script>

<div id="exhibits">
    <h3>Exhibits</h3>

    <h3>Select an exhibit</h3>
    {#each exhibits as {uuid, title}}
        <a href="/exhibit/{uuid}">{title}</a>
    {/each}

    <!-- Grid -->
</div>

<style>
    
</style>