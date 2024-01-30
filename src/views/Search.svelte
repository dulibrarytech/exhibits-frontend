<script>
    /*
     * exhibits-frontend 
     * search results page - executes search with url query data, displays results
     */
    'use strict'

    import { Search } from '../libs/search.js';
    //import { Cache } from '../libs/cache';
    import Search_Results_Display from '../components/Search_Results_Display.svelte';
    import {ENTITY_TYPE, INDEX_FIELD, SEARCH_BOOLEAN} from '../config/global-constants.js';

    export let currentRoute;

    var results = null;
    var facets = {};
    var limitOptions = null;

    //let displayData = {};
    let terms;
    let boolean;
    let fields;
    let entity;
    let id;
    let page;

    const init = () => {
        console.log("TEST _Search page INIT")

        terms = currentRoute.queryParams.q?.split(',') || "";
        fields = currentRoute.queryParams.fields?.split(',') || INDEX_FIELD.TITLE;
        boolean = currentRoute.queryParams.bool || SEARCH_BOOLEAN.AND;
        page = currentRoute.queryParams.page || "1";
        entity = currentRoute.queryParams.index || ENTITY_TYPE.EXHIBIT;
        id = currentRoute.queryParams.id || null;

        if(validateUrlParameters()) {
            // displayData = {
            //     terms: terms.toString(),
            //     entity
            // }
            executeSearch();
        }
        else console.error("_Search page: Invalid query params");
    }
  
    const executeSearch = async () => {
        console.log("TEST _Search exe(): terms/bool/fields/facets:", terms, boolean, fields, facets)
        let response = await Search.execute({terms, boolean, fields, id, page, facets});
        results = response.results || [];
            console.log("TEST _Search exe(): results:", results)
        limitOptions = response.limitOptions || null;
            console.log("TEST _Search exe(): limitOptions:", limitOptions)
    }

    const validateUrlParameters = () => {
        let isValid = true;

        // boolean must be global value
        if(boolean && Object.values(SEARCH_BOOLEAN).includes(boolean) === false) isValid = false;

        // entity must be global value 
        if(entity && Object.values(ENTITY_TYPE).includes(entity) === false) isValid = false;

        // id must be hex value
        if(id && /^[a-fA-F0-9]+$/g.test(id) === false) isValid = false;

        // page must be numeric
        if(page && isNaN(page) === true) isValid = false;

        return isValid;
    }

    const onSelectFacet = (event) => {
        facets = event.detail;
        console.log("TEST _Search on sel facet, new sel facets rx:", facets)
        executeSearch();
    } 

    const onResetFacets = (event) => {
        facets = {};
        executeSearch();
    }

    const onClickBack = (event) => {
        history.go(-2);
    }

    $: init();
</script>

<div class="search-page page">
    <div class="search-results container">
        {#if results}
            <Search_Results_Display {results} {limitOptions} {terms} on:click-facet={onSelectFacet} on:click-back={onClickBack} on:click-clear-facets={onResetFacets} />
        {:else}
            <h3>No results found.</h3>
        {/if}
    </div>
</div>