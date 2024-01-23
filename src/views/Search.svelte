<script>
    /*
     * exhibits-frontend 
     * search results page - executes search with url query data, displays results
     */
    'use strict'

    import {Search} from '../libs/search.js';
    import {stripHtmlAndObjectCharacters, stripHtmlTags} from '../libs/data_helpers';
    import Search_Results_Display from '../components/Search_Results_Display.svelte';
    import {ENTITY_TYPE, INDEX_FIELD, SEARCH_BOOLEAN} from '../config/global-constants.js';

    export let currentRoute;

    var results = null;
    var facets = null;

    let displayData = {};
    let terms;
    let boolean;
    let fields;
    let entity;
    let id;
    let page;

    const init = () => {
        terms = currentRoute.queryParams.q?.split(',') || "";
        fields = currentRoute.queryParams.fields?.split(',') || INDEX_FIELD.TITLE;
        facets = null;
        boolean = currentRoute.queryParams.bool || SEARCH_BOOLEAN.AND;
        entity = currentRoute.queryParams.index || ENTITY_TYPE.EXHIBIT;
        id = currentRoute.queryParams.id || null;
        page = currentRoute.queryParams.page || "1";

        if(validateUrlParameters()) {
            displayData = {
                terms: terms.toString(),
                entity
            }
            executeSearch();
        }
        else console.error("Invalid query params");
    }
  
    const executeSearch = async () => {
        let response = await Search.execute(terms, boolean, fields, id, page);
        results = response.results || [];
        facets = response.facets || null;
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

    const sanitizeParameterValue = (value) => {
        let sanitized = null;
        if(value) sanitized = stripHtmlAndObjectCharacters(value.trim()); // TEMP refer to elastic query docs
        return sanitized;
    }

    $: init();
</script>

<div class="search-page page">
    <div class="search-results container">
        {#if results}
            <Search_Results_Display {results} {facets} {displayData} />
        {:else}
            <h3>No results found.</h3>
        {/if}
    </div>
</div>