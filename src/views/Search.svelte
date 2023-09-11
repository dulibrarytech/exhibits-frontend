<script>
    'use strict'

    import {Search} from '../libs/search.js';
    import Search_Results_Display from '../components/Search_Results_Display.svelte';

    export let currentRoute;

    var results = null;

    let data = {};
    let terms;
    let boolean;
    let fields;
    let exhibitId;
    let page;

    const init = () => {
        terms = currentRoute.queryParams.q || "";
        boolean = currentRoute.queryParams.bool || "and";
        fields = currentRoute.queryParams.fields || "title";
        exhibitId = currentRoute.queryParams.exhibitId || null;
        page = currentRoute.queryParams.page || "1";

        data = {
            terms
        }

        executeSearch();
    }
  
    const executeSearch = async () => {
        results = await Search.execute(terms, boolean, fields, exhibitId, page);
    }

    $: init();
</script>

<div class="search-page page">
    <div class="search-results container">
        {#if results}
            <Search_Results_Display {results} {data} />
        {:else}
            <h3>No results found.</h3>
        {/if}
    </div>
</div>