<svelte:head>
	<title>Explore Exhibits | {Settings.appTitle}</title>
</svelte:head>

<script>
    'use strict'

    import { navigateTo } from 'svelte-router-spa';
    import { onMount } from 'svelte';
    import { Settings } from '../config/settings.js';
    import { Index } from '../libs/index.js';
    import { getInnerText } from '../libs/exhibits_data_helpers.js';
    import queryString from 'query-string';
    import MiniSearch from 'minisearch';

    import Exhibits_Explore_Search from '../components/Exhibits_Explore_Search.svelte';
    import Exhibit_Preview_Grid from '../templates/partials/Exhibit_Preview_Grid.svelte';
    import Exhibit_Preview_Grid_Tabs from '../templates/partials/Exhibit_Preview_Grid_Tabs.svelte';

    export let currentRoute;

    // module params
    let _exhibits = [];
    let _searchData = {};
    let _filters = [];
    let _pages = [];
    let _pageId = null;
    let _filterLabels = [];
    let _message = "";
    let _renderPage = false;

    // feature flags
    const EXHIBITS_DISPLAY_OPTIONS = {
        SHOW_ALL: "show_all",
        NO_STUDENT_CURATED: "no_student_curated",
        SHOW_TABS: "show_tabs"
    }
    const EXHIBITS_DISPLAY = EXHIBITS_DISPLAY_OPTIONS.SHOW_TABS;

    // page settings
    const KEYWORD_FILTER_FUZZY = 0.1;
    const FILTER_TYPES = {
        KEYWORD: "keyword",
        FIELD: "field",
        FACET: "facet"
    }
    const FILTER_OPTIONS = {
        "keyword": {
            "type": FILTER_TYPES.KEYWORD,
            "name": "keyword",
            "label": "Keywords",
            "field": ""
        },
    }

    // init filter search
    const miniSearch = new MiniSearch({
        fields: Object.keys(Settings.searchFieldsExhibit),
        storeFields: Object.values(Settings.exhibitDataFields)
    });

    const init = async () => {
        _pages = Settings.exploreExhibitsTabbedContent;

        const {
            queryParams,
        } = currentRoute;

        const pageId = queryParams.tab || null;
        if(pageId && pageId.length <= 50) {
            _pageId = pageId;
        }
        else {
            changeTabPage(_pages[0].id);
        }

        for(let key in queryParams) {
            if(FILTER_OPTIONS[key]) {
                _filters.push({
                    [key]: queryParams[key]
                });
            }
        }

        _searchData = {
            endpoint: null,
            queryParam: "keyword",
            buttonText: "Filter",
            placeholder: "Filter by keyword"
        }
    }

    const render = async () => {
        if(_exhibits.length > 0) {
            _renderPage = true;

            sortExhibits();
            initKeywordSearch();
            applyFilters();

            _pages = _pages.map((page) => {
                return {
                    ...page,
                    exhibits: _exhibits.filter(exhibit => {return exhibit[page.condition] == page.value})
                }
            });
        }
        else {
            _message = "No exhibits found."
        }
    }

    /* sort alphabetically by title */
    const sortExhibits = () => {
        _exhibits = _exhibits.map((exhibit) => {
            return {
                ...exhibit,
                title_string: getInnerText(exhibit.title).replace(/[^a-zA-Z0-9 ]/g, "")
            }
        }).sort((a, b) => {
            if (a.title_string.toLowerCase() < b.title_string.toLowerCase()) {return -1}
            else if (a.title_string.toLowerCase() > b.title_string.toLowerCase()) {return 1}
            return 0;
        })
    }

    const addFilter = (data) => {
        let urlQueryData = queryString.parse(location.search);
        let filterField = Object.keys(data)[0];
        
        urlQueryData[filterField] = data[filterField];
        location.search = queryString.stringify(urlQueryData);
    }

    const removeFilter = (data) => {
        let urlQueryData = queryString.parse(location.search);
        let filterField = Object.keys(data)[0];

        delete urlQueryData[filterField]
        location.search = queryString.stringify(urlQueryData);
    }

    const applyFilters = () => {
        _filters.forEach(filter => {
            let key = Object.keys(filter)[0];
            let value = filter[key];
            let filterOption = FILTER_OPTIONS[key];

            // filter on search box terms
            if(filterOption.type == FILTER_TYPES.KEYWORD) {
                _exhibits = filterKeyword(filter['keyword']);
            }

            // filter on data field value or array of values
            else if(filterOption.type == FILTER_TYPES.FIELD) {
                _exhibits = filterField(filterOption.field, value);
            }

            _filterLabels.push({[filterOption.label]: value});
        });
    }

    const filterKeyword = (terms) => {
        terms = terms.toLowerCase().replace(/,/g, " ");
        return miniSearch.search(terms, { fuzzy: KEYWORD_FILTER_FUZZY });
    }

    const filterField = (field, value) => {
        return _exhibits.filter((exhibit) => {
            return exhibit[field] == value || exhibit[field].includes(value);
        });
    }

    const initKeywordSearch = () => {
        let count = 0, index = [], indexItem = {};

        // add the exhibit data to the minisearch index
        for(let exhibit of _exhibits) {
            indexItem = {...exhibit};

            for(let field of Object.keys(Settings.searchFieldsExhibit)) {
                if(!indexItem[field]) continue;
                
                if(typeof indexItem[field] == 'string') {
                    indexItem[field] = getInnerText(exhibit[field]);
                }
                else if(typeof indexItem[field] == 'object') {
                    indexItem[field] = getInnerText( exhibit[field].toString() );
                }
            }

            index.push(indexItem);
        }

        miniSearch.addAll(index.map(exhibit => ({
                ...exhibit, 
                id: ++count
            }
        )));
    }

    const changeTabPage = (pageId) => {
        const url = window.location.href;

        let urlPath = "";
        if(url.indexOf("tab=") > 0) {
            urlPath = `${window.location.href}`.replace(/tab=[a-zA-Z0-9-]+/g, `tab=${pageId}`);
        }
        else {
            const tabParam = url.indexOf("?") > 0 ? `&tab=${pageId}` : `?tab=${pageId}`;
            urlPath = urlPath.concat(tabParam);
        }

        history.replaceState(null, null, urlPath);
    }

    const onSubmitKeywordFilter = ({detail}) => {
        let {terms} = detail;

        addFilter({
            keyword: terms.toString()
        });
    }

    const onClickFilterOption = ({detail}) => {
        let {value, checked} = detail;

        let filter = {
            [value]: checked ? "1" : "0"
        }

        if(checked) addFilter(filter);
        else removeFilter(filter);
    }

    const onRemoveFilter = ({detail}) => {
        const {data=null} = detail;

        if(data) {
            // remove specific filter
            const {field, value} = data;
            removeFilter({
                [field]: value
            });
        }
        else {
            // remove all filters
            let urlQueryData = queryString.parse(location.search);
            for(let key in urlQueryData) {
                if(Object.keys(FILTER_OPTIONS).includes(key)) {
                    delete urlQueryData[key];
                }
            }
            location.search = queryString.stringify(urlQueryData);
        }
    }

    const onChangeTabPage = ({detail}) => {
        const {panelId: pageId} = detail;
        changeTabPage(pageId);
    }

    const onClickPreview = ({detail}) => {
        let {exhibitId} = detail;
        navigateTo(`/exhibit/${exhibitId}`);
    }
        
    init();

    onMount(async () => {
        window.scrollTo(0, 0);

        _message = "Retrieving exhibits...";
        _exhibits = await Index.getExhibits(); 

        if(_exhibits) render();
        else _message = "Error retrieving exhibits";
    });
</script>

<div class="exhibits-explore">
    <div class="page">
        <div class="container-large">
            <h1>Explore Exhibits</h1>

            {#if _renderPage}

                <div class="search">
                    <Exhibits_Explore_Search 
                        filterOptions={FILTER_OPTIONS} 
                        searchData={_searchData} 
                        filters={_filters} 
                        on:click-filter-option={onClickFilterOption} 
                        on:remove-facet={onRemoveFilter}
                        on:clear-facets={onRemoveFilter}
                        on:submit-search={onSubmitKeywordFilter}/>
                </div>
                                
                <div class="exhibit-previews">
                    <div class="homepage-section">

                        {#if EXHIBITS_DISPLAY == EXHIBITS_DISPLAY_OPTIONS.SHOW_ALL}
                            <Exhibit_Preview_Grid exhibits={_exhibits} args={{showTitle: true}} on:click-preview={onClickPreview} />

                        {:else if EXHIBITS_DISPLAY == EXHIBITS_DISPLAY_OPTIONS.NO_STUDENT_CURATED}
                            <Exhibit_Preview_Grid 
                                exhibits={
                                    _exhibits.filter((exhibit) => {return !exhibit.is_student_curated || exhibit.is_student_curated == 0})
                                } 
                                args={{showTitle: true}} 
                                on:click-preview={onClickPreview}   
                            />

                        {:else if EXHIBITS_DISPLAY == EXHIBITS_DISPLAY_OPTIONS.SHOW_TABS}
                            <Exhibit_Preview_Grid_Tabs 
                                panelData={_pages} 
                                activePanelId={_pageId}
                                args={{showTitle: true}} 
                                on:select-panel={onChangeTabPage} 
                                on:click-preview={onClickPreview}
                            />

                        {/if}
                    </div>
                </div>

            {:else}
                <div class="exhibit-previews">
                    <div class="homepage-section">
                        <div class="message">
                            {_message}
                        </div>
                    </div>
                </div>
            {/if}

        </div>
    </div>
</div>

<style>
    @font-face {
        font-family: "Breve Sans Text";
        src: url('../assets/fonts/BreveSansTextLight.otf') format("truetype");
    }

    h1 {
        font-size: 1.7rem;
    }

    .search {
        margin-top: 50px;
    }

    .exhibit-previews {
        margin: 50px 0 100px 0;
    }

    .message {
        font-size: 18px;
        margin-top: 30px;
    }

    .page > .container-large > h1 {
        font-weight: normal;
    }
</style>
