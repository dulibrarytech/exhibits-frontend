<script>
    'use-strict'

    import { onMount } from 'svelte';

    const init = () => {
        console.log("TEST init whats on page")
    }

    onMount(async () => {
        init();
    });
</script>

<div class="whats-on page">
    <div class="container">
        <h3>What's On</h3>
    </div>
</div>

<style>
    
</style>