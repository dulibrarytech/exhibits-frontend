<script>
    'use strict'

    import { onMount } from 'svelte';

    export let id=null;
    export let text="";
    export let subtext="";
    export let display=true;
    export let styles = null;

    let headingElement;

    export const setTheme = (styles) => {
        for(let style in styles) {
            headingElement.style[style] = styles[style];
        }
    }

    onMount(async () => {
        if(styles) setTheme(styles);
    });
</script>

<div id={id ?? undefined} class="exhibit-heading" bind:this={headingElement}>
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
    .section-heading {
        padding-top: 25px;
        padding-bottom: 25px;
        font-size: 1.15em;
        margin-top: 4.5em;
    }

    .section-heading h3 {
        font-size: 1.75em;
    }
</style>