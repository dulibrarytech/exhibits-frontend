<svelte:head>
	<title>{Settings.appTitle}</title>
</svelte:head>

<script>
    'use strict'

    import { onMount } from 'svelte'
    import { Settings } from '../config/settings.js';
    import { Index } from '../libs/index.js';
    import { formatExhibitFields } from '../libs/exhibits_data_helpers.js';
    import queryString from 'query-string';

    import Site_Branding from '../templates/partials/Site_Branding.svelte';
    import Exhibits_Explore_Search from '../templates/partials/Exhibits_Explore_Search.svelte';
    import Exhibit_Preview_Title_Grid from '../templates/partials/Exhibit_Preview_Title_Grid.svelte';
    import Exhibit_Preview_Grid_Tabs from '../templates/partials/Exhibit_Preview_Grid_Tabs.svelte';

    export let currentRoute;

    let _exhibits = [];
    let _searchData;
    let _searchFields;
    var _filters = [];
    var _filterLabels = [];

    var message;

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

    const EXHIBITS_DISPLAY = EXHIBITS_DISPLAY_OPTIONS.NO_STUDENT_CURATED;

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

    $: {
        if(_exhibits) render();
        else message = "Error retrieving exhibits";
    }

    const init = async () => {
        _searchFields = Object.keys(Settings.searchFields);
        _searchData = {
            endpoint: null,
            queryParam: "keyword",
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

        message = "Retrieving exhibits...";
        _exhibits = await Index.getExhibits(); 
    }

    const render = async () => {
        if(_exhibits.length > 0) {
            formatExhibitFields(_exhibits);
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
                _exhibits = filterKeyword(filter['keyword'], _searchFields);
            }

            // filter on data field value or array of values
            else if(filterOption.type == FILTER_TYPES.FIELD) {
                _exhibits = filterField(filterOption.field, value);
            }

            _filterLabels.push({[filterOption.label]: value});
        });
    }

    const filterKeyword = (terms, fields) => {
        let exhibits = [];
        terms = terms.toLowerCase().replace(/,/g, " ");

        let matches;
        exhibits = _exhibits.filter((exhibit) => {

            matches = 0;
            for(let field of fields) {
                if(exhibit[field] && exhibit[field].toLowerCase().indexOf(terms) >= 0) {
                    matches++;
                }
            }
            return matches > 0;
        });
        return exhibits;
    }

    const filterField = (field, value) => {
        let exhibits = [];

        exhibits = _exhibits.filter((exhibit) => {
            return exhibit[field] == value || exhibit[field].includes(value);
        });

        return exhibits;
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

    init();

    onMount(async () => {});
</script>

<Site_Branding />

<div class="exhibits-explore">
    <div class="page">
        <div class="container">

            <div class="search">
                <Exhibits_Explore_Search 
                    filterOptions={FILTER_OPTIONS} 
                    searchData={_searchData} 
                    filters={_filters} 
                    on:click-filter-option={onClickFilterOption} 
                    on:remove-facet={onRemoveFilter}
                    on:submit-search={onSubmitKeywordFilter}/>
            </div>
                
            {#if _exhibits && _exhibits.length > 0}
                
                <div class="exhibit-previews">
                    <div class="homepage-section">

                        {#if EXHIBITS_DISPLAY == EXHIBITS_DISPLAY_OPTIONS.SHOW_ALL}

                            <Exhibit_Preview_Title_Grid exhibits={_exhibits} />

                        {:else if EXHIBITS_DISPLAY == EXHIBITS_DISPLAY_OPTIONS.NO_STUDENT_CURATED}
                            
                            <Exhibit_Preview_Title_Grid exhibits={
                                _exhibits.filter((exhibit) => {return !exhibit.is_student_curated || exhibit.is_student_curated == 0})
                            } />

                        {:else if EXHIBITS_DISPLAY == EXHIBITS_DISPLAY_OPTIONS.SHOW_TABS}

                            <Exhibit_Preview_Grid_Tabs sections={{
                                "University Libraries Exhibits": _exhibits.filter(exhibit => {return !exhibit.is_student_curated || exhibit.is_student_curated == 0}),
                                "Student Curated Exhibits": _exhibits.filter(exhibit => {return exhibit.is_student_curated == 1})
                            }} />
                        {/if}

                    </div>
                </div>

            {:else}
                <!-- TODO add separate section and styles for message display -->
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

    .exhibits-explore {
        font-family: "Breve Sans Text";
    }

    .exhibit-previews {
        margin-top: 100px;
        margin-bottom: 100px;
    }

    .message {
        font-size: 18px;
    }
</style>