<script>
    'use-strict'

    import { onMount } from 'svelte';

    const init = () => {
        console.log("TEST init student curated page")
    }

    onMount(async () => {
        init();
    });
</script>

<div class="student-curated page">
    <div class="container">
        <h3>Student Curated</h3>
    </div>
</div>

<style>
    
</style>