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
    import * as Logger from '../libs/logger.js';

    import Modal_Dialog_Window from '../components/Modal_Dialog_Window.svelte';
    import Modal_Search_Result_Display from '../components/Modal_Search_Result_Display.svelte';
    import Search_Results_Display from '../components/Search_Results_Display.svelte';

    import {
        INDEX_FIELD, 
        SEARCH_BOOLEAN, 
        SEARCH_TYPE
    } from '../config/global-constants.js';

    const RESULTS_PER_PAGE = Settings.searchResultsPerPage || 10;
    const DEFAULT_SEARCH_FIELD = INDEX_FIELD.TITLE;
    const DEFAULT_SEARCH_OPERATOR = SEARCH_BOOLEAN.AND;
    const RESULT_VIEWER_DIALOG_WIDTH = "75%";
    const RESULT_VIEWER_DIALOG_HEIGHT = "85%";

    export let currentRoute;

    // module variables
    let _results = null;
    //let _activeResultIndex = null;
    let _limitOptions = null;
    let _facets = [];
    let _searchParams = {};
    let _modalDialog = null;
    let _modalDialogData = null;
    let _modalDialogArgs = null;
    let _message = null;

    // search query values
    let {
        q:          terms = "",
        fields:     fields = DEFAULT_SEARCH_FIELD,
        bool:       boolean = DEFAULT_SEARCH_OPERATOR,
        page:       page = 1,
        exhibitId:  exhibitId = null,

    } = currentRoute.queryParams || {};

    const init = async () => {
        // set default state
        _message = "Searching...";
        //_activeResultIndex = 1;

        // convert incoming terms, fields data to arrays
        terms = terms.split(',');
        fields = fields.split(',');

        // set default search params fields
        _searchParams = {
            searchType: exhibitId ? SEARCH_TYPE.SEARCH_EXHIBIT : SEARCH_TYPE.SEARCH_ALL,
            pageNumber: page,
            resultsPerPage: RESULTS_PER_PAGE,
            totalResults: 0
        }

        // check if there are any selected facets
        _facets = Cache.getSearchData()?.selectedFacets || [];

        let response = false;
        if(validateUrlParameters()) {
            response = await executeSearch();
        }
        else {
            Logger.module().error("Search error: Invalid query params");
        }

        _message = response == true ? null : "An error occurred when executing the search.";
    }

    const executeSearch = async () => {
        try {
            let response = await Search.execute({terms, boolean, fields, exhibitId, facets: _facets});
            
            _results = response.results || [];
            _limitOptions = response.limitOptions || null;
            _searchParams.totalResults = response.resultCount || null;

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

        // id must be hex value
        if(exhibitId && /^[a-fA-F0-9\-]+$/g.test(exhibitId) === false) isValid = false;

        // page must be numeric
        if(page && isNaN(page) === true) isValid = false;

        return isValid;
    }

    const onSelectFacet = (event) => {
        _facets = event.detail;
        Cache.storeSearchData({selectedFacets: _facets});

        // revert to results page 1 when selected facets are updated
        let url = window.location.href;
        window.location.replace( url.replace(/(&|)page=[0-9]+/g, "") );
    } 

    const onRemoveFacet = (event) => {
        _facets = event.detail;
        Cache.storeSearchData({selectedFacets: _facets});

        // revert to results page 1 when selected facets are updated
        let url = window.location.href;
        window.location.replace( url.replace(/(&|)page=[0-9]+/g, "") );
    }

    const onResetFacets = (event) => {
        _facets = [];
        Cache.deleteSearchData();
        window.location.reload();
    }

    const onClickBack = (event) => {
        history.go(-2);
    }

    const onClickPaginatorLink = (event) => {
        window.location.replace(event.detail.url);
    }

    // called on SRV prev/next button events (in modal viewer only)
    const onUpdateResultViewerIndex = (event) => {
        let resultIndex = event.detail.resultIndex || 1;
        _modalDialogData = _results[resultIndex];
    }

    // called on result item click event (on page only, modal closed)
    const onClickResultLink = (event) => {
        openResultModal(event.detail.resultIndex);
    }

    const openResultModal = (resultIndex) => {
        // TEST
        if(_modalDialog) _modalDialog = null;

        // result item at index
        _modalDialogData = _results[resultIndex];

        _modalDialogArgs = {
            totalResults: _results.length, 
            resultIndex: 1, // active result (init only, this is not set in refreshmodal)
        }

        _modalDialog = Modal_Search_Result_Display;

        // TEST - ORIG
        //if(!_modalDialog) _modalDialog = Modal_Search_Result_Display;
    }

    const closeModal = (event) => {
        _modalDialogData = null;
        _modalDialog = null;

        // if(location.href.indexOf('#') > 0) {
        //     history.replaceState(null, null, location.href.substring(0, location.href.indexOf('#')));
        // }
    }

    $: init();
</script>

<div class="search-page page">
    <div class="search-results container-large">
        {#if _results}

            <Search_Results_Display 
                results={_results} 
                facets={_facets} 
                limitOptions={_limitOptions} 
                terms={terms}
                searchParams={_searchParams}

                on:click-result={onClickResultLink}
                on:click-facet={onSelectFacet} 
                on:click-clear-facets={onResetFacets} 
                on:click-back={onClickBack} 
                on:remove-facet={onRemoveFacet}
                on:click-paginator-link={onClickPaginatorLink} 
            />

            {#if _modalDialog}
                <Modal_Dialog_Window 
                    modalDisplay={_modalDialog} 
                    modalData={_modalDialogData} 
                    modalArgs={_modalDialogArgs}
                    height={RESULT_VIEWER_DIALOG_HEIGHT}
                    width={RESULT_VIEWER_DIALOG_WIDTH}
                    on:update-result-index={onUpdateResultViewerIndex}
                    on:close={closeModal} 
                />
            {/if}

        {:else}
            {#if _message}
                <div class="message">
                    <h5>{_message}</h5>
                </div>        
            {/if}
        {/if}
    </div>
</div>
