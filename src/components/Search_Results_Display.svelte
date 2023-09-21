<script>
    /*
     * template downloaded from: https://www.bootdey.com/snippets/view/Search-users-page-result
     */
    'use strict'

    import Search_Result from '../templates/search/partials/Search_Result.svelte';
    import { Settings } from '../config/settings';
    import { Resource } from '../libs/resource';
    import {stripHtmlTags} from '../libs/data_helpers';

    import {ENTITY_TYPE} from '../config/global-constants';

    export let results = [];
    export let data = {};

    let displayFields = {};
    let displayTerms = "";
    let linkPath = "";

    $: render();

    const render = () => {
        let {entity = "", terms = ""} = data;

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

        results = formatResults(terms, results);

        /* formats the search terms for the terms label. replaces word separating comma with single space, single and double quotes are removed */
        displayTerms = terms?.replace(/[,]/g, ' ').replace(/["']/g, '');
    }

    const formatResults = (terms, results) => {

        /* adds result display data to each search result e.g. adding links, updating content, etc */
        results.forEach((result) => {
            for(let field in displayFields) {

                // Removes html from user content, search result will display only the text
                result[field] = stripHtmlTags(result[field]);

                // Adds search term highlight markup to content
                result[field] = highlightTerms(terms, result[field]);
            }

            if(!result.thumbnail_image) result.thumbnail_image = Resource.getThumbnailUrl(result);

            if(!result.link) result.link = `${linkPath}/${result.uuid || '#'}`;
        });

        return results;
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

                <div class="col-md-3 col-md-push-9 results-sidebar">
                    <div>
                        <button on:click|preventDefault={onBack}>Back</button>
                    </div>
                    <div class="facets">
                        <h4>Facets</h4>
                        <ul class="nav nav-pills nav-stacked search-result-categories mt">
                            <li><a href="#">Facet<span class="badge">[count]</span></a></li>
                        </ul>
                    </div>
                </div>

                <div class="col-md-9 col-md-pull-3 results-container">
                    <p class="search-results-count">Found <span style="font-weight: bold">{results.length} results</span> for "<span style="font-weight: bold">{displayTerms}</span>"</p>

                    <!-- TODO move to component -->
                    <!-- {#if results.length > 0}
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
                    {/if} -->

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
    .search-result-categories>li>a {
        color: #b6b6b6;
        font-weight: 400
    }

    .search-result-categories>li>a:hover {
        background-color: #ddd;
        color: #555
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