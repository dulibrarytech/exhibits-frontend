<script>
    'use strict'

    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';

    export let id = null;
    export let text = "";
    export let display = true;
    export let styles = null;

    let headingElement;

    const dispatch = createEventDispatcher();

    export const setTheme = (styles) => {
        Object.assign(headingElement.style, styles);
    }

    onMount(async () => {
        if(styles) {
            if(typeof styles == 'string') styles = JSON.parse(styles);
            setTheme(styles);
        }
        dispatch('mount-template-item', {type: "heading"});
    });
</script>

<div class="exhibit-heading" bind:this={headingElement}>
    <div id={id ?? undefined} class="anchor-offset"></div>

    {#if display}
        <div class="section-heading container">
            <div class="section-title">
                <h2>{@html text}</h2>
            </div>
        </div>
    {/if}
</div>

<style>
    .exhibit-heading {
        font-size: 47px;
    }

    .section-heading.container {
        padding-left: 0;
        padding-right: 0;
    }

    .section-heading {
        padding-top: 0.532em; 
        padding-bottom: 0.532em; 
        text-transform: uppercase;
    }

    .section-heading h2 {
        margin-bottom: 0;
        letter-spacing: 0.06383em;
        font-size: inherit;
    }

    .anchor-offset {
        position: relative;
        top: -81px;
    }
</style>