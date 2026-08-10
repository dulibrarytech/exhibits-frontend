<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
        
    import Hero from '../components/Exhibit_Hero.svelte';
    import Navigation_Top from '../components/Navigation_Top.svelte';
    import Exhibit_Introduction from './partials/Exhibit_Introduction.svelte';
    import Exhibit_Thank_You from './partials/Exhibit_Thank_You.svelte';
    import Repository_Related_Items from '../components/Repository_Related_Items.svelte';
    import Alert from '../components/Exhibit_Alert.svelte';

    const dispatch = createEventDispatcher();

    export let args = {};
    export let template = null;
    export let sections = [];
    export let items = null;
    export let styles = null;
    export let data = {};

    // element handles
    let pageTopLinkElement;

    // component variables
    let renderTemplate = false;
    let templateMessage = null;
    let exhibitData = {};
    let alert = null;

    $: {
        exhibitData = data;
        alert = exhibitData.alert_text || null;
    }

    export const scrollToItemId = (anchorId, scrollType = 'smooth') => {
        let anchorOffset = document.getElementById(anchorId).offsetTop;
		window.scrollTo({
			top: anchorOffset,
			behavior: scrollType
		});
    }

    export const goToItemId = (anchorId) => {
        document.getElementById(anchorId).scrollIntoView({ behavior: 'instant' });
    }

    const scrollToPageTop = () => {
        window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
    }

    const onClickNavigationLink = (event) => {
		let anchorId = event.detail.anchorId;
        scrollToItemId(anchorId);
    }

    const setLinkActive = (activeId) => {
        const navLinks = document.querySelectorAll('.main-menu-link');
        
        navLinks.forEach((link) => {
            if (link.getAttribute('data-anchor') === `${activeId}`) {
                // if page sections are not implemented, keep this link active until another link is scrolled into the center of the view
                navLinks.forEach((link) => {link.classList.remove('active')});
                link.classList.add('active');
            } 
        });
    }

    const initSectionObserver = () => {
        const sections = document.querySelectorAll('.exhibit-item'); // items

        // Configure the observer options
        const options = {
            root: null, // Uses the browser viewport
            rootMargin: '-50% 0px -50% 0px', // Triggers exactly when section crosses the middle of the screen
            threshold: 0 // Triggers as soon as any part of the section enters the margin area
        };

        // init observer and callback
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // get the id of the heading that has triggered the observer event
                    const activeId = entry.target.getAttribute('id');
                    setLinkActive(activeId);
                }
            });
        }, options);

        sections.forEach((section) => observer.observe(section));
    }

    const onMountItems = () => {
        dispatch('mount-items', {});
        initSectionObserver();
    }

    onMount(async () => {
        if(items?.length > 0) {
            renderTemplate = true;
            dispatch('mount', {});
        }
        else {
            templateMessage = "No items found";
            dispatch('mount-items', {error: `Exhibit items: ${items}`});
        }

        // the "back to page top" link is initially not shown
        if(pageTopLinkElement) pageTopLinkElement.style.display = "none";
    });

    window.onscroll = function() {
        if(window.scrollY > 500) {
            if(pageTopLinkElement?.style.display == "none") pageTopLinkElement.style.display = "block";
        }
        else {
            if(pageTopLinkElement?.style.display == "block") pageTopLinkElement.style.display = "none";
        }
    };
</script>

<div class="exhibit-page" style="position: relative">

    <div class="exhibit-content">
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
            <svelte:component this={template} {items} styles={styles?.template || null} {args} on:click-item on:mount-items={onMountItems} />
        {:else if templateMessage}
            <div class="template-message"><h3>{templateMessage}</h3></div>
        {/if}
    </div>
        
    <Exhibit_Thank_You />

    <Repository_Related_Items {items} exhibitId={exhibitData.uuid} on:click-item />

    <div class="scrollto-page-top" bind:this={pageTopLinkElement}>
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