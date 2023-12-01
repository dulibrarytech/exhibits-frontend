<script>
    'use strict'

    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';

    export let id = null;
    export let text = "";
    export let subtext = "";
    export let display = true;
    export let styles = null;

    let headingElement;

    const dispatch = createEventDispatcher();

    export const setTheme = (styles) => {
        Object.assign(headingElement.style, styles);
    }

    onMount(async () => {
        if(styles) setTheme(styles);
        dispatch('mount-template-item', {type: "heading"});
    });
</script>

<div class="exhibit-heading" bind:this={headingElement}>
    <div id={id ?? undefined} class="anchor-offset"></div>

    {#if display}
        <div class="section-heading container">
            <div class="section-title">
                <h3>{@html text}</h3>
            </div>
            <div class="section-subtitle">
                <h5>{@html subtext}</h5>
            </div>
        </div>
    {/if}
</div>

<style>
    .exhibit-heading {
        font-size: 47px; 
    }

    .section-heading {
        padding-top: 0.532em; /* 25px @ 47px heading font */
        padding-bottom: 0.319em; /* 15px @ 47px heading font */
    }

    .section-heading h3 {
        margin-bottom: 0;
        font-size: inherit;
    }

    .anchor-offset {
        position: relative;
        top: -81px;
    }
</style>