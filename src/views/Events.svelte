<script>
    'use-strict'

    import { onMount } from 'svelte';

    const init = () => {
        console.log("TEST init events page")
    }

    onMount(async () => {
        init();
    });
</script>

<div class="events page">
    <div class="container">
        <div class="page-content">
            <h3>Events</h3>
        </div>
    </div>
</div>

<style>

</style>