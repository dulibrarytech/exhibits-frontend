<script>
    'use strict'
    import {Search} from '../libs/search.js';
    export let currentRoute;

    var results = null;

    let terms;
    let boolean;
    let fields;
    let exhibitId;

    const init = () => {
        terms = currentRoute.queryParams.q || "";
        boolean = currentRoute.queryParams.bool || "and";
        fields = currentRoute.queryParams.fields || "title";
        exhibitId = currentRoute.queryParams.exhibitId || null;
        executeSearch();
    }
  
    const executeSearch = async () => {
        results = await Search.execute(terms, boolean, fields, exhibitId);
    }

    $: init();
</script>

<div class="search-page page">
    <div class="search-results container">
        {#if results}
            <div class="label">
                <h3>Results for </h3><p>{terms}</p>
            </div>
            <!-- <Search_Results_Display {results} /> -->
        {:else}
            <h3>No results found.</h3>
        {/if}
    </div>
</div>

<style>
    .search-results .label {
        display: inline;
    }
</style>