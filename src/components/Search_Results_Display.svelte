<script>
    /*
     * template downloaded from: https://www.bootdey.com/snippets/view/Search-users-page-result
     */
    'use strict'

    import { createEventDispatcher } from 'svelte';
    import Search_Result from '../templates/partials/Search_Result.svelte';
    import { Settings } from '../config/settings';
    import { Cache } from '../libs/cache';

    //import { formatFacetLabel } from '../libs/format'
    import { stripHtmlTags } from '../libs/data_helpers';

    import {ENTITY_TYPE} from '../config/global-constants';

    export let results = [];
    export let facets = null; //  all available facet options from search
    export let displayData = {};

    const dispatch = createEventDispatcher();

    let displayFields = {};
    let displayTerms = "";
    let linkPath = "";

    $: render();

    const render = () => {
        let {entity = "", terms = ""} = displayData;

        /* get the display data for the results, for exhibit or exhibit item based on search entity type */
        if(entity == ENTITY_TYPE.EXHIBIT) {
            displayFields = Settings.searchFieldsExhibit;
            linkPath = `/exhibit`;
        }
        else if(entity == ENTITY_TYPE.ITEM) {
            displayFields = Settings.searchFieldsExhibitItem;
            //linkPath = `/exhibit/${exhibitId}/item`;
            linkPath = `#`; // TBD - how to open items
        }

        formatResults(terms, results);
        if(facets) formatFacets(facets);

        /* formats the search terms for the terms label. replaces word separating comma with single space, single and double quotes are removed */
        displayTerms = terms.replace(/[,]/g, ' ').replace(/["']/g, '');
    }

    const formatResults = (terms, results) => {

        /* adds result display data to each search result e.g. adding links, updating content, etc */
        results.forEach((result) => {
            for(let field in displayFields) {

                if(result[field]) {
                    // Removes html from user content, search result will display only the text
                    result[field] = stripHtmlTags(result[field]);

                    // Adds search term highlight markup to content
                    result[field] = highlightTerms(terms, result[field]);
                }
            }

            if(!result.link) result.link = `${linkPath}/${result.uuid || '#'}`;
        });
    }

    const formatFacets = (facets) => {
        for(let index in facets) {
            let {field, values} = facets[index];
            if(field in Settings.facetLabels) {
                facets[index].label = Settings.facetLabels[field]
            }

            for(let index in values) {
                let {value} = values[index];
                
                if(field == 'is_member_of_exhibit') {
                    values[index].label = Cache.getExhibitById(value).title;
                }
                else if(value in Settings.facetValueLabels) {
                    values[index].label = Settings.facetValueLabels[value]
                }
            }
        }
    }

    const onClickFacet = (event) => {
        // dispatch facet data (this component will be re rendered)
        // get field = elt['data-limit-field'] 
        // get value = elt['data-limit-value']
        // push {field, value} to selectedFacets[]
    }

    const onRemoveFacet = (event) => {
        // dispatch facet data (this component will be re rendered)
    }

    /* adds the html markup for the search term highlighting to each term in the display text */
    const highlightTerms = (terms, text) => {
        let pattern;

        terms.split(',').forEach((term) => {
            pattern = new RegExp(`${term}`, "gi");
            text = text.replace(pattern, `<span class="text-highlight">${term}</span>`);
        });

        return text;
    }

    const onBack = () => {
        history.go(-2);
    }
</script>

<div class="search-results-display">
    <div class="results">
        
        <div class="container">

            <div class="row ng-scope">
                <div class="col-md-12">
                    <!-- <FacetBreadcrumbs facets={selectedFacets} on:remove={onRemoveFacet} /> -->
                </div>
            </div> 

            <div class="row ng-scope">

                <div class="col-md-3 col-md-push-9 results-sidebar">
                    <div>
                        <button on:click|preventDefault={onBack}>Back</button>
                    </div>

                    {#if facets}
                        <h4>Filter</h4>
                        <div class="facets">
                            {#each facets as {field, values, label}}

                                <h6>{label || field}</h6>
                                <ul class="nav nav-pills nav-stacked search-result-categories mt">
                                    
                                    {#each values as {value, count, label}}

                                        <li><a href="#" on:click|preventDefault={onClickFacet} data-limit-field={field} data-limit-value={value}>{label || value}<span class="badge">{count}</span></a></li>
                                    
                                    {/each}

                                </ul>

                            {/each}
                        </div>
                    {/if}

                </div>

                <div class="col-md-9 col-md-pull-3 results-container">
                    <p class="search-results-count">Found <span style="font-weight: bold">{results.length} results</span> for "<span style="font-weight: bold">{displayTerms}</span>"</p>

                    {#each results as result, index} 
                        <Search_Result {result} {index} />
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

    .facets > ul li {
        width: 284px;
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