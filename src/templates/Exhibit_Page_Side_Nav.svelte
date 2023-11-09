<!-- Requires bootstrap 5x -->
<script>
    import {createEventDispatcher} from 'svelte';

    import Hero from './Hero.svelte';
    import Navigation_Side from '../components/Navigation_Side.svelte';
    import Exhibit_Description from './partials/Exhibit_Description.svelte';

    export let data = {};
    export let template = null;
    export let sections = [];
    export let items = [];
    export let styles = null;

    export let args = {};

    const dispatch = createEventDispatcher();

    let menuButtonDisplay = "none";
    let pageElement;

    const setTheme = ({template = null, heading = null}) => {
        
        // apply user styles to the exhibit page and subcpage subsections
        if(template) {
            for(let style in template) {
                pageElement.style[style] = template[style];
            }

            if(template.backgroundColor) {
                document.querySelector('.exhibit-description').style.backgroundColor = template.backgroundColor;
            }
        }

        // update item title font type to match heading font type
        if(heading?.fontFamily) {
            document.querySelectorAll('.exhibit-page .title-heading').forEach((itemTitle) => {
                itemTitle.style.fontFamily = heading.fontFamily;
            });
        }
    }

    const toggleMenuButtonDisplay = () => {
        menuButtonDisplay = menuButtonDisplay == "none" ? "inline" : "none";
    }

    const onMountTemplate = () => {
        dispatch('mount', {});
        if(styles?.template) setTheme(styles);
    }
</script>

<div class="exhibit-page" bind:this={pageElement}>
    {#if template}
        <Hero {data} />

        {#if data.description}
            <Exhibit_Description content={data.description} /> <!-- ** if not required, put it back in the banner, remove this template ** -->
        {/if}

        <!-- sidebar section for navigation -->
        <div class="container-fluid">
            <div id="sidebar-container" class="row flex-nowrap">
                <div class="col-auto"> <!-- TODO set to exhibit bg color? -->
                    <div id="sidebar" class="exhibit-navigation collapse collapse-horizontal show border-end">
                        <Navigation_Side {sections} />

                        <a id="menu-close" href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" class=" p-1 text-decoration-none" on:click={toggleMenuButtonDisplay} ><i class="bi bi-chevron-left"></i></a>
                    </div>
                </div>

                <div class="col">
                    <a id="menu-toggle" href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" class="border rounded-3 p-1 text-decoration-none" style="display: {menuButtonDisplay}" on:click={toggleMenuButtonDisplay} ><i class="bi bi-list"></i></a>
                    
                    <svelte:component this={template} {sections} {items} {args} on:mount={onMountTemplate}/>
                </div>
            </div>
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
        color: #757575;
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
        color: #757575;
    }

    @media (min-width: 768px) {
        #menu-toggle {
            color: #757575;
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