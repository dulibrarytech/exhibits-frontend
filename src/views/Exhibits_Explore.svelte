<svelte:head>
	<title>{Settings.appTitle}</title>
</svelte:head>

<script>
    'use strict'

    import { onMount } from 'svelte'
    import { Settings } from '../config/settings.js';
    import { Index } from '../libs/index.js';
    import { formatExhibitFields } from '../libs/exhibits_data_helpers.js';

    import Site_Branding from '../templates/partials/Site_Branding.svelte';
    import Exhibits_Explore_Search from '../templates/partials/Exhibits_Explore_Search.svelte';
    // import Site_Branding_Search from '../templates/partials/Site_Branding_Search.svelte';
    import Exhibit_Preview_Title_Grid from '../templates/partials/Exhibit_Preview_Title_Grid.svelte';

    export let currentRoute;

    let _exhibits = [];
    let _searchData;
    let _searchFields;
    var _filters = [];
    
    var message;

    const FILTERS = {
        "keyword": {
            "name": "keyword",
            "label": "Keywords",
            "field": ""
        },

        "student_curated": {
            "name": "student_curated",
            "label": "Student Curated",
            "field": "is_student_curated"
        }
    }

    const init = async () => {
        _searchFields = Object.keys(Settings.searchFields);
        _searchData = {
            endpoint: "/exhibits-explore",
            queryParam: "keyword",
            placeholder: "Filter by keyword"
        }

        message = "Retrieving exhibits...";
        _exhibits = await Index.getExhibits(); 

        if(_exhibits) {
            render();
        }
        else {
            message = "Error retrieving exhibits";
        }
    }

    const render = async () => {
        if(_exhibits.length > 0) {
            formatExhibitFields(_exhibits);

            let {queryParams} = currentRoute;
            if(queryParams.keyword) {
                _filters.push({
                    keyword: queryParams.keyword || ""
                });
            }

            applyFilters();
        }
        else {
            message = "No exhibits found."
        }
    }

    const applyFilters = () => {
        _filters.forEach(filter => {

            if(Object.keys(filter)[0] == FILTERS.keyword.name) {
                _exhibits = filterKeyword(filter['keyword'], _searchFields);
            }

            // field filter
            // TODO else filter key in exhibit data on value in filter obj

            // TODO render the breadcrumb display with filter.name (get label from filters obj) filter.value 
            // TODO filter {name,value} is 1. pushed in render() if keyword 2. pushed by addFilter() after clicking filter on list
        });
    }

    const filterKeyword = (terms, fields) => {
        let exhibits;

        terms = terms.toLowerCase();

        let matches;
        exhibits = _exhibits.filter((exhibit) => {
            matches = 0;

            for(let field of fields) {
                if(exhibit[field].toLowerCase().indexOf(terms) >= 0) {
                    matches++;
                }
            }

            return matches > 0;
        });

        return exhibits;
    }

    const filterField = () => {}

    init();

    onMount(async () => {});
</script>

<!-- search box on page -->
<Site_Branding />

<div class="exhibits-home">
    <div class="page">
        <div class="container">

            {#if _exhibits && _exhibits.length > 0}
                <div class="search">
                    <!-- search box in exhibits@du header -->
                    <Exhibits_Explore_Search data={_searchData} />
                </div>
                
                <div class="exhibit-previews">
                    <div class="homepage-section">
                        <Exhibit_Preview_Title_Grid exhibits={_exhibits} />
                    </div>
                </div>

            {:else}
                <div class="message">
                    {message}
                </div>
            {/if}

        </div>
    </div>
</div>

<style>
    .exhibit-previews {
        margin-top: 50px;
    }
</style>