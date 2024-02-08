<script>
    /*
     * exhibits-frontend 
     * search results page - executes search with url query data, displays results
     */
    'use strict'

    import { Search } from '../libs/search.js';
    import Search_Results_Display from '../components/Search_Results_Display.svelte';
    import {ENTITY_TYPE, INDEX_FIELD, SEARCH_BOOLEAN, SEARCH_TYPE} from '../config/global-constants.js';
    import { Cache } from '../libs/cache';

    export let currentRoute;

    var results = null;
    var facets = [];
    var limitOptions = null;

    let terms;
    let boolean;
    let fields;
    let entity;
    let page;
    let cache;
    let exhibitId;
    let searchType;

    const init = async () => {
        terms = currentRoute.queryParams.q?.split(',') || "";
        fields = currentRoute.queryParams.fields?.split(',') || INDEX_FIELD.TITLE;
        boolean = currentRoute.queryParams.bool || SEARCH_BOOLEAN.AND;
        page = currentRoute.queryParams.page || "1";
        entity = currentRoute.queryParams.index || ENTITY_TYPE.EXHIBIT;
        cache = currentRoute.queryParams.cache || false;
        exhibitId = currentRoute.queryParams.exhibitId || null;

        searchType = exhibitId ? SEARCH_TYPE.SEARCH_EXHIBIT : SEARCH_TYPE.SEARCH_ALL;

        if(cache) facets = Cache.getSearchData()?.selectedFacets || [];

        if(validateUrlParameters()) {
            await executeSearch();
        }
        else console.error("Search page: Invalid query params");
    }
  
    const executeSearch = async () => {
        let response = await Search.execute({terms, boolean, fields, exhibitId, page, facets});
        results = response.results || [];
        limitOptions = response.limitOptions || null;
    }

    const validateUrlParameters = () => {
        let isValid = true;

        // boolean must be global value
        if(boolean && Object.values(SEARCH_BOOLEAN).includes(boolean) === false) isValid = false;

        // entity must be global value 
        if(entity && Object.values(ENTITY_TYPE).includes(entity) === false) isValid = false;

        // id must be hex value
        if(exhibitId && /^[a-fA-F0-9]+$/g.test(exhibitId) === false) isValid = false;

        // page must be numeric
        if(page && isNaN(page) === true) isValid = false;

        return isValid;
    }

    const onSelectFacet = (event) => {
        facets = event.detail;
        Cache.storeSearchData({selectedFacets: facets});

        let url = window.location.href;
        if(!cache) {
            url += "&cache=true";
            cache = true;
        }

        window.location.replace(url);
    } 

    const onRemoveFacet = (event) => {
        facets = event.detail;
        Cache.storeSearchData({selectedFacets: facets});
            
        let url = window.location.href;
        if(!cache) {
            url += "&cache=true";
            cache = true;
        }

        window.location.replace(url);
    }

    const onResetFacets = (event) => {
        facets = [];
        Cache.deleteSearchData();

        let url = window.location.href;
        if(cache) {
            url = url.replace("&cache=true", "");
            cache = false;
        }
        window.location.replace(url);
    }

    const onClickBack = (event) => {
        // if searchType == all, back goes home
        // if exhibit search, back goes to exhibit (have exhibitId here)
        let url = "/";
        if(searchType == SEARCH_TYPE.SEARCH_ALL) url = "/exhibits";
        else if(searchType == SEARCH_TYPE.SEARCH_EXHIBIT) url = `/exhibit/${exhibitId}`;

        window.location.replace(url);
    }

    $: init();
</script>

<div class="search-page page">
    <div class="search-results container">
        {#if results}
            <Search_Results_Display {results} {facets} {limitOptions} {terms} {searchType} on:click-facet={onSelectFacet} on:click-back={onClickBack} on:click-clear-facets={onResetFacets} on:remove-facet={onRemoveFacet}/>
            <!-- <Search_Results_Display {results} {facets} {limitOptions} {terms} on:click-facet={onSelectFacet} on:click-back={onClickBack} on:click-clear-facets={onResetFacets} on:remove-facet={onRemoveFacet}/> -->
        {:else}
            <h3>Please wait...</h3>
        {/if}
    </div>
</div>