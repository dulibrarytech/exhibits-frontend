<!-- homepage option with no hero image -->

<script>
    'use strict'

    import { onMount } from 'svelte';
    import { Index } from '../libs/index.js';
    import { Settings } from '../config/settings.js';
    import { stripHtmlTags } from '../libs/data_helpers';
    import { Cache } from '../libs/cache';

    import Search_Box from '../components/Search_Box.svelte';
    import Exhibit_Preview_Grid from '../templates/Exhibit_Preview_Grid.svelte';

    let exhibits = null;
    let featuredExhibits = null;
    let recentExhibits = null;
    let publicExhibits = null;

    let searchFields = [];

    var message = "";
    
    const init = async () => {
        message = "Retrieving exhibits...";
        searchFields = Object.keys(Settings.searchFields);
        
        exhibits = await Index.getExhibits();
        if(exhibits) {
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
        init();
    });
</script>

<div class="homepage page">
    <div class="container">
        <div class="exhibits-search">
            <Search_Box endpoint="/search" fields={searchFields} placeholder="Search exhibits"/>
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

    .exhibits-search {
        float: right;
        position: relative;
        top: 14px;
    }

    :global(.exhibits-search > .container) {
        padding: 0;
    }
</style>