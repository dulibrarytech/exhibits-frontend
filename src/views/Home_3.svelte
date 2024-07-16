<!-- homepage option with no hero image -->

<!-- *** main landing page - if more options for the home page template are required, create a reduced "Home_n" template (view render only, no logic), and reuse all other code in this module -->

<script>
    'use strict'

    import { onMount } from 'svelte';
    import { navigateTo } from 'svelte-router-spa'
    import { Index } from '../libs/index.js';
    import { Settings } from '../config/settings.js';
    import { stripHtmlTags } from '../libs/data_helpers';
    import { Cache } from '../libs/cache';

    import Search_Box from '../components/Search_Box.svelte';
    import Exhibit_Preview_Grid from '../templates/Exhibit_Preview_Grid.svelte';

    export let currentRoute;

    let apiKey;

    let exhibits = null;
    let featuredExhibits = null;
    let recentExhibits = null;
    let publicExhibits = null;

    let searchFields = [];

    var message = "";
    
    const init = async () => {
        apiKey = currentRoute.queryParams.key || null;

        searchFields = Object.keys(Settings.searchFields);

        message = "Retrieving exhibits...";
        exhibits = await Index.getExhibits();

        if(exhibits) {
            exhibits = exhibits.filter((exhibit) => {
                return exhibit.is_published || false;
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
            return exhibit.is_featured || false;
        });

        return featured.length > 0 ? featured : null;
    }

    const getRecentExhibits = () => {
        let recentExhibits = [];

        let minDate = new Date().setDate(new Date().getDate() - Settings.recentExhibitsPeriod)

        recentExhibits = exhibits.filter((exhibit) => {
            if(exhibit.created && new Date(exhibit.created) >= minDate) return true;
            else return false;

        }).sort(function(a, b) {
            return new Date(b.created) - new Date(a.created);
        });

        return recentExhibits.length > 0 ? recentExhibits : null;
    }

    const formatExhibitFields = (exhibits) => {
        exhibits.forEach((exhibit) => {
            exhibit.title = stripHtmlTags(exhibit.title);
        });
    }

    onMount(async () => {
        if(currentRoute.path == '/') navigateTo('/exhibits');
        init();
    });
</script>

<div class="homepage page">
    <div class="container">
        <div class="exhibits-search-wrapper">
            <div class="exhibits-search">
                <Search_Box endpoint="/search" fields={searchFields} placeholder="Search exhibits"/>
            </div>
        </div>

        {#if featuredExhibits}
            <div class="heading">
                <h3>Featured</h3>
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
                <h3>Exhibits</h3>
            </div>
            <div class="preview-section">
                <Exhibit_Preview_Grid {exhibits} />
            </div>
        {:else}
            <h6>{message}</h6>
        {/if}
    </div>
</div>

<style>
    .homepage h3 {
        color: #8b2332;
        padding: 15px 0;
        margin-bottom: 0;
    }
    
    .container {
        width: 95%;
        margin: 0 auto;
    }
    
    .exhibits-search-wrapper {
        height: 85px;
    }

    .exhibits-search {
        /* float: right; */
        position: relative;
        top: 14px;
    }

    .preview-section {
        margin-bottom: 65px;
    }

    :global(.exhibits-search > .container) {
        padding: 0;
    }

    /* begin responsive breakpoints: small mobile devices/phones first ^ */
    @media screen and (min-width: 480px) {
        /* start of portrait tablet styles */

    }

    @media screen and (min-width: 768px) {
        /* start of landscape/large tablet styles */
        .exhibits-search-wrapper {
            height: 55px;
        }

        .exhibits-search {
            float: right;
        }
    }

    @media screen and (min-width: 992px) {
        /* start of large tablet styles */

    }

    @media screen and (min-width: 1280px) {
        /* start of medium/large desktop styles */

    }

    @media screen and (min-width: 1920px) {
        /* start of extra large desktop styles */

    }
</style>