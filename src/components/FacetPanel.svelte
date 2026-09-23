<script>
    'use strict'

    import { createEventDispatcher, onMount } from 'svelte';

    import { 
        normalizeDataString,
    } from '../libs/data_helpers';

    import { 
        getFacetFieldLabel,
    } from '../libs/exhibits_data_helpers';

    import { 
        formatFacetField, 
        formatFacetValue,
    } from '../libs/format';

    const dispatch = createEventDispatcher();

    export let limitOptions = [];
    export let facetValues = {};
    export let selectedFacets = [];

    const DISPLAY_COLLAPSIBLE_PANELS = true;
    const EXPAND_PANELS_BY_DEFAULT = true;

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

    const onclickShowFilters = () => {
        let button = document.querySelector(`button.filter-menu-toggler`);
        let expanded = button.getAttribute('aria-expanded') || false;

        if(expanded == "true") {
            button.querySelector("span").textContent = "Hide Filters";
            button.setAttribute('aria-expanded', true);
            button.setAttribute('aria-label', "Collapse filter menu");
            button.setAttribute('title', "Collapse filter menu");
        }
        else {
            button.querySelector("span").textContent = "Show Filters";
            button.setAttribute('aria-expanded', false);
            button.setAttribute('aria-label', "Expand filter menu");
            button.setAttribute('title', "Expand filter menu");
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
            facetLabelButtons[index].setAttribute('aria-expanded', true);
            facetDrodownLists[index].style.display = "block";
        }
        else {
            facetLabelButtons[index].setAttribute('aria-expanded', true);
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

<button 
    class="filter-menu-toggler d-md-none" 
    type="button" 
    data-bs-toggle="collapse" 
    data-bs-target="#facetPanel" 
    aria-controls="facetPanel" 
    aria-expanded="false" 
    aria-label="Expand filter menu" 
    title="Expand filter menu"
    on:click={onclickShowFilters}
>
    <i class="bi bi-filter"></i>
    <span>Show Filters</span>
</button>

<div id="facetPanel" class="facet-panel collapse d-md-block">
    <h2>Filter Results</h2>

    <div class="facets">
        {#if limitOptionsDisplay.length == 0 || limitOptionsDisplay[0].values?.length == 0}
            <span>No filters available</span>
        {/if}

        {#each limitOptionsDisplay as {field, values, label=null}, index}
            {#if values.length > 0}

                {#if DISPLAY_COLLAPSIBLE_PANELS}
                    <h3>
                        <button 
                            type="button" 
                            class="collapsible" 
                            data-index={index}
                            aria-label={`filter by ${getFacetFieldLabel(field)}`} 
                            aria-expanded={EXPAND_PANELS_BY_DEFAULT ? "true" : "false"}
                            on:click={onClickFacetLabel} 
                            bind:this={facetLabelButtons[index]}
                        >
                            <span use:formatFacetField>{field}</span>
                            <i class="bi bi-chevron-{EXPAND_PANELS_BY_DEFAULT ? "down" : "right"}"></i>
                        </button>
                    </h3>

                    <div class="panel-section" data-facet-field-label={label} bind:this={facetDrodownLists[index]} style="display: {EXPAND_PANELS_BY_DEFAULT ? 'block' : 'none'}"> <!-- TODO inline style display based on default window expand -->
                      <ul data-facet-field-label={label} class="nav nav-pills nav-stacked search-result-categories mt">
                            {#each values as {value, count, label=null, id}, index}
                                {#if facetValues[field].includes(value) || facetValues[field] == "*"}
                                    <li>
                                        <a href on:click|preventDefault={onClickFacet} data-facet-field={field} data-facet-value={value} data-facet-label={label}>
                                        <input style="pointer-events: none" type="checkbox" class="facet-item-checkbox" name="{normalizeDataString(field)}--option-{index+1}" value={id} tabindex="-1                                               ">
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
    button.filter-menu-toggler {
        background: inherit;
        padding: 0 0.4em;
        position: relative;
    }

    button.filter-menu-toggler i {
        font-size: 1.8rem;
    }

    button.filter-menu-toggler span {
        position: relative;
        bottom: 4px;
    }

    .facet-panel > h2 {
        margin-bottom: 1.5rem;
    }

    /* .facets > button { */
    .facets > h3 button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* color: #181818; */
        font-weight: bold;
    }

    .facets > h3 button i {
        float: right;
        position: relative;
    }

    .facets > h3 button  {
        margin-bottom: 0;
        font-size: 1rem;
        font-weight: bold;
    }

    .nav {
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
        padding: 10px 3px;
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
        display: none;
        overflow: hidden;
        max-height: 400px;
        overflow-y: scroll;
        background-color: #fff;
        margin-bottom: 0.5em;
        margin-top: -0.5em;
        border-right: 1px solid #c5c5c5;
        border-left: 1px solid #c5c5c5;
        border-bottom: 1px solid #c5c5c5;
    }

    .facet-item-checkbox {
        margin: 0 0.5rem 0.5em 0;
    }

    @media (min-width: 768px) {
        /* button.filter-menu-toggler {
            display: none;
        } */
    }
</style>