<script>
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
        
    import Hero from '../components/Hero.svelte';
    import Navigation_Top from '../components/Navigation_Top.svelte';
    import Exhibit_Description from './partials/Exhibit_Description.svelte';
    import Exhibit_Thank_You from './partials/Exhibit_Thank_You.svelte';
    import Repository_Related_Items from '../components/Repository_Related_Items.svelte';

    export let data = null;
    export let template = null;
    export let sections = [];
    export let items = null;
    export let styles = null;

    export let args = {};

    let navigationMenuElement;
    let pageElement;
    let scrollToExhibitTopElement;

    let renderTemplate = false;
    let templateMessage = null;

    const dispatch = createEventDispatcher();

    const setTheme = (styles) => {
        if(pageElement) {
            Object.assign(pageElement.style, styles);
        }
    }

    const onMountItems = () => {
        if(styles.template) setTheme(styles.template);

        let anchorId = location.hash?.replace('#', '') || false;
        if(anchorId) navigationMenuElement.navigateTo(anchorId);

        dispatch('mount-items', {});
    }

    const scrollToExhibitTop = () => {
        window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
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

        scrollToExhibitTopElement.style.display = "none";
    });

    window.onscroll = function() {

        if(window.scrollY > 500) {
            if(scrollToExhibitTopElement.style.display == "none") scrollToExhibitTopElement.style.display = "block";
        }
        else {
            if(scrollToExhibitTopElement.style.display == "block") scrollToExhibitTopElement.style.display = "none";
        }
    };
</script>

<div class="exhibit-page" bind:this={pageElement}  style="position: relative">
    {#if data}
        <Hero {data} {styles} />

        <Navigation_Top bind:this={navigationMenuElement} {sections} styles={styles?.navigation || null} />

        {#if data.description}
            <Exhibit_Description content={data.description} styles={styles?.template || null} />
        {/if}

        {#if renderTemplate}
            <svelte:component this={template} {items} {styles} {args} on:click-item on:mount-items={onMountItems} />
        {:else if templateMessage}
            <div class="template-message"><h3>{templateMessage}</h3></div>
        {/if}

        <Exhibit_Thank_You />

        <Repository_Related_Items {items} />

        <div class="scrollto-exhibit-top" bind:this={scrollToExhibitTopElement}>
            <a href on:click|preventDefault={scrollToExhibitTop} title="Return to top of exhibit">
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

    .scrollto-exhibit-top {
        position: fixed;
        right: 0.21em;
        bottom: 0.21em;
        font-size: 2em;
    }

    .scrollto-exhibit-top > a {
        background-color: darkgray;
        color: white;
        padding-left: 0.15em;
        padding-right: 0.15em;
        padding-bottom: 0.1em;
        border-radius: 30px;
    }
</style>