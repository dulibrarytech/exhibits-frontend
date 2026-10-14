<script>
'use strict'

import { createEventDispatcher } from 'svelte';
import { formatFacetField, formatFacetValue } from '../libs/format';

const dispatch = createEventDispatcher();

export let facets = [];

const onClickLabel = (event) => {
    let index = event.target.parentElement.getAttribute('data-index');
    dispatch('remove-facet', {
        data: facets[index],
        index
    });
}

</script>

{#if facets.length > 0}
    <div class="facet-labels-container" aria-label="selected filters">
        {#if facets?.length > 0}
            <button 
                aria-label="Clear All Filters"
                on:click|preventDefault={() => dispatch('clear-facets', {})}
            >
                Clear All
            </button>
        {/if}

        <div class="facet-labels">
            {#each facets as {field, value, label=null}, index}
                <div class="facet-label">

                    <span aria-hidden="true">
                        <b use:formatFacetField>{field}</b> : <b use:formatFacetValue={field}>{label || value}</b>
                    </span>

                    <button 
                        class="removelink"
                        aria-label="Remove Filter"
                        data-index={index}
                        on:click|stopPropagation={onClickLabel} 
                        on:keypress|stopPropagation={onClickLabel} 
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>

                </div>
            {/each}
        </div>
    </div>
    
{/if}

<style>
    @font-face {
	    font-family: "IBM Plex Mono";
        src: url('../assets/fonts/IBMPlexMono-Regular.ttf') format("truetype");
    }

    /* flex box */
    .facet-labels-container {
        display: flex;
        margin-top: 2.2rem;
        gap: 10px;
        font-family: "IBM Plex Mono";
    }

    /* flex box child 1 */
    .facet-labels-container button {
        background: inherit;
        border: none;
        text-decoration: underline;
        flex-shrink: 0;
        flex-grow: 0;
        font-size: 1rem;
    }

    /* flex box child 2 */
    .facet-labels {
        display: flex;
        row-gap: 8px;
        align-content: flex-start;
        flex-wrap: wrap;
        font-size: initial;
        flex-shrink: 1;
        min-width: 0;
    }

    .facet-labels * {
        margin: 0;
    }

    .facet-label {
        margin-left: 15px;
        background: white;
        border-radius: 3px;
        border-style: solid;
        border-width: 1px;
        border-color: #BA0C2F;
        padding: 7px 14px;
    }

    button.removelink {
        padding: 0;
    }

    .facet-labels a.removelink i {
        position: relative;
        top: 1px;
    }

    .facet-label-list {
        display: inline-flex;
        margin-left: 15px;
    }

    .facet-label-list > .facet-label {
        margin-left: 10px;
    }

    a, a:visited {
        color: initial;
    }
</style>