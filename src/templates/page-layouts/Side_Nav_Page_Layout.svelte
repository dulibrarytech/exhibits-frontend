<script>
    import Hero from '../Hero.svelte';
    import Navigation_Side from '../Navigation_Side.svelte';

    export let data = {};
    export let template = null;
    export let sections = [];
    export let items = [];
</script>

<div class="exhibit-page">
    {#if template}
        <Hero {data} />

        <div id="wrapper">
            <div id="sidebar-wrapper">
                <Navigation_Side {sections} />
            </div>

            <div id="page-content-wrapper">
                <div class="container-fluid">
                    <svelte:component this={template} {sections} {items} />
                </div>
            </div>
        </div>
    {:else}
        <h3>Loading template...</h3>
    {/if}
</div>