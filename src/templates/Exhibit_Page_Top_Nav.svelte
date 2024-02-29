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
        if(pageElement) {
            Object.assign(pageElement.style, styles);
        }
    }

    const onMountItems = () => {
        if(styles.template) setTheme(styles.template);
    }

    onMount(async () => {
        dispatch('mount', {});
    });
</script>

<div class="exhibit-page" bind:this={pageElement}  style="position: relative">
    {#if template}
        <div class="page-top">
            <Hero {data} {styles} />

            <Navigation_Top {sections} styles={styles?.navigation || null} />

            {#if data.description}
                <Exhibit_Description content={data.description} />
            {/if}
        </div>

        <div class="page-template">
            <svelte:component this={template} {items} {styles} {args} on:click-item on:mount-items={onMountItems} />
        </div>
    {:else}
        <h3>Loading template...</h3>
    {/if}
</div>

<style>

</style>