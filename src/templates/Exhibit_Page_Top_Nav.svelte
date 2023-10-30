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

    const setTheme = ({template = null, heading = null}) => {
        // apply user styles to the exhibit page
        if(template) {
            for(let style in template) {
                pageElement.style[style] = template[style];
            }
        }

        // set all item titles' font type to the heading font type
        if(heading?.fontFamily) {
            document.querySelectorAll('.item .item-content .title').forEach((itemTitle) => {
                itemTitle.style.fontFamily = heading.fontFamily;
            });
        }
    }

    onMount(async () => {
        dispatch('mount', {});
        if(styles?.template) setTheme(styles);
    });
</script>

<div class="exhibit-page" bind:this={pageElement}>
    {#if template}
        <Hero {data} />
        <!-- Exhibit_Description html={data.description} /> -->
        <Navigation_Top {sections} styles={styles?.navigation || null} />

        <!-- exhibit template -->
        <svelte:component this={template} {items} {styles} on:click-item={onClickItem} />
    {:else}
        <h3>Loading template...</h3>
    {/if}
</div>

<style>

</style>