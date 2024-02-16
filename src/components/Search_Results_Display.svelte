<script>
    /*
     * template downloaded from: https://www.bootdey.com/snippets/view/Search-users-page-result
     */
    'use strict'

    import { createEventDispatcher } from 'svelte';
    import { formatFacetField, formatFacetValue } from '../libs/format';
    import Search_Result from '../templates/partials/Search_Result.svelte';
    import FacetLabels from './FacetLabels.svelte';
    import SearchResultsPaginator from './Search_Results_Paginator.svelte';

    export let results = [];
    export let limitOptions = null; //  all available facet options from search
    export let facets = []; // user selected facets to add to faceted search
    export let terms = [];
    export let searchParams = {};

    const dispatch = createEventDispatcher();

    var searchType = null;
    var termsLabel = ""; // search terms e.g. "X results found for [terms]";

    $: render();

    const render = () => {
        termsLabel = terms.toString().replace(/[,]/g, ' ').replace(/["']/g, '');
        searchType = searchParams.searchType || null;
    }

    const onClickFacet = (event) => {
        let field = event.target.getAttribute('data-facet-field');
        let value = event.target.getAttribute('data-facet-value');

        let existing = facets.find((facet) => {
            return facet.field == field && facet.value == value;
        })
        if(!existing) {
            facets.push({field, value})
            dispatch('click-facet', facets);
        }
    }

    const onRemoveFacet = (event) => {
        let index = event.detail;
        if (index > -1) {
            facets.splice(index, 1);
        }

        dispatch('remove-facet', facets);
    }
</script>

<div class="search-results-display">
    <div class="results">
        <div class="container">

            <div class="row ng-scope">
                <div class="col-md-3 col-md-push-9 results-sidebar">
                    <div>
                        <button on:click|preventDefault={() => dispatch('click-back', {})}>Back</button>
                        {#if facets?.length > 0}<button on:click|preventDefault={() => dispatch('click-clear-facets', {})}>Reset Filters</button>{/if}
                    </div>

                    {#if limitOptions.length > 0}
                        <div class="facet-panel">
                            <h4>Filter Results</h4>
                            <div class="facets">
                                {#each limitOptions as {field, values, label=null}}

                                    {#if values.length > 0}
                                        <h6 use:formatFacetField >{field}</h6>
                                        <ul data-facet-field-label={label} class="nav nav-pills nav-stacked search-result-categories mt">

                                            {#each values as {value, count, label=null}, index}
                                                <li><a href on:click|preventDefault={onClickFacet} data-facet-field={field} data-facet-value={value}><span use:formatFacetValue={field} style="pointer-events:none">{value}</span><span class="badge">{count}</span></a></li>
                                            {/each}

                                        </ul>
                                    {/if}

                                {/each}
                            </div>
                        </div>
                    {/if}

                </div>

                <div class="col-md-9 col-md-pull-3 results-container">

                    <div class="search-data-display">
                        <p class="search-terms-label">Search for "<span style="font-weight: bold">{termsLabel}</span>"</p>

                        <FacetLabels {facets} on:remove-facet={onRemoveFacet} />

                        <SearchResultsPaginator resultPage={results} params={searchParams} on:click-paginator-link />
                    </div>

                    {#each results as result, index} 
                        <Search_Result {terms} {result} {index} {searchType} />
                    {/each}
                    
                    <SearchResultsPaginator resultPage={results} params={searchParams} on:click-paginator-link />
                </div>
            </div>
        </div>

    </div>
</div>

<style>
    .nav {
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
    }

    .nav-stacked>li {
        float: none;
    }

    .nav>li {
        position: relative;
        display: block;
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

    .facets > ul li {
        width: 284px;
    }

    .facets h6 {
        margin-top: 1.1rem;
    }

    .search-result-categories>li>a {
        color: #b6b6b6;
        font-weight: 400
    }

    .search-result-categories>li>a:hover {
        background-color: #ddd;
        color: #555
    }

    .search-result-categories>li>a>.badge {
        float: right;
    }

    .nav-pills>li>a>.badge {
        margin-left: 3px;
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

    .search-result-categories>li>a>.glyphicon {
        margin-right: 5px
    }

    .search-result-categories>li>a>.badge {
        float: right
    }

    .search-data-display {
        display: inline-flex;
        margin-bottom: 30px;
    }

    .search-terms-label {
        margin-right: 30px;
    }

    :global(.search-result-item + .search-result-item) {
        margin-top: 70px
    }

    :global(.search-results-paginator) {
        margin-top: 1.75rem;
    }

    .results-sidebar > div:not(:first-child) {
        margin-top: 30px;
    }

    :global(.text-highlight) {
        background: yellow;
    }
</style>