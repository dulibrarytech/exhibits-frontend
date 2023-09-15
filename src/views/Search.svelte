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
    let entity;
    let id;
    let page;

    const init = () => {
        terms = currentRoute.queryParams.q || "";
        boolean = currentRoute.queryParams.bool || "and";
        fields = currentRoute.queryParams.fields || "title";
        entity = currentRoute.queryParams.index || "exhibit";
        id = currentRoute.queryParams.id || null;
        page = currentRoute.queryParams.page || "1";

        if(validateData()) {
            data = {
                terms,
                entity
            }
            executeSearch();
        }
        else console.error("Invalid query params");
    }
  
    const executeSearch = async () => {
        results = await Search.execute(terms, boolean, fields, id, page);
    }

    const validateData = () => {
        let isValid = true;

        // validate all query param fields here

        return isValid;
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