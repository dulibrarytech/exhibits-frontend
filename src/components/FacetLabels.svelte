<script>
'use strict'

import { createEventDispatcher } from 'svelte';
import { formatFacetField, formatFacetValue } from '../libs/format';

const dispatch = createEventDispatcher();

export let facets = [];  // TODO: update incoming data struct for: [{field, value, fieldLabel, valueLabel}]

const onClickLabel = (event) => {
    let index = event.target.getAttribute('data-index');
    dispatch('remove-facet', index);
}

</script>

{#if facets.length > 0}
    <div class="facet-labels">
        <p>Filtering on:</p>

        {#each facets as {field, value}, index}
            <div class="facet-label"><a class="removelink" href on:click={onClickLabel} data-index={index}>X</a> <b use:formatFacetField>{field}</b>: <span use:formatFacetValue={field}>{value}</span></div>
        {/each}
    </div>
{/if}

<style>
    .facet-labels {
        display: inline-flex;
    }

    .facet-label {
        margin-left: 15px;
    }

    .facet-labels a.removelink {
        content: attr(data-icon);
        font-family: "Icomoon";
        text-decoration: none;
    }

    .facet-label-list {
        display: inline-flex;
        margin-left: 15px;
    }

    .facet-label-list > .facet-label {
        margin-left: 10px;
    }
</style>