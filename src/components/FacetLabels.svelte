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
    <div class="facet-labels">
        {#each facets as {field, value}, index}
            <div class="facet-label"><a class="removelink" href={"javascript:void(0)"} on:click|stopPropagation={onClickLabel} on:keypress|stopPropagation={onClickLabel} data-index={index}><i class="bi bi-x-circle"></i></a>
                &nbsp;<b use:formatFacetField>{field}</b>
                
                {#if value}<span use:formatFacetValue={field}>: {value}</span>{/if}
            </div>
        {/each}
    </div>
{/if}

<style>
    .facet-labels {
        display: inline-flex;
    }

    .facet-label {
        margin-left: 15px;
        background: #e5e3e1;
        padding: 5px 10px;
        border-radius: 5px;
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

    a, a:visited {
        color: initial;
    }
</style>