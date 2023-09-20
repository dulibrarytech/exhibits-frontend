<script>
    'use strict'

    import {Search} from '../libs/search.js';
    import {stripHtmlAndObjectCharacters, stripHtmlTags} from '../libs/data_helpers';
    import Search_Results_Display from '../components/Search_Results_Display.svelte';
    import {ENTITY_TYPE, INDEX_FIELD, SEARCH_BOOLEAN} from '../config/global-constants.js';

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
        terms = sanitizeParameterValue(currentRoute.queryParams.q) || "";
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
        terms = terms.split(',');
        fields = fields.split(',');

        results = await Search.execute(terms, boolean, fields, id, page);
    }

    const validateUrlParameters = () => {
        let isValid = true;

        // boolean is value
        // entity is entity
        // id is alphanumeric
        // page is numeric

        return isValid;
    }

    const sanitizeParameterValue = (value) => {
        let sanitized = null;
        if(value) sanitized = stripHtmlAndObjectCharacters(value.trim());
        return sanitized;
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