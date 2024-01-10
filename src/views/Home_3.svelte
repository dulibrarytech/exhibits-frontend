<!-- homepage option with no hero image -->

<script>
    'use strict'

    import { onMount } from 'svelte';
    import { Index } from '../libs/index.js';
    import { Settings } from '../config/settings.js';
    import { stripHtmlTags } from '../libs/data_helpers';

    import Search_Box from '../components/Search_Box.svelte';
    import Exhibit_Preview_Grid from '../templates/Exhibit_Preview_Grid.svelte';

    let exhibits = null;
    let featuredExhibits = null;
    let recentExhibits = null;
    let publicExhibits = null;
    var message = "";
    
    const init = async () => {
        message = "Retrieving exhibits...";
        exhibits = await Index.getExhibits();

        if(exhibits) render();
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
        {#if featuredExhibits}
            <div class="row heading">
                <div class="col-md-6">
                    <h3>Featured</h3>
                </div>
                <div class="col-md-6">
                    <div class="exhibits-search">
                        <Search_Box endpoint="/search" fields={Settings.searchFieldsExhibit} placeholder="Search exhibits"/>
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
                    <h3>Recently Added</h3>
                </div>
            </div>
            <div class="row preview-section">
                <div class="col-lg-12">
                    <Exhibit_Preview_Grid exhibits={recentExhibits} />
                </div>
            </div>
        {/if}

        {#if publicExhibits && publicExhibits.length > 0}
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
</style>