<script>
    'use strict'

    import Search_Result from '../templates/search/partials/Search_Result.svelte';
    import { Settings } from '../config/settings.js';
    import {stripHtmlTags} from '../libs/data_helpers';

    export let results = [];
    export let data = {};

    let resultFields = Settings.searchResultFields;

    $: {
        results.forEach((result) => {
            for(let field in resultFields) {
                result[field] = stripHtmlTags(result[field]);
            }
        });
    }
</script>

<div class="search-results-display">
    <div class="results">
        
        <div class="container">
            <div class="row ng-scope">

                <div class="col-md-3 col-md-push-9">
                    <h4>Facets</h4>
                    <ul class="nav nav-pills nav-stacked search-result-categories mt">
                        <li><a href="#">Facet<span class="badge">[count]</span></a></li>
                    </ul>
                </div>

                <div class="col-md-9 col-md-pull-3">
                    <p class="search-results-count">Found {results.length} results for "{data.terms}"</p>

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
        margin-top: 20px
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
</style>