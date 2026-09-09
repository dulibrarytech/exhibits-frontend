<script>
    'use strict'

    import { createEventDispatcher, onMount } from 'svelte';
    import { normalizeDataString } from '../libs/data_helpers';
    import { 
        formatFacetField, 
        formatFacetValue,
        getFacetFieldLabel

    } from '../libs/format';

    const dispatch = createEventDispatcher();

    const DISPLAY_COLLAPSIBLE_PANELS = true;

    export let limitOptions = [];
    export let facetValues = {};
    export let selectedFacets = [];

    let limitOptionsDisplay = [];
    let facetLabelButtons = [];
    let facetDrodownLists = [];

    const init = () => {
        // init facet display and show currently selected and available limit options
        let option = {};
        for(let key in facetValues) {
            option = limitOptions.find((option) => {
                return option.field == key
            })

            if(option) limitOptionsDisplay.push(option);
        }
    }

    const onClickFacet = (event) => {
        let input = event.currentTarget.querySelector('input');

        if(input.checked == false) {
            let field = event.target.getAttribute('data-facet-field');
            let value = event.target.getAttribute('data-facet-value');
            let label = event.target.getAttribute('data-facet-label');

            dispatch('click-facet', {field, value, label});
        }
        else {
            let field = event.target.getAttribute('data-facet-field');
            let inputValue = event.currentTarget.querySelector('input').value;

            const facetIndex = selectedFacets.findIndex((facet) => {
                return facet.field == field && normalizeDataString(facet.value) == inputValue;
            });

            if(facetIndex >= 0) {
                dispatch('remove-facet', {
                    data: selectedFacets[facetIndex],
                    index: facetIndex,
                });
            }
        }
    }

    const onClickFacetLabel = ({target, currentTarget}) => {
        let index = currentTarget.getAttribute('data-index');

        facetLabelButtons[index].classList.toggle('active');
        facetLabelButtons[index].querySelector("i").classList.toggle("bi-chevron-right");
        facetLabelButtons[index].querySelector("i").classList.toggle("bi-chevron-down");

        if(facetLabelButtons[index].classList.contains('active')) {
            facetDrodownLists[index].style.display = "block";
        }
        else {
            facetDrodownLists[index].style.display = "none";
        }
    }

    init(); 

    onMount(() => {
        // reset all checkboxes and check the facet items that are currently selected
        document.querySelector(`input`).checked = false;
        for(const facet of selectedFacets) {
            let input = document.querySelector(`input[value="${normalizeDataString(facet.value)}"]`);
            if(input) input.checked = true;
        }
    });
</script>

{#if limitOptionsDisplay.length > 0}

<div class="facet-panel">
    <h2>Filter Results</h2>

    <div class="facets">
        {#if limitOptionsDisplay.length == 0 || limitOptionsDisplay[0].values?.length == 0}
            <span>No filters available</span>
        {/if}

        {#each limitOptionsDisplay as {field, values, label=null}, index}
            {#if values.length > 0}

                {#if DISPLAY_COLLAPSIBLE_PANELS}
                    <button 
                        type="button" 
                        class="collapsible active" 
                        data-index={index}
                        aria-label={`filter by ${getFacetFieldLabel(field)}`} 

                        on:click={onClickFacetLabel} 
                        bind:this={facetLabelButtons[index]}
                    >
                        <h3 use:formatFacetField>{field}</h3>
                        <i class="bi bi-chevron-down"></i>
                    </button>

                    <div class="panel-section" data-facet-field-label={label} bind:this={facetDrodownLists[index]}>
                      <ul data-facet-field-label={label} class="nav nav-pills nav-stacked search-result-categories mt">
                            {#each values as {value, count, label=null, id}, index}
                                {#if facetValues[field].includes(value) || facetValues[field] == "*"}
                                    <li>
                                        <a href on:click|preventDefault={onClickFacet} data-facet-field={field} data-facet-value={value} data-facet-label={label}>
                                            <input style="pointer-events: none" type="checkbox" class="facet-item-checkbox" name="{normalizeDataString(field)}--option-{index+1}" value={id}> <!-- TODO add id as value -->
                                            <span use:formatFacetValue={field} style="pointer-events:none">{label || value}</span>
                                            <span class="badge">{count}</span>
                                        </a>
                                    </li>
                                {/if}
                            {/each}
                        </ul> 
                    </div>
                {:else}
                    <div class="static-panel">
                        <h6 use:formatFacetField >{field}</h6>
                        <ul data-facet-field-label={label} class="nav nav-pills nav-stacked search-result-categories mt">
                            {#each values as {value, count, label=null}}
                                {#if facetValues[field].includes(value) || facetValues[field] == "*"}
                                    <li>
                                        <a href on:click|preventDefault={onClickFacet} data-facet-field={field} data-facet-value={value} data-facet-label={label}>
                                            <input type="checkbox" class="facet-item-checkbox" name="test" value="yes">
                                            <span use:formatFacetValue={field} style="pointer-events:none">{label || value}</span>
                                            <span class="badge">{count}</span>
                                        </a>
                                    </li>
                                {/if}
                            {/each}
                        </ul>
                    </div>
                    <style>
                        .facets .static-panel {
                            background-color: #e5e3e1;
                            padding: 15px;
                        }

                        .facets .static-panel h6 {
                            margin-bottom: 0px;
                        }
                    </style>
                {/if}

            {/if}
        {/each}
    </div>
</div>

{/if}

<style>
    .facet-panel > h2 {
        margin-bottom: 1.5rem;
    }

    .facets > button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #181818;
        font-weight: bold;
    }

    .facets > button i {
        float: right;
        position: relative;
    }

    .facets > button h3 {
        margin-bottom: 0;
        font-size: 1rem;
        font-weight: bold;
    }

    .nav {
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
        padding: 10px 0;
    }

    .nav-stacked>li {
        float: none;
    }

    .nav>li {
        position: relative;
        display: block;
        width: 100%;
    }

    .nav-pills>li>a {
        border-radius: 4px;
    }

    .nav>li>a {
        position: relative;
        display: block;
        padding: 5px 15px;
    }

    .nav>li>a:hover {
        text-decoration: none;
        cursor: pointer;
    }

    .facets {
        background-color: #fff;
        font-size: 1rem;
    }

    .facets > ul li {
        width: 284px;
    }

    .search-result-categories>li>a {
        color: #858381;
        font-weight: 400
    }

    .search-result-categories>li>a>.badge {
        float: right;
    }

    .nav-pills>li>a>.badge {
        margin-left: 3px;
        margin-top: 3px;
    }

    .badge {
        display: inline-block;
        min-width: 10px;
        padding: 3px 7px;
        font-size: 0.8rem;
        font-weight: 700;
        line-height: 1;
        color: #858381;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        background-color: initial;
        border-radius: 10px;
    }

    .search-result-categories>li>a>.badge {
        float: right;
    }

    /* Style the button that is used to open and close the collapsible content */
    button.collapsible {
        background-color: white;
        color: #444;
        cursor: pointer;
        padding: 18px;
        width: 100%;
        border: none;
        text-align: left;
        outline: none;
        border-style: solid;
        border-width: 1px;
        border-color: #c5c5c5;
    }

    /* Style the collapsible content. Note: hidden by default */
    .panel-section {
        display: block;
        overflow: hidden;
        max-height: 400px;
        overflow-y: scroll;
        background-color: #fff;
        margin-bottom: 0.5em;
        margin-top: -0.5em;
        /* border-right: 1px solid rgb(229, 229, 229);
        border-left: 1px solid rgb(229, 229, 229);
        border-bottom: 1px solid rgb(229, 229, 229); */
        border-right: 1px solid #c5c5c5;
        border-left: 1px solid #c5c5c5;
        border-bottom: 1px solid #c5c5c5;
    }

    .facet-item-checkbox {
        margin: 0 0.5rem 0.5em 0;
    }
</style>