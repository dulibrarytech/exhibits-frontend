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

    let navigationMenu;
    let pageElement;
    let exhibitThankYouSectionElement;
    let repositoryRelatedItemsSectionElement;

    let renderTemplate = false;
    let templateMessage = null;

    const dispatch = createEventDispatcher();

    const setTheme = (styles) => {
        if(pageElement) {
            Object.assign(pageElement.style, styles);

            if(styles.backgroundColor) {
                // assign related items section bg to template bg color
                exhibitThankYouSectionElement.style.backgroundColor = styles.backgroundColor;

                // assign 'thanks for visiting' section bg to template bg color
                repositoryRelatedItemsSectionElement.style.backgroundColor = styles.backgroundColor;
            }
        }
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

<div class="exhibit-page" bind:this={pageElement}  style="position: relative">
    {#if data}
            <Hero {data} {styles} />

            <Navigation_Top bind:this={navigationMenu} {sections} styles={styles?.navigation || null} />

            {#if data.description}
                <Exhibit_Description content={data.description} />
            {/if}

            {#if renderTemplate}
                <svelte:component this={template} {items} {styles} {args} on:click-item on:mount-items={onMountItems} />
            {:else if templateMessage}
                <div class="template-message"><h3>{templateMessage}</h3></div>
            {/if}

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
    .template-message {
        background-color: #b8e6bf;
        padding: 50px;
        text-align: center;
        color: black;
    }
</style>