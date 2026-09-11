<script>
    /*
     * template downloaded from: https://www.bootdey.com/snippets/view/Search-users-page-result
     */
    'use strict'

    import { createEventDispatcher } from 'svelte';
    import { Settings } from '../config/settings.js';
    import { getArrayPage } from '../libs/data_helpers';
    import Search_Result from '../templates/partials/Search_Result.svelte';
    import FacetLabels from './FacetLabels.svelte';
    import FacetPanel from './FacetPanel.svelte';
    import SearchResultsPaginator from './Search_Results_Paginator.svelte';

    export let results = [];
    export let limitOptions = null;
    export let facets = [];
    export let terms = [];
    export let searchParams = {};

    const dispatch = createEventDispatcher();

    let {
        facetValues
    } = Settings;

    // module variables
    let _resultsPage = [];
    let _termsLabel = "";
    let _searchType = null;
    let _totalResults = 0;

    $: {
        init();
    }

    const init = () => {
        _resultsPage = getResultsPage(searchParams.pageNumber);
        _termsLabel = terms.toString().replace(/[,]/g, ' ').replace(/["']/g, '');
        _searchType = searchParams.searchType || null;
        _totalResults = searchParams.totalResults || 0;
    }

    const onUpdateResultsPage = (event) => {
        const page = parseInt(event.detail.page);
        _resultsPage = getResultsPage(page);
        searchParams.pageNumber = page;
    }

    const getResultsPage = (pageNumber) => {
        return getArrayPage(results, pageNumber, searchParams.resultsPerPage);
    }

    const onClickFacet = (event) => {
        let {field, value, label} = event.detail;

        let existing = facets.find((facet) => {
            return facet.field == field && facet.value == value;
        });

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
        <div class="container-large">

            <div class="row ng-scope">
                <div class="col-md-3 col-md-push-9 results-sidebar">
                    {#if limitOptions.length > 0}
                        <FacetPanel {limitOptions} {facetValues} selectedFacets={facets} on:click-facet={onClickFacet} on:remove-facet={onRemoveFacet}  />
                    {/if}
                </div>

                <div class="col-md-9 col-md-pull-3 results-container">

                    <div>
                        <div class="search-data-display">
                            <h1 class="search-terms-label">{_totalResults} search result{_totalResults == 1 ? '' : 's'} for "<span style="font-weight: bold">{_termsLabel}</span>"</h1>

                            <h2 class="sr-only">Results List</h2>
                            <FacetLabels {facets} on:remove-facet={onRemoveFacet} on:click-clear-facets />
                        </div>

                        {#if _resultsPage.length > 0}
                            {#key _resultsPage}
                                {#each _resultsPage as result, index}
                                    <hr>
                                    <Search_Result 
                                        {terms} 
                                        {result} 
                                        searchType={_searchType} 
                                        index={((searchParams.pageNumber-1) * searchParams.resultsPerPage) + index}
                                        on:click-result
                                    />
                                {/each}
                            {/key}
                        {:else}
                            <div class="results-display-message">
                                <p>No results found.</p>
                            </div>
                        {/if}
                    </div>
                    
                    {#key searchParams.pageNumber}
                    <SearchResultsPaginator {_resultsPage} params={searchParams} on:click-paginator-link={onUpdateResultsPage} />
                    {/key}
                </div>
            </div>
        </div>

    </div>
</div>

<style>
    h1 {
        font-size: 1.6rem;
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    .results-container {
        display: block;
    }

    .results-display-message {
        margin-top: 5rem;
    }

    :global(.search-results-display h2), 
    :global(.search-results-display h3) {
        font-size: 1.3rem;
    }

    :global(.search-results-display h4) {
        font-size: 1.1rem;
    }

    .search-data-display {
        display: block;
        margin-bottom: 30px;
        margin-top: 30px;
    }

    .search-terms-label {
        margin-right: 30px;
    }

    :global(.search-results-display .results-sidebar > div:not(:first-child)) {
        margin-top: 30px;
    }

    :global(.search-results-display .search-result-item + .search-result-item) {
        margin-top: 70px
    }

    :global(.search-results-display .search-results-paginator) {
        margin-top: 1.75rem;
    }

    :global(.search-results-display .text-highlight) {
        background: yellow;
    }

    @media screen and (min-width: 768px) {
        .results-container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .search-data-display {
            margin-top: 0px;
        }
    }
</style>
