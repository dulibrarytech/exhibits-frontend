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

    let data = {};
    let terms;
    let facets;
    let boolean;
    let fields;
    let entity;
    let id;
    let page;

    const init = () => {
        terms = sanitizeParameterValue(currentRoute.queryParams.q) || "";
        facets = null;
        boolean = currentRoute.queryParams.bool || SEARCH_BOOLEAN.AND;
        fields = sanitizeParameterValue(currentRoute.queryParams.fields) || INDEX_FIELD.TITLE;
        entity = currentRoute.queryParams.index || ENTITY_TYPE.EXHIBIT; // validate
        id = currentRoute.queryParams.id || null; // validate
        page = currentRoute.queryParams.page || "1";

        if(validateUrlParameters()) {
            data = {
                terms,
                entity
            }
            executeSearch();
        }
        else console.error("Invalid query params");
    }
  
    const executeSearch = async () => {
        /* converts csv string values to arrays for the search.execute() function */
        terms = terms.split(',');
        fields = fields.split(',');

        results = await Search.execute(terms, boolean, fields, id, page);

        // TODO get facets and results from "response" from Search.exe()  {results, facets}
        // facets = 
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
            <Search_Results_Display {results} {data} {facets} />
        {:else}
            <h3>No results found.</h3>
        {/if}
    </div>
</div>