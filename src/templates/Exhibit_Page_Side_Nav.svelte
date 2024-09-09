<!-- Requires bootstrap 5x -->
<script>
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';

    import Hero from '../components/Hero.svelte';
    import Navigation_Side from '../components/Navigation_Side.svelte';
    import Exhibit_Description from './partials/Exhibit_Description.svelte';
    import Exhibit_Thank_You from './partials/Exhibit_Thank_You.svelte';
    import Repository_Related_Items from '../components/Repository_Related_Items.svelte';

    export let data = {};
    export let template = null;
    export let sections = [];
    export let items = [];
    export let styles = null;

    export let args = {};

    let navigationMenu;
    let pageElement;
    let exhibitThankYouSectionElement;
    let repositoryRelatedItemsSectionElement;
    let menuButtonDisplay = "none";
    let renderTemplate = false;
    let templateMessage = null;

    const dispatch = createEventDispatcher();

    const setTheme = (styles) => {   
        if(pageElement) {
            Object.assign(pageElement.style, template);

            if(styles.backgroundColor) {
                // assign related items section bg to template bg color
                exhibitThankYouSectionElement.style.backgroundColor = styles.backgroundColor;

                // assign 'thanks for visiting' section bg to template bg color
                repositoryRelatedItemsSectionElement.style.backgroundColor = styles.backgroundColor;
            }
        }
        // if(navigation?.menu) {
        //     Object.assign(navigationSidebarElement.style, navigation.menu);
        // }
    }

    const toggleMenuButtonDisplay = () => {
        menuButtonDisplay = menuButtonDisplay == "none" ? "inline" : "none";
    }

    const onMountItems = () => {
        if(styles.template) setTheme(styles.template);

        let anchorId = location.hash?.replace('#', '') || false;
        if(anchorId) navigationMenu.navigateTo(anchorId);

        dispatch('mount-items', {});
    }

    onMount(async () => {
        if(items.length > 0) {
            renderTemplate = true;
            dispatch('mount', {});
        }
        else {
            templateMessage = "No items found";
            dispatch('mount-items', {});
        }
    });
</script>

<div class="exhibit-page" bind:this={pageElement}>
    {#if template}
        <Hero {data} {styles} />

        {#if data.description}
            <Exhibit_Description content={data.description} styles={styles?.template || null} />
        {/if}

        <!-- sidebar section for navigation -->
        <div class="container-fluid">
            <div id="sidebar-container" class="row flex-nowrap">
                <div class="col-auto"> <!-- TODO set to exhibit bg color? -->
                    <div id="sidebar" class="exhibit-navigation collapse collapse-horizontal show border-end">
                        <Navigation_Side bind:this={navigationMenu} {sections} styles={styles?.navigation || null} />

                        <a id="menu-close" href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" class=" p-1 text-decoration-none" on:click={toggleMenuButtonDisplay} style="text-align: left"><i class="bi bi-chevron-left"></i></a>
                    </div>
                </div>

                <div class="col">
                    <a id="menu-toggle" href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" class="border rounded-3 p-1 text-decoration-none" style="display: {menuButtonDisplay};" on:click={toggleMenuButtonDisplay} ><i class="bi bi-list"></i></a>
                    
                    <!-- <svelte:component this={template} {sections} {items} {args} {styles} on:click-item on:mount-items={onMountItems} /> -->
                    {#if renderTemplate}
                        <svelte:component this={template} {items} {styles} {args} on:click-item on:mount-items={onMountItems} />
                    {:else if templateMessage}
                        <div class="template-message"><h3>{templateMessage}</h3></div>
                    {/if}
                </div>
            </div>
        </div>

        <div bind:this={exhibitThankYouSectionElement}>
            <Exhibit_Thank_You />
        </div>

        <div bind:this={repositoryRelatedItemsSectionElement}>
            <Repository_Related_Items {items} />
        </div>

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

    .template-message {
        background-color: #b8e6bf;
        padding: 50px;
        text-align: center;
        color: black;
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