<svelte:head>
	<title>{`Search Results | ${Settings.appTitle}`}</title>
</svelte:head>

<script>
    /*
     * exhibits-frontend 
     * search results page - executes search with url query data, displays results
     */
    'use strict'

    import { Search } from '../libs/search.js';
    import { Settings } from '../config/settings.js';
    import { Cache } from '../libs/cache';
    import {ENTITY_TYPE, INDEX_FIELD, SEARCH_BOOLEAN, SEARCH_TYPE} from '../config/global-constants.js';
    import * as Logger from '../libs/logger.js';

    import Site_Branding from '../templates/partials/Site_Branding.svelte';
    import Search_Results_Display from '../components/Search_Results_Display.svelte';

    export let currentRoute;

    var results = null;
    var limitOptions = null;
    var facets = [];
    var searchParams = {};
    var message = null;

    let terms;
    let boolean;
    let fields;
    let entity;
    let page;
    let cache;
    let exhibitId;

    const init = async () => {
        message = "Searching...";

        terms = currentRoute.queryParams.q?.split(',') || "";
        fields = currentRoute.queryParams.fields?.split(',') || INDEX_FIELD.TITLE;
        boolean = currentRoute.queryParams.bool || SEARCH_BOOLEAN.AND;
        page = currentRoute.queryParams.page || "1";
        entity = currentRoute.queryParams.index || ENTITY_TYPE.EXHIBIT;
        cache = currentRoute.queryParams.cache || false;
        exhibitId = currentRoute.queryParams.exhibitId || null;

        if(cache) facets = Cache.getSearchData()?.selectedFacets || [];

        let response = false;
        if(validateUrlParameters()) {
            response = await executeSearch();
        }
        else {
            Logger.module().error("Search error: Invalid query params");
        }
        
        message = response == true ? null : message = "An error occurred when executing the search.";
    }

    const executeSearch = async () => {
        try {
            let response = await Search.execute({terms, boolean, fields, exhibitId, page, facets});
            
            results = response.results || [];
            limitOptions = response.limitOptions || null;

            searchParams.totalResults = response.resultCount || null;
            searchParams.searchType = exhibitId ? SEARCH_TYPE.SEARCH_EXHIBIT : SEARCH_TYPE.SEARCH_ALL;
            searchParams.pageNumber = page;
            searchParams.resultsPerPage = 10;

            return true;
        }
        catch(error) {
            Logger.module().error(`Search error: ${error}`);
            return false;
        }
    }

    const validateUrlParameters = () => {
        let isValid = true;

        // boolean must be global value
        if(boolean && Object.values(SEARCH_BOOLEAN).includes(boolean) === false) isValid = false;

        // entity must be global value 
        if(entity && Object.values(ENTITY_TYPE).includes(entity) === false) isValid = false;

        // id must be hex value
        if(exhibitId && /^[a-fA-F0-9\-]+$/g.test(exhibitId) === false) isValid = false;

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
        let url = "/";

        if(searchParams.searchType == SEARCH_TYPE.SEARCH_ALL) url = "/exhibits";
        else if(searchParams.searchType == SEARCH_TYPE.SEARCH_EXHIBIT) url = `/exhibit/${exhibitId}`;

        window.location.replace(url);
    }

    const onClickPaginatorLink = (event) => {
        window.location.replace(event.detail.url);
    }

    $: init();
</script>

<Site_Branding />

<div class="search-page page">
    <div class="search-results container">
        {#if results}

            <Search_Results_Display 
                {results} 
                {facets} 
                {limitOptions} 
                {terms}
                {searchParams}

                on:click-facet={onSelectFacet} 
                on:click-clear-facets={onResetFacets} 
                on:click-back={onClickBack} 
                on:remove-facet={onRemoveFacet}
                on:click-paginator-link={onClickPaginatorLink} 
            />

        {:else}
            {#if message}
                <div class="message">
                    <h5>{message}</h5>
                </div>        
            {/if}
        {/if}
    </div>
</div>

<style>
    /* .search-results {
        padding-top: 44px;
    } */
</style>