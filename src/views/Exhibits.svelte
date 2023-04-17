<script>
    import { onMount } from 'svelte';
    import { Index } from '../libs/index.js';

    var exhibits = [];

    const init = async () => {
        const data = await Index.getExhibits();

        if(data.length > 0) {
            exhibits = data;
        }
        else console.log("No exhibits found.");
    }

    onMount(async () => {
        init();
    });
</script>

<div class="exhibits">
    <h3>Exhibits</h3>

    <h3>Select an exhibit</h3>
    {#each exhibits as {uuid, title}}
        <a href="/exhibit/{uuid}">{title}</a>
    {/each}
</div>

<style>
    
</style>