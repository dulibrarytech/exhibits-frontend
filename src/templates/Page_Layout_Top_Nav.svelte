<script>
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    
    import Hero from './Hero.svelte';
    import Navigation_Top from '../components/Navigation_Top.svelte';

    export let data = {};
    export let template = null;
    export let sections = [];
    export let items = [];
    export let styles = null;

    let pageElement;

    const dispatch = createEventDispatcher();

    const onClickItem = (event) => {
        let itemId = event.detail.itemId || null;
        dispatch('click-item', {itemId});
    }

    const setTheme = (styles) => {
        for(let style in styles) {
            pageElement.style[style] = styles[style];
        }
    }

    onMount(async () => {
        dispatch('mount', {});
        if(styles?.template) setTheme(styles.template);
    });
</script>

<div class="exhibit-page" bind:this={pageElement}>
    {#if template}
        <Hero {data} />
        <Navigation_Top {sections} styles={styles?.navigation || null} />

        <!-- exhibit template -->
        <svelte:component this={template} {sections} {items} {styles} on:click-item={onClickItem} />
    {:else}
        <h3>Loading template...</h3>
    {/if}
</div>

<style>

</style>