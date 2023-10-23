<!-- homepage option with no hero image -->

<script>
    'use strict'

    import { onMount } from 'svelte';
    import { Index } from '../libs/index.js';
    import { Settings } from '../config/settings.js';

    import Search_Box from '../components/Search_Box.svelte';
    import Exhibit_Preview_Grid from '../templates/Exhibit_Preview_Grid.svelte';

    var exhibits = null;
    var message = "";
    var featuredExhibits = null;
    var recentExhibits = null;
    var exhibitSearchFields;
    
    const init = async () => {
        exhibitSearchFields = Settings.searchFieldsExhibit || [];
        message = "Loading exhibits...";
        exhibits = await Index.getExhibits();

        if(exhibits) render();
        else message = "Could not retrieve exhibits";
    }

    const render = () => {
        if(exhibits?.length > 0) {
            featuredExhibits = getFeaturedExhibits(exhibits);
            recentExhibits = getRecentExhibits(exhibits);
        }
        else {
            message = "No exhibits found";
        }
    }

    const getFeaturedExhibits = (exhibits) => {
        let featured = exhibits.filter((exhibit) => {
            return exhibit.is_featured || false;
        });

        return featured.length > 0 ? featured : null;
    }

    const getRecentExhibits = (exhibits) => {
        let recents = exhibits.filter((exhibit) => {
            // TODO initially: get current date, filter on last 60 days, sort by date descending
            return false;
        });

        // DEV
        recents.push(exhibits[3])
        recents.push(exhibits[1])
        recents.push(exhibits[4])
        // end DEV

        return recents.length > 0 ? recents : null;
    }

    onMount(async () => {
        init();
    });
</script>

<div class="homepage page">
    <div class="container">
        {#if featuredExhibits}
            <div class="row heading">
                <div class="col-md-6">
                    <h3>Featured</h3>
                </div>
                <div class="col-md-6">
                    <div class="exhibits-search">
                        <Search_Box endpoint="/search" fields={exhibitSearchFields} placeholder="Search exhibits"/>
                        <!-- DEV test item search. this is an 'exhibit' entity search (on home page) -->
                        <!-- <Search_Box endpoint="/search" params={{entity: "item", id: "2"}}/> -->
                        <!-- end DEV -->
                    </div>
                </div>
            </div>
            <div class="row preview-section">
                <div class="col-lg-12">
                    <Exhibit_Preview_Grid exhibits={featuredExhibits} />
                </div>
            </div>
        {/if}

        {#if recentExhibits}
            <div class="row heading">
                <div class="col-lg-12">
                    <h3>Just Added</h3>
                </div>
            </div>
            <div class="row preview-section">
                <div class="col-lg-12">
                    <Exhibit_Preview_Grid exhibits={recentExhibits} />
                </div>
            </div>
        {/if}

        {#if exhibits && exhibits.length > 0}
            <div class="row heading">
                <div class="col-lg-12">
                    <h3>Exhibits</h3>
                </div>
            </div>
            <div class="row preview-section">
                <div class="col-lg-12">
                    <Exhibit_Preview_Grid {exhibits} />
                </div>
            </div>
        {:else}
            <h6>{message}</h6>
        {/if}
    </div>
</div>

<style>
    .homepage .row {
        margin-bottom: 50px;
    }

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

    .featured > .container {
        padding: 0;
    }
</style>