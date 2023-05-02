<script>
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    
    import Hero from '../Hero.svelte';
    import Navigation_Top from '../Navigation_Top.svelte';

    export let data = {};
    export let template = null;
    export let sections = [];
    export let items = [];

    const dispatch = createEventDispatcher();

    // on mount disatch 'loaded'
    onMount(async () => {
        dispatch('mount', {});
    });
</script>

<div class="exhibit-page">
    {#if template}
        <Hero {data} />

        <nav class="exhibit-navigation navbar navbar-expand-lg navbar-light sticky-top" id="mainNav">
            <div class="container">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <Navigation_Top {sections} />
                </div>
            </div>
        </nav>
        
        <svelte:component this={template} {sections} {items} />
    {:else}
        <h3>Loading template...</h3>
    {/if}
</div>

<style>
    .navbar {
        background: #e5e3e1;
        min-height: 4.2em;
        border-bottom-style: solid;
        border-width: 1px;
        border-color: #c5c3c1;
    }

    button.navbar-toggler {
        margin: 0;
    }

    button.navbar-toggler:focus {
        box-shadow: none;
    }
</style>