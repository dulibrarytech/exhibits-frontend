<script>
    /*
     * template downloaded from: https://www.bootdey.com/snippets/view/Search-users-page-result
     */
    'use strict'

    import { createEventDispatcher } from 'svelte';
    import { Settings } from '../config/settings.js';
    import { formatFacetField, formatFacetValue } from '../libs/format';
    import { getArrayPage } from '../libs/data_helpers';
    import Search_Result from '../templates/partials/Search_Result.svelte';
    import FacetLabels from './FacetLabels.svelte';
    import SearchResultsPaginator from './Search_Results_Paginator.svelte';

    export let results = [];
    export let limitOptions = null; //  all available facet options from search
    export let facets = []; // user selected facets to add to faceted search
    export let terms = [];
    export let searchParams = {};

    const dispatch = createEventDispatcher();

    let {
        facetValues
    } = Settings;

    var resultsPage = [];
    var searchType = null;
    var termsLabel = "";

    $: render();

    const render = () => {
        resultsPage = getResultsPage(searchParams.pageNumber);
        termsLabel = terms.toString().replace(/[,]/g, ' ').replace(/["']/g, '');
        searchType = searchParams.searchType || null;
    }

    const getResultsPage = (pageNumber) => {
        return getArrayPage(results, pageNumber, searchParams.resultsPerPage);
    }

    const onClickFacet = (event) => {
        let field = event.target.getAttribute('data-facet-field');
        let value = event.target.getAttribute('data-facet-value');
        let label = event.target.getAttribute('data-facet-label');

        let existing = facets.find((facet) => {
            return facet.field == field && facet.value == value;
        })
        if(!existing) {
            facets.push({field, value, label})
            dispatch('click-facet', facets);
        }
    }

    const onRemoveFacet = ({detail}) => {
        let index = detail.index;

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

                        <!-- TODO move to <LimitOptionsPanel /> -->
                        <div class="facet-panel">
                            <h4>Filter Results</h4>

                            <div class="facets">
                                {#each limitOptions as {field, values, label=null}}

                                    {#if facetValues[field] && values.length > 0}
                                        <h6 use:formatFacetField >{field}</h6>
                                        <ul data-facet-field-label={label} class="nav nav-pills nav-stacked search-result-categories mt">

                                            {#each values as {value, count, label=null}}
                                                {#if facetValues[field].includes(value) || facetValues[field] == "*"}
                                                    <li><a href on:click|preventDefault={onClickFacet} data-facet-field={field} data-facet-value={value} data-facet-label={label}><span use:formatFacetValue={field} style="pointer-events:none">{label || value}</span><span class="badge">{count}</span></a></li>
                                                {/if}
                                            {/each}

                                        </ul>
                                    {/if}

                                {/each}
                            </div>
                        </div>
                        <!-- TODO move to <LimitOptionsPanel /> -->

                    {/if}
                </div>

                <div class="col-md-9 col-md-pull-3 results-container">

                    <div class="search-data-display">
                        <p class="search-terms-label">Search for "<span style="font-weight: bold">{termsLabel}</span>"</p>

                        <FacetLabels {facets} on:remove-facet={onRemoveFacet} />

                        <SearchResultsPaginator {resultsPage} params={searchParams} on:click-paginator-link />
                    </div>

                    {#if resultsPage.length > 0}
                        {#each resultsPage as result, index}
                            <hr>
                            <Search_Result {terms} {result} index={((searchParams.pageNumber-1) * searchParams.resultsPerPage) + index} {searchType} />
                        {/each}
                    {:else}
                        <p>No results found.</p>
                    {/if}
                    
                     <SearchResultsPaginator {resultsPage} params={searchParams} on:click-paginator-link />
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
        margin-bottom: 30px;
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

    .facets {
        background-color: #e5e3e1;
        padding: 15px;
        font-size: 1rem;
    }

    .facets > ul li {
        width: 284px;
    }

    .facets h6 {
        margin-top: 0.5rem;
    }

    .search-result-categories>li>a {
        color: #858381;
        font-weight: 400
    }

    .search-result-categories>li>a:hover {
        background-color: #c5c3c1;
        color: #555
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

    .search-result-categories>li>a>.glyphicon {
        margin-right: 5px;
    }

    .search-result-categories>li>a>.badge {
        float: right;
    }

    .search-data-display {
        display: inline-flex;
        margin-bottom: 30px;
        margin-top: 30px;
    }

    .search-terms-label {
        margin-right: 30px;
    }

    .results-sidebar > div:not(:first-child) {
        margin-top: 30px;
    }

    :global(.search-result-item + .search-result-item) {
        margin-top: 70px
    }

    :global(.search-results-paginator) {
        margin-top: 1.75rem;
    }

    :global(.text-highlight) {
        background: yellow;
    }

    @media screen and (min-width: 768px) {
        .search-data-display {
            margin-top: 0px;
        }
    }
</style>