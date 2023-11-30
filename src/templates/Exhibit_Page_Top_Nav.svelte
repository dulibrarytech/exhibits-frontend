<script>
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
        
    import Hero from './Hero.svelte';
    import Navigation_Top from '../components/Navigation_Top.svelte';
    import Exhibit_Description from './partials/Exhibit_Description.svelte';

    export let data = {};
    export let template = null;
    export let sections = [];
    export let items = [];
    export let styles = null;

    export let args = {};

    let pageElement;

    const dispatch = createEventDispatcher();

    const setTheme = (styles) => {
        if(styles.template) {
            Object.assign(pageElement.style, styles.template);
        }
    }

    const onMountItems = () => {
        if(styles) setTheme(styles);
    }

    onMount(async () => {
        dispatch('mount', {});
    });
</script>

<div class="exhibit-page" bind:this={pageElement}>
    {#if template}
        <Hero {data} />

        <Navigation_Top {sections} styles={styles?.navigation || null} />

        {#if data.description}
            <Exhibit_Description content={data.description} />
        {/if}

        <!-- exhibit template -->
        <svelte:component this={template} {items} {styles} {args} on:click-item on:mount-items={onMountItems} />
    {:else}
        <h3>Loading template...</h3>
    {/if}
</div>