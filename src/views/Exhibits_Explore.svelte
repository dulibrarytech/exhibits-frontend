<svelte:head>
	<title>{pageTitle || Settings.appTitle}</title>
</svelte:head>

<script>
    'use strict'

    import { onMount } from 'svelte';
    import { Settings } from '../config/settings.js';
    import { Index } from '../libs/index.js';
    import { getInnerText } from '../libs/exhibits_data_helpers.js';
    import queryString from 'query-string';
    import MiniSearch from 'minisearch';

    import Exhibits_Explore_Search from '../templates/partials/Exhibits_Explore_Search.svelte';
    import Exhibit_Preview_Grid from '../templates/partials/Exhibit_Preview_Grid.svelte';
    import Exhibit_Preview_Grid_Tabs from '../templates/partials/Exhibit_Preview_Grid_Tabs.svelte';

    export let currentRoute;

    let _exhibits = [];
    let _searchData;
    var _filters = [];
    var _filterLabels = [];

    let miniSearch = new MiniSearch({
        fields: Object.keys(Settings.searchFieldsExhibit),
        storeFields: Object.values(Settings.exhibitDataFields)
    });

    var renderTabs;
    var message;
    var pageTitle;

    const EXHIBITS_DISPLAY_OPTIONS = {
        SHOW_ALL: "show_all",
        NO_STUDENT_CURATED: "no_student_curated",
        SHOW_TABS: "show_tabs"
    }

    const FILTER_TYPES = {
        KEYWORD: "keyword",
        FIELD: "field",
        FACET: "facet"
    }

    const EXHIBITS_DISPLAY = EXHIBITS_DISPLAY_OPTIONS.SHOW_TABS;
    const KEYWORD_FILTER_FUZZY = 0.1;
    const PAGE_TITLE = "All Exhibits";

    // import from settings
    const FILTER_OPTIONS = {
        "keyword": {
            "type": FILTER_TYPES.KEYWORD,
            "name": "keyword",
            "label": "Keywords",
            "field": ""
        },

        // "student_curated": {
        //     "type": FILTER_TYPES.FIELD,
        //     "name": "student_curated",
        //     "label": "Student Curated",
        //     "field": "is_student_curated"
        // }
    }

    const init = async () => {
        message = "";
        renderTabs = false;
        pageTitle = `${PAGE_TITLE} | ${Settings.appTitle}`;

        _searchData = {
            endpoint: null,
            queryParam: "keyword",
            buttonText: "Filter",
            placeholder: "Filter by keyword"
        }

        let {queryParams} = currentRoute;
        for(let key in queryParams) {
            if(FILTER_OPTIONS[key]) {
                _filters.push({
                    [key]: queryParams[key]
                })
            }
        }
    }

    const render = async () => {

        if(_exhibits.length > 0) {
            renderTabs = true;

            sortExhibits();
            initKeywordSearch();
            applyFilters();
        }
        else {
            message = "No exhibits found."
        }
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
        let count = 0;
        let index = [], indexItem = {};

        for(let exhibit of _exhibits) {
            indexItem = {...exhibit};

            for(let key of Object.keys(Settings.searchFieldsExhibit)) {
                indexItem[key] = getInnerText(exhibit[key]);
            }

            index.push(indexItem);
        }

        miniSearch.addAll(index.map(exhibit => (
            {...exhibit, id: ++count}
        )));
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
        let {field, value} = detail.data;

        removeFilter({
            [field]: value
        })
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
        
    init();

    onMount(async () => {
        message = "Retrieving exhibits...";
        _exhibits = await Index.getExhibits(); 

        if(_exhibits) render();
        else message = "Error retrieving exhibits";
    });
</script>

<div class="exhibits-explore">
    <div class="page">
        <div class="container">

            <!-- <h1>Online Exhibits</h1> -->

            <div class="search">
                <Exhibits_Explore_Search 
                    filterOptions={FILTER_OPTIONS} 
                    searchData={_searchData} 
                    filters={_filters} 
                    on:click-filter-option={onClickFilterOption} 
                    on:remove-facet={onRemoveFilter}
                    on:submit-search={onSubmitKeywordFilter}/>
            </div>
                
            {#if renderTabs}
                
                <div class="exhibit-previews">
                    <div class="homepage-section">

                        {#if EXHIBITS_DISPLAY == EXHIBITS_DISPLAY_OPTIONS.SHOW_ALL}

                            <Exhibit_Preview_Grid exhibits={_exhibits} args={{showTitle: true}} />

                        {:else if EXHIBITS_DISPLAY == EXHIBITS_DISPLAY_OPTIONS.NO_STUDENT_CURATED}
                            
                            <Exhibit_Preview_Grid exhibits={
                                _exhibits.filter((exhibit) => {return !exhibit.is_student_curated || exhibit.is_student_curated == 0})
                            } args={{showTitle: true}} />

                        {:else if EXHIBITS_DISPLAY == EXHIBITS_DISPLAY_OPTIONS.SHOW_TABS}

                            <Exhibit_Preview_Grid_Tabs sections={[
                                {"label": "University Libraries Exhibits", "exhibits": _exhibits.filter(exhibit => {return !exhibit.is_student_curated || exhibit.is_student_curated == 0})},
                                {"label": "Student Curated Exhibits", "exhibits": _exhibits.filter(exhibit => {return exhibit.is_student_curated == 1})}
                            ]} args={{showTitle: true}} />
                        {/if}

                    </div>
                </div>

            {:else}
                <div class="exhibit-previews">
                    <div class="homepage-section">
                        <div class="message">
                            {message}
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

    .exhibit-previews {
        padding: 50px 0 100px 0;
    }

    .message {
        font-size: 18px;
        margin-top: 30px;
    }
</style>