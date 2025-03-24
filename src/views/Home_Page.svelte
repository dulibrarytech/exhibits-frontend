<svelte:head>
	<title>{Settings.appTitle}</title>
</svelte:head>

<script>
    'use strict'

    import { onMount } from 'svelte';
    import { navigateTo } from 'svelte-router-spa'
    import { Index } from '../libs/index.js';
    import { Settings } from '../config/settings.js';
    import { formatExhibitFields } from '../libs/exhibits_data_helpers.js';
    import { Cache } from '../libs/cache.js';

    import Search_Box from '../components/Search_Box.svelte';
    import Exhibit_Preview_Grid from '../templates/partials/Exhibit_Preview_Grid.svelte';

    export let currentRoute;

    let exhibits = null;
    let featuredExhibits = null;
    let recentExhibits = null;
    let publicExhibits = null;
    let searchFields = [];

    var message = "";

    const EXHIBIT_FIELDS = {
        TITLE: "title",
        IS_FEATURED: "is_featured",
        IS_PUBLISHED: "is_published",
        IS_STUDENT: "is_student_curated",
        CREATED: "created"
    }
    
    const init = async () => {
        searchFields = Object.keys(Settings.searchFields);
        message = "Retrieving exhibits...";
        exhibits = await Index.getExhibits();

        if(exhibits) {
            // remove unpublished exhibits
            exhibits = exhibits.filter((exhibit) => {
                return exhibit[EXHIBIT_FIELDS.IS_PUBLISHED] || false;
            });

            // remove student curated exhibits
            exhibits = exhibits.filter((exhibit) => {
                return !exhibit[EXHIBIT_FIELDS.IS_STUDENT] || exhibit[EXHIBIT_FIELDS.IS_STUDENT] == false;
            });

            Cache.storeExhibits(exhibits);

            render();
        }
        else message = "Error retrieving exhibits";
    }

    const render = () => {
        if(exhibits?.length > 0) {
            message = "Loading exhibits...";

            formatExhibitFields(exhibits);

            featuredExhibits = getFeaturedExhibits();
            recentExhibits = getRecentExhibits();
            publicExhibits = exhibits;
        }
        else {
            message = "No exhibits found";
        }
    }

    const getFeaturedExhibits = () => {
        let featured = exhibits.filter((exhibit) => {
            return exhibit[EXHIBIT_FIELDS.IS_FEATURED] || false;
        });

        return featured.length > 0 ? featured : null;
    }

    const getRecentExhibits = () => {
        let recentExhibits = [];

        let minDate = new Date().setDate(new Date().getDate() - Settings.recentExhibitsPeriod)

        recentExhibits = exhibits.filter((exhibit) => {
            if(exhibit[EXHIBIT_FIELDS.CREATED] && new Date(exhibit[EXHIBIT_FIELDS.CREATED]) >= minDate) return true;
            else return false;

        }).sort(function(a, b) {
            return new Date(b[EXHIBIT_FIELDS.CREATED]) - new Date(a[EXHIBIT_FIELDS.CREATED]);
        });

        return recentExhibits.length > 0 ? recentExhibits : null;
    }

    onMount(async () => {
        if(currentRoute.path == '/') navigateTo('/exhibits');
        init();
    });
</script>

<div class="homepage page">

    <!-- TODO move to separate component "Homepage_Navbar" -->
    <div class="d-flex flex-column flex-md-row align-items-center p-3">
        <div class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
            <Search_Box endpoint="/search" fields={searchFields} placeholder="Search exhibits"/>
        </div>
    </div>

    <div class="container">

        {#if featuredExhibits}
            <div class="heading">
                <h3>Featured Exhibits</h3>
            </div>
            <div class="preview-section">
                <Exhibit_Preview_Grid exhibits={featuredExhibits} />
            </div>
        {/if}

        {#if recentExhibits}
            <div class="heading">
                <h3>Recently Added</h3>
            </div>
            <div class="preview-section">
                <Exhibit_Preview_Grid exhibits={recentExhibits} />
            </div>
        {/if}

        {#if publicExhibits && publicExhibits.length > 0}
            <div class="heading">
                <h3>Explore Exhibits</h3>
            </div>
            <div class="preview-section">
                <Exhibit_Preview_Grid {exhibits} />
            </div>
        {:else}
            <div class="message">
                <h6>{message}</h6>
            </div>
        {/if}
    </div>
</div>

<style>
    .homepage h3 {
        color: #030303;
    }
    
    .homepage .container {
        width: 95%;
        margin: 0 auto;
        margin-top: 50px;
    }

    .exhibits-search-wrapper {
        
    }

    .message {
        margin-top: 78px;
    }

    .preview-section {
        margin-bottom: 65px;
    }

    @media screen and (min-width: 480px) {

    }

    @media screen and (min-width: 576px) {

    }

    @media screen and (min-width: 768px) {

    }

    @media screen and (min-width: 992px) {

    }

    @media screen and (min-width: 1280px) {

    }
</style>