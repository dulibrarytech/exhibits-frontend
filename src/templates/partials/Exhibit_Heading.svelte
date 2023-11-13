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
        height: 104px;
    }

    .section-heading {
        padding-top: 25px;
        padding-bottom: 25px;
        /* font-size: 1.15em; */
    }

    .section-heading h3 {
        /* font-size: 1.75em; */
        margin-bottom: 0;
        font-size: 45px;
    }

    .anchor-offset {
        position: relative;
        top: -81px;
    }
</style>