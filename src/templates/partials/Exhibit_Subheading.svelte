<script>
    'use strict'

    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    import { getInnerText } from '../../libs/exhibits_data_helpers';

    export let id = null;
    export let text = "";
    export let display = true;
    export let styles = null;
    export let padTop = false;
    export let item = {};

    let headingElement;
    let textString;
    let margins;
    let textAlign;

    const dispatch = createEventDispatcher();

    $: {
        textString = getInnerText(text);
        textAlign = item.text_alignment || 'left';
        margins   = item.margins || 'medium';
    }

    export const setTheme = (styles) => {
        Object.assign(headingElement.style, styles);
    }

    onMount(async () => {
        if(styles) {
            if(typeof styles == 'string') styles = JSON.parse(styles);
            setTheme({ ...styles, textAlign });
        }
        dispatch('mount-template-item', {type: "subheading"});
    });
</script>

<div class="exhibit-subheading" bind:this={headingElement}>
    <div id={id ?? undefined} class="anchor-offset"></div>

    {#if display}
        <div class="section-subheading container-{margins}" class:subheading-pad-top={padTop}>
            <div class="section-title">
                <h3 aria-label={textString}>{@html text}</h3>
            </div>
        </div>
    {/if}
</div>

<style>
    .exhibit-subheading {
        font-size: 1.736842em;
    }
    
    .section-subheading {
        padding-bottom: 0; 
        text-transform: uppercase;
    }

    .subheading-pad-top {
        padding-top: 3.65rem; 
    }

    .section-subheading h3 {
        margin-bottom: 0;
        letter-spacing: 0.06383em;
        font-size: inherit;
    }

    .anchor-offset {
        position: relative;
        top: -81px;
    }
</style>
