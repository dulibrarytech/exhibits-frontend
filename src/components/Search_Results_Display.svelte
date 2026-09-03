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

    // _ module variables
    let resultsPage = [];
    let termsLabel = "";
    let searchType = null;
    let totalResults = 0;

    $: render();

    const render = () => {
        resultsPage = getResultsPage(searchParams.pageNumber);
        termsLabel = terms.toString().replace(/[,]/g, ' ').replace(/["']/g, '');
        searchType = searchParams.searchType || null;
        totalResults = searchParams.totalResults || 0;

        for(let facet of facets) {
            
            let option = limitOptions.find((option) => {
                return option.field == facet.field;
            });

            if(!option) continue;

            let index = option.values.findIndex(({value}) => value == facet.value);
            option.values.splice(index, 1);
        }
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
                        <FacetPanel {limitOptions} {facetValues} on:click-facet={onClickFacet} />
                    {/if}
                </div>

                <div class="col-md-9 col-md-pull-3 results-container">

                    <div class="search-data-display">
                        <h1 class="search-terms-label">{totalResults} search result{totalResults == 1 ? '' : 's'} for "<span style="font-weight: bold">{termsLabel}</span>"</h1>

                        <h2 class="sr-only">Results List</h2>
                        <FacetLabels {facets} on:remove-facet={onRemoveFacet} on:click-clear-facets />
                        <!-- <SearchResultsPaginator {resultsPage} params={searchParams} on:click-paginator-link /> -->
                    </div>

                    {#if resultsPage.length > 0}
                        {#each resultsPage as result, index}
                            <hr>
                            <Search_Result 
                                {terms} 
                                {result} 
                                {searchType} 
                                index={((searchParams.pageNumber-1) * searchParams.resultsPerPage) + index}

                                on:click-result
                            />
                        {/each}
                    {:else}
                        <div class="results-display-message">
                            <p>No results found.</p>
                        </div>
                    {/if}
                    
                    <SearchResultsPaginator {resultsPage} params={searchParams} on:click-paginator-link />
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
        .search-data-display {
            margin-top: 0px;
        }
    }
</style>
