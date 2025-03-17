<!-- Requires bootstrap 5x -->
<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    import Hero from '../components/Hero.svelte';
    import Navigation_Side from '../components/Navigation_Side.svelte';
    import Exhibit_Introduction from './partials/Exhibit_Introduction.svelte';
    import Exhibit_Thank_You from './partials/Exhibit_Thank_You.svelte';
    import Repository_Related_Items from '../components/Repository_Related_Items.svelte';
    import Alert from '../components/Alert.svelte';

    export let data = {};
    export let template = null;
    export let sections = [];
    export let items = [];
    export let styles = null;

    export let args = {};

    let pageElement;
    let sidebarElement;
    let scrollToPageTopElement;

    let renderTemplate = false;
    let templateMessage = null;
    let alert = null;

    $: {
        alert = data.alert_text || null;
    }

    let menuButtonDisplay = "none";

    const dispatch = createEventDispatcher();

    const toggleMenuButtonDisplay = () => {
        menuButtonDisplay = menuButtonDisplay == "none" ? "inline" : "none";
    }

    const setTheme = ({navigation = null, template = null}) => {   
        if(pageElement && template) {
            Object.assign(pageElement.style, template);
        }

        if(sidebarElement && navigation) {
            Object.assign(sidebarElement.style, navigation);
        }
    }

    const scrollToPageTop = () => {
        window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
    }

    const onClickNavigationLink = (event) => {
		let anchorId = event.detail.anchorId;
        navigateToItemId(anchorId);
    }

    export const navigateToItemId = (anchorId, topOffset = 0) => {
        let anchor = document.getElementById(anchorId);
        let anchorOffset = anchor.offsetTop;

		window.scrollTo({
			top: topOffset + anchorOffset,
			behavior: 'smooth'
		});

        anchor.setAttribute('tabindex', 0)
        anchor.focus();
    }

    const onMountItems = () => {
        if(styles) setTheme(styles);
        let anchorId = location.hash?.replace('#', '') || false;
        if(anchorId) navigateToItemId(anchorId);
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

        scrollToPageTopElement.style.display = "none";
    });

    window.onscroll = function() {

        if(window.scrollY > 500) {
            if(scrollToPageTopElement?.style.display == "none") scrollToPageTopElement.style.display = "block";
        }
        else {
            if(scrollToPageTopElement?.style.display == "block") scrollToPageTopElement.style.display = "none";
        }
    };
</script>

<div class="exhibit-page" bind:this={pageElement}>
    <div class="hero-page-section">
        <Hero {data} {styles} />
    </div>
    
    {#if data.description}
        <Exhibit_Introduction content={data.description} styles={styles?.inroduction || null} />
    {/if}

    {#if alert }
        <Alert text={alert} />
    {/if}

    <!-- sidebar section for navigation -->
    <div class="container-fluid">
        <div id="sidebar-container" class="row flex-nowrap">
            <div class="col-auto">
                <div id="sidebar" class="exhibit-navigation collapse collapse-horizontal show border-end" bind:this={sidebarElement}>
                    <Navigation_Side {sections} styles={styles?.navigation || null} on:click-nav-link={onClickNavigationLink} />

                    <a id="menu-close" href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" class=" p-1 text-decoration-none" on:click={toggleMenuButtonDisplay} style="text-align: left"><i class="bi bi-chevron-left"></i></a>
                </div>
            </div>

            <div class="col">
                <a id="menu-toggle" href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" class="border rounded-3 p-1 text-decoration-none" style="display: {menuButtonDisplay};" on:click={toggleMenuButtonDisplay} ><i class="bi bi-list"></i></a>
                
                {#if renderTemplate}
                    <svelte:component this={template} {items} {styles} {args} on:click-item on:mount-items={onMountItems} />
                {:else if templateMessage}
                    <div class="template-message"><h3>{templateMessage}</h3></div>
                {/if}
            </div>
        </div>
    </div>

    <Exhibit_Thank_You />

    <Repository_Related_Items {items} />

    <div class="scrollto-page-top" bind:this={scrollToPageTopElement}>
        <a href on:click|preventDefault={scrollToPageTop} title="Return to top of exhibit" aria-label="Return to top of exhibit">
            <i class="bi bi-chevron-up"></i>
        </a>
    </div>
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

    .scrollto-page-top {
        position: fixed;
        right: 0.21em;
        bottom: 0.21em;
        font-size: 2em;
    }

    .scrollto-page-top > a {
        background-color: darkgray;
        color: white;
        padding-left: 0.15em;
        padding-right: 0.15em;
        padding-bottom: 0.1em;
        border-radius: 30px;
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