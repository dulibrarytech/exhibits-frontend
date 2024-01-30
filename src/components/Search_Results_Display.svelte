<script>
    /*
     * template downloaded from: https://www.bootdey.com/snippets/view/Search-users-page-result
     */
    'use strict'

    import { createEventDispatcher } from 'svelte';
    import Search_Result from '../templates/partials/Search_Result.svelte';
    import { Settings } from '../config/settings';
    import { Cache } from '../libs/cache';

    export let results = [];
    export let limitOptions = null; //  all available facet options from search
    export let facets = {}; // user selected facets to add to faceted search
    export let terms = [];

    const dispatch = createEventDispatcher();

    let termsLabel = "";

    $: render();

    const render = () => {
        // search terms to display on the results page
        termsLabel = terms.toString().replace(/[,]/g, ' ').replace(/["']/g, '');
    }

    const formatFacetField = (node) => {
        let field = node.innerText.trim();

        if(field in Settings.facetLabels) {
            node.innerText = Settings.facetLabels[field];
        }
    }
    const formatFacetValue = (node, field) => {
        let value = node.innerText.trim();
        
        if(field == 'is_member_of_exhibit') {
            node.innerText = Cache.getExhibitById(value)?.title || value;
        }
        else if(value in Settings.facetValueLabels) {
            node.innerText = Settings.facetValueLabels[value];
        }
    }

    const onClickFacet = (event) => {
        let field = event.target.getAttribute('data-facet-field');
        let value = event.target.getAttribute('data-facet-value');

        if(!facets[field]) facets[field] = [];
        facets[field].push(value);

        dispatch('click-facet', facets)

    }

    const onRemoveFacet = (event) => {
        // dispatch facet data (this component will be re rendered)
    }
</script>

<div class="search-results-display">
    <div class="results">
        
        <div class="container">

            <div class="row ng-scope">
                <div class="col-md-12">
                    <!-- <FacetBreadcrumbs facets={selectedFacets} on:remove={onRemoveFacet} /> -->   <!-- old -->
                    <!-- <FacetBreadcrumbs facets={facets} on:remove={onRemoveFacet} /> -->  <!-- updated -->
                </div>
            </div> 

            <div class="row ng-scope">

                <div class="col-md-3 col-md-push-9 results-sidebar">
                    <div>
                        <button on:click|preventDefault={() => dispatch('click-back', {})}>Back</button>
                        <button on:click|preventDefault={() => dispatch('click-clear-facets', {})}>Reset Filters</button>
                    </div>

                    {#if limitOptions}
                        <div class="facet-panel">
                            <h4>Filter Results</h4>
                            <div class="facets">

                                {#each limitOptions as {field, values, label}}
                                    {#if values.length > 0}
                                        <h6 use:formatFacetField >{field}</h6>
                                        <ul class="nav nav-pills nav-stacked search-result-categories mt">

                                            {#each values as {value, count, label}}
                                                <li><a href on:click|preventDefault={onClickFacet} data-facet-field={field} data-facet-value={value}><span style="pointer-events:none" use:formatFacetValue={field}>{value}</span><span class="badge" style="pointer-events:none">{count}</span></a></li>
                                            {/each}

                                        </ul>
                                    {/if}
                                {/each}

                            </div>
                        </div>
                    {/if}

                </div>

                <div class="col-md-9 col-md-pull-3 results-container">
                    <p class="search-results-count">Found <span style="font-weight: bold">{results.length} results</span> for "<span style="font-weight: bold">{termsLabel}</span>"</p>

                    {#each results as result, index} 
                        <Search_Result {terms} {result} {index} />
                    {/each}

                    {#if results.length > 0}
                        <div class="text-align-center">
                            <ul class="pagination pagination-sm">
                                <li class="disabled"><a href="#">Prev</a>
                                </li>
                                <li class="active"><a href="#">1</a>
                                </li>
                                <li><a href="#">2</a>
                                </li>
                                <li><a href="#">3</a>
                                </li>
                                <li><a href="#">4</a>
                                </li>
                                <li><a href="#">5</a>
                                </li>
                                <li><a href="#">Next</a>
                                </li>
                            </ul>
                        </div>
                    {/if}
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
        padding: 10px 15px;
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

    .search-results-count {
        margin-top: 10px
    }

    :global(.search-result-item + .search-result-item) {
        margin-top: 70px
    }

    .pagination {
        display: inline-block;
        padding-left: 0;
        margin: 20px 0;
        border-radius: 4px;
    }

    .pagination>li {
        display: inline;
    }

    .pagination-sm>li:first-child>a, .pagination-sm>li:first-child>span {
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
    }

    .pagination>li:first-child>a, .pagination>li:first-child>span {
        margin-left: 0;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    .pagination>.disabled>a, .pagination>.disabled>a:focus, .pagination>.disabled>a:hover, .pagination>.disabled>span, .pagination>.disabled>span:focus, .pagination>.disabled>span:hover {
        color: #777;
        cursor: not-allowed;
        background-color: #fff;
        border-color: #ddd;
    }

    .pagination-sm>li>a, .pagination-sm>li>span {
        padding: 5px 10px;
        font-size: 12px;
        line-height: 1.5;
    }

    .pagination>li>a, .pagination>li>span {
        position: relative;
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        color: #337ab7;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #ddd;
    }

    .pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover {
        z-index: 3;
        color: #fff;
        cursor: default;
        background-color: #337ab7;
        border-color: #337ab7;
    }

    .results-sidebar > div:not(:first-child) {
        margin-top: 30px;
    }

    :global(.text-highlight) {
        background: yellow;
    }
</style>