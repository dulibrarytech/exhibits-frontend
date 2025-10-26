<script>
    'use strict'

    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { formatFacetField, formatFacetValue } from '../libs/format';

    export let limitOptions = [];
    export let facetValues = {};

    let limitOptionsDisplay = [];
    let facetLabelButtons = [];
    let facetDrodownLists = [];

    const dispatch = createEventDispatcher();

    const init = () => {
        let option = {};
        for(let key in facetValues) {
            option = limitOptions.find((option) => {
                return option.field == key
            })

            if(option) limitOptionsDisplay.push(option);
        }
    }

    const onClickFacet = (event) => {
        let field = event.target.getAttribute('data-facet-field');
        let value = event.target.getAttribute('data-facet-value');
        let label = event.target.getAttribute('data-facet-label');

        dispatch('click-facet', {field, value, label});
    }

    const onClickFacetLabel = ({target, currentTarget}) => {
        let index = currentTarget.getAttribute('data-index');

        facetLabelButtons[index].classList.toggle('active');
        facetLabelButtons[index].querySelector("i").classList.toggle("la-plus");
        facetLabelButtons[index].querySelector("i").classList.toggle("la-minus");

        if(facetLabelButtons[index].classList.contains('active')) {
            facetLabelButtons[index].setAttribute("aria-label", "collapse filter options list");
            facetDrodownLists[index].style.display = "block";
        }
        else {
            facetLabelButtons[index].setAttribute("aria-label", "expand filter options list");
            facetDrodownLists[index].style.display = "none";
        }
    }

    init(); 
</script>

<div class="facet-panel">
    <h4>Filter Results</h4>

    <div class="facets">
        {#each limitOptionsDisplay as {field, values, label=null}, index}

            {#if values.length > 0}
                <button 
                    type="button" 
                    class="collapsible" 
                    data-index={index}
                    aria-label="expand filter options list"

                    on:click={onClickFacetLabel} 
                    bind:this={facetLabelButtons[index]}
                >
                    <span use:formatFacetField>{field}</span>
                    <i class="las la-plus"></i>
                </button>

                <div class="panel-section" data-facet-field-label={label} bind:this={facetDrodownLists[index]}>
                  <ul data-facet-field-label={label} class="nav nav-pills nav-stacked search-result-categories mt">
                        {#each values as {value, count, label=null}}
                            {#if facetValues[field].includes(value) || facetValues[field] == "*"}
                                <li><a href on:click|preventDefault={onClickFacet} data-facet-field={field} data-facet-value={value} data-facet-label={label}><span use:formatFacetValue={field} style="pointer-events:none">{label || value}</span><span class="badge">{count}</span></a></li>
                            {/if}
                        {/each}
                    </ul> 
                </div>

            {/if}

        {/each}
    </div>
</div>

<style>
    .facet-panel > h4 {
        margin-bottom: 20px;
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

    .facets button i {
        float: right;
        position: relative;
        top: 5px;
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
        font-size: 12px;
        font-weight: 700;
        line-height: 1;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        background-color: #777;
        border-radius: 10px;
    }

    .search-result-categories>li>a>.badge {
        float: right;
    }

    /* Style the button that is used to open and close the collapsible content */
    .collapsible {
        background-color: #e5e5e5;
        color: #444;
        cursor: pointer;
        padding: 18px;
        width: 100%;
        border: none;
        text-align: left;
        outline: none;
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
        border-right: 1px solid rgb(229, 229, 229);
        border-left: 1px solid rgb(229, 229, 229);
        border-bottom: 1px solid rgb(229, 229, 229);
    }
</style>