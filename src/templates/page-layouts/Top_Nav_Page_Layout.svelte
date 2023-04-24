<script>
    import Hero from '../Hero.svelte';
    import Navigation_Top from '../Navigation_Top.svelte';

    export let data = {};
    export let template = null;
    export let sections = [];
    export let items = [];
</script>

<div class="exhibit-page">
    {#if template}
        <Hero {data} />
        <Navigation_Top {sections} />
        
        <svelte:component this={template} {sections} {items} />
    {:else}
        <h3>Loading template...</h3>
    {/if}
</div>