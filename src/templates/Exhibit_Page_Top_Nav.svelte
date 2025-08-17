<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
        
    import Hero from '../components/Hero.svelte';
    import Navigation_Top from '../components/Navigation_Top.svelte';
    import Exhibit_Introduction from './partials/Exhibit_Introduction.svelte';
    import Exhibit_Thank_You from './partials/Exhibit_Thank_You.svelte';
    import Repository_Related_Items from '../components/Repository_Related_Items.svelte';
    import Alert from '../components/Exhibit_Alert.svelte';

    export let args = {};
    export let template = null;
    export let sections = [];
    export let items = null;
    export let styles = null;

    export let data = {};

    let pageElement;
    let scrollToPageTopElement;

    let renderTemplate = false;
    let templateMessage = null;
    let exhibitData = {};
    let alert = null;

    $: {
        exhibitData = data;
        alert = exhibitData.alert_text || null;
    }

    const dispatch = createEventDispatcher();

    const setTheme = (styles) => {
        if(pageElement) {
            Object.assign(pageElement.style, styles);
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

    export const navigateToItemId = (anchorId, scrollType = 'smooth') => {  
        let navbarHeight = document.querySelector(".navigation-page-section").offsetHeight;
        let anchorOffset = document.getElementById(anchorId).offsetTop;
        let scrollOffset = (navbarHeight / 2) + anchorOffset;

		window.scrollTo({
			top: scrollOffset,
			behavior: scrollType
		});
    }

    const onMountItems = () => {
        if(styles.template) setTheme(styles.template);
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

        if(scrollToPageTopElement) scrollToPageTopElement.style.display = "none";
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

<div class="exhibit-page" style="position: relative">

    <div class="exhibit-content" bind:this={pageElement}>
        <div class="hero-page-section">
            <Hero data={exhibitData} {styles} />
        </div>
        
        <div class="navigation-page-section sticky-top">
            <Navigation_Top {sections} styles={styles?.navigation || null} on:click-nav-link={onClickNavigationLink} />
        </div>

        {#if exhibitData.description}
            <Exhibit_Introduction content={exhibitData.description} styles={styles?.introduction || null} /> 
        {/if}

        {#if alert}
            <div class="alert-section">
                <Alert text={alert} />
            </div>
        {/if}

        {#if renderTemplate}
            <svelte:component this={template} {items} {styles} {args} on:click-item on:mount-items={onMountItems} />
        {:else if templateMessage}
            <div class="template-message"><h3>{templateMessage}</h3></div>
        {/if}
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
    .exhibit-content {
        color: var(--theme-exhibit-font-color);
        font-family: var(--theme-exhibit-font-family);
        font-size: var(--theme-exhibit-font-size);
        background-color: var(--theme-exhibit-background-color)
    }

    .alert-section {
        font-family: var(--theme-site-font-family);
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
</style>