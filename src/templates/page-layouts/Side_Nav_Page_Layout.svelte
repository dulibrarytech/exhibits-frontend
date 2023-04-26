<!-- Requires bootstrap 5x -->
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
        <div class="container-fluid">
            <div id="sidebar-container" class="row flex-nowrap">
                <div class="col-auto">
                <!-- <div class="col-md-2 px-2"> -->
                    <div id="sidebar" class="collapse collapse-horizontal show border-end">
                        <Navigation_Side {sections} />
                    </div>
                </div>

                <div class="col ps-md-2 pt-2">
                    <a id="menu-toggle" href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" class="border rounded-3 p-1 text-decoration-none"><i class="bi bi-list bi-lg py-2 p-1"></i>MM</a>
                    <div class="exhibit-template-wrapper">
                        <svelte:component this={template} {sections} {items} />
                    </div>
                </div>
            </div>
        </div>

    {:else}
        <h3>Loading template...</h3>
    {/if}
</div>

<style>
    .exhibit-template-wrapper {
        padding-left: 3.2em;
        padding-right: 3.2em;
    }

    #sidebar-container {
        display: block;
    }

    #sidebar-container > div {
        padding-right: 0;
        padding-left: 0;
    }

    #sidebar {
        position: sticky;
        top: 0;
        background: #e5e3e1;
        padding: 1.4em;
    }

    #menu-toggle {
        position: sticky;
        top: 7px;
    }
    
    /* Navigation_Side subcomponent width */
    :global(#sidebar-nav) {
        margin-bottom: 0;
        width: 100%;
    }
    
    :global(#sidebar-nav a) {
        margin-bottom: 0.9em;
        color: initial;
    }

    @media (min-width: 768px) {
        #sidebar-container {
            display: flex;
        }

        :global(#sidebar-nav) {
            margin-bottom: 0.7em;
            width: 225px;
        }
    }
</style>