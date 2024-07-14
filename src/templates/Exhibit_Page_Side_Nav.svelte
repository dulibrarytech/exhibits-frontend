<!-- Requires bootstrap 5x -->
<script>
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';

    import Hero from './Hero.svelte';
    import Navigation_Side from '../components/Navigation_Side.svelte';
    import Exhibit_Description from './partials/Exhibit_Description.svelte';
    import Exhibit_Thank_You from './partials/Exhibit_Thank_You.svelte';

    export let data = {};
    export let template = null;
    export let sections = [];
    export let items = [];
    export let styles = null;

    export let args = {};

    let menuButtonDisplay = "none";
    let pageElement;
    let navigationSidebarElement;

    const dispatch = createEventDispatcher();

    const setTheme = ({template=null, navigation=null}) => {   
        if(template) {
            Object.assign(pageElement.style, template);
        }
        if(navigation?.menu) {
            Object.assign(navigationSidebarElement.style, navigation.menu);
        }
    }

    const toggleMenuButtonDisplay = () => {
        menuButtonDisplay = menuButtonDisplay == "none" ? "inline" : "none";
    }

    const onMountItems = () => {
        if(styles) setTheme(styles); // pass in styles, separate templ/menu in f()
    }

    onMount(async () => {
        dispatch('mount', {});
    });
</script>

<div class="exhibit-page" bind:this={pageElement}>
    {#if template}
        <Hero {data} {styles} />

        {#if data.description}
            <Exhibit_Description content={data.description} /> <!-- ** if not required, put it back in the banner, remove this template ** -->
        {/if}

        <!-- sidebar section for navigation -->
        <div class="container-fluid">
            <div id="sidebar-container" class="row flex-nowrap">
                <div class="col-auto"> <!-- TODO set to exhibit bg color? -->
                    <div id="sidebar" bind:this={navigationSidebarElement} class="exhibit-navigation collapse collapse-horizontal show border-end">
                        <Navigation_Side {sections} styles={styles?.navigation || null} />

                        <a id="menu-close" href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" class=" p-1 text-decoration-none" on:click={toggleMenuButtonDisplay} style="text-align: left"><i class="bi bi-chevron-left"></i></a>
                    </div>
                </div>

                <div class="col">
                    <a id="menu-toggle" href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" class="border rounded-3 p-1 text-decoration-none" style="display: {menuButtonDisplay};" on:click={toggleMenuButtonDisplay} ><i class="bi bi-list"></i></a>
                    
                    <svelte:component this={template} {sections} {items} {args} {styles} on:click-item on:mount-items={onMountItems} />
                </div>
            </div>
        </div>

        <Exhibit_Thank_You />

    {:else}
        <h3>Loading template...</h3>
    {/if}
</div>

<style>
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
        padding: 25px;
    }

    #menu-toggle {
        position: sticky;
        top: 7px;
        left: 7px;
        background: white;
    }

    #menu-close {
        color: inherit;
        font-size: 1.7em;
        padding: 0px;
        margin-left: -8px;
    }
    
    /* Navigation_Side subcomponent width */
    :global(#sidebar-nav) {
        margin-bottom: 0;
        width: 100%;
    }
    
    :global(#sidebar-nav a) {
        margin-bottom: 0.9em;
        color: inherit;
    }

    @media (min-width: 768px) {
        #menu-toggle {
            color: inherit;
            font-size: 1.7em;
        }
    
        #sidebar-container {
            display: flex;
        }

        #sidebar {
            padding: 30px 10px 10px 10px;
        }

        :global(#sidebar-nav) {
            margin-bottom: 0.7em;
            width: 320px;
        }

        :global(#sidebar-nav a) {
            margin-bottom: 0.9em;
            padding: 6px;
        }
    }
</style>