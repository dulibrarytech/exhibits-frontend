<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { sanitizeHtmlString } from '../libs/data_helpers';
        
    import Hero from '../components/Hero.svelte';
    import Navigation_Top from '../components/Navigation_Top.svelte';
    import Exhibit_Description from './partials/Exhibit_Description.svelte';
    import Exhibit_Thank_You from './partials/Exhibit_Thank_You.svelte';
    import Repository_Related_Items from '../components/Repository_Related_Items.svelte';
    import Alert from '../components/Alert.svelte';

    export let data = null;
    export let template = null;
    export let sections = [];
    export let items = null;
    export let styles = null;

    export let args = {};

    let pageElement;
    let scrollToPageTopElement;

    let renderTemplate = false;
    let templateMessage = null;
    let alert = null;

    let {alert_text = null} = data;
    if(alert_text) alert = sanitizeHtmlString(alert_text);

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
        let topOffset = event.detail.offset;
        navigateToItemId(anchorId, topOffset);
    }

    export const navigateToItemId = (anchorId, topOffset = 0) => {
        let anchor = document.getElementById(anchorId);
        let anchorOffset = anchor.offsetTop;

		window.scrollTo({
			top: topOffset + anchorOffset,
			behavior: 'smooth'
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

<div class="exhibit-page" bind:this={pageElement}  style="position: relative">
    {#if data}
        <div class="hero-page-section">
            <Hero {data} {styles} />
        </div>
        
        <div class="navigation-page-section sticky-top">
            <Navigation_Top {sections} styles={styles?.navigation || null} on:click-nav-link={onClickNavigationLink} />
        </div>

        {#if data.description}
            <div class="description-page-section">
                <Exhibit_Description content={data.description} styles={styles?.template || null} /> 
            </div>
        {/if}

        {#if alert }
            <Alert text={alert} />
        {/if}

        {#if renderTemplate}
            <svelte:component this={template} {items} {styles} {args} on:click-item on:mount-items={onMountItems} /> <!-- SIDENAV --> 
        {:else if templateMessage}
            <div class="template-message"><h3>{templateMessage}</h3></div>
        {/if}

        <Exhibit_Thank_You />

        <Repository_Related_Items {items} />

        <div class="scrollto-page-top" bind:this={scrollToPageTopElement}>
            <a href on:click|preventDefault={scrollToPageTop} title="Return to top of exhibit">
                <i class="bi bi-chevron-up"></i>
            </a>
        </div>
            
    {:else}
        <h3>Loading template...</h3>
    {/if}
</div>

<style>
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