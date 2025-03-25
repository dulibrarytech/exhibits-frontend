<svelte:head>
	<title>{Settings.appTitle}</title>
</svelte:head>

<script>
    'use strict'

    import { onMount } from 'svelte';
    import { navigateTo } from 'svelte-router-spa';
    import { Settings } from '../config/settings.js';
    import { Index } from '../libs/index.js';
    import { formatExhibitFields } from '../libs/exhibits_data_helpers.js';

    import Homepage_Hero from '../components/Homepage_Hero.svelte';
    import Exhibit_Preview_Grid from '../templates/partials/Exhibit_Preview_Grid.svelte';
    import Exhibit_Preview_Title_Grid from '../templates/partials/Exhibit_Preview_Title_Grid.svelte';
    import Exhibit_Preview_Slider from '../components/Exhibit_Preview_Slider.svelte';
    import Search_Box from '../components/Search_Box.svelte';

    export let currentRoute;

    let exhibits;
    let highlightExhibit;
    let featuredExhibits;
    let searchFields = [];

    var message = "";

    const FONT_COLOR = "#818181";
    const FEATURED_EXHIBITS_DISPLAY = "grid";

    const EXHIBIT_FIELDS = {
        TITLE: "title",
        IS_FEATURED: "is_featured",
        IS_PUBLISHED: "is_published",
        IS_STUDENT: "is_student_curated",
        CREATED: "created"
    }

    const init = async () => {
        searchFields = Object.keys(Settings.searchFields);
        highlightExhibit = {};
        featuredExhibits = null;

        message = "Retrieving exhibits...";
        exhibits = await Index.getExhibits(); 

        if(exhibits) {
            render();
        }
        else {
            message = "Error retrieving exhibits";
        }
    }

    const render = async () => {
        if(exhibits.length > 0) {
            formatExhibitFields(exhibits);

            // sort exhibits, get most recent and assign to highlight. Then, set background property
            highlightExhibit = exhibits.sort(function(a, b) {
                return b.created - a.created;
            })[0];

            featuredExhibits = exhibits.filter((exhibit) => {
                return exhibit[EXHIBIT_FIELDS.IS_FEATURED] || false;
            });

        }
        else {
            message = "No exhibits found."
        }
    }

    onMount(async () => {
        if(currentRoute.path == '/') navigateTo('/exhibits-home');
        init();
    })
</script>

<div class="exhibits-home">

    <div class="container page-description">
        <p>
            Discover curated stories, collections, and creative projects from the University’s Libraries.<br>
            These exhibits bring together unique materials and fresh perspectives to inspire discovery, reflection, and connection.
        </p>
    </div>

    <div class="page">

        <div class="container">
            <div class="row homepage-section search">

                <!-- explore all link might be removed TBD -->
                <div class="col-sm-12 col-md-2">
                    <a href="/exhibits-explore">Explore All Exhibits</a>
                </div>

                <div class="col-sm-12 col-md-10">
                    <Search_Box endpoint="/search" fields={Settings.searchFields} placeholder="Search exhibits" />
                </div>
                
            </div>
            
            {#if featuredExhibits && featuredExhibits.length > 0}
                <div class="exhibit-previews">

                    <hr>
                    <div class="homepage-section">
                        <div class="heading">
                            <h3>Featured Exhibits</h3>
                        </div>

                        {#if FEATURED_EXHIBITS_DISPLAY == "slider"}
                            <Exhibit_Preview_Slider exhibits={featuredExhibits} images="3" scroll="1" />
                        {:else if FEATURED_EXHIBITS_DISPLAY == "grid"}
                            <Exhibit_Preview_Title_Grid exhibits={featuredExhibits} />
                        {/if}
                    </div>

                </div>
                
            {:else}
                <div class="message">
                    <h6>{message}</h6>
                </div>
            {/if}
        </div>

    </div>
</div>

<style>
    .message {
        margin-top: 100px;
    }

    .exhibits-home {
        color: var(--theme-FONT_COLOR);
    }

    .page-description {
        margin-top: 30px;
    }

    .exhibits-home .container {
        padding-left: 0;
        padding-right: 0;
    }

    .exhibit-previews {
        padding: 50px 0;
    }

    /* .homepage-section:not(:first-child) { */
    .homepage-section {
        margin-top: 50px;
    }

    .homepage-section a {
        text-decoration: underline;
        position: relative;
        top: 5px;
        font-size: 18px;
    }

    .search {
        /* width: 100%;
        margin-left: auto;
        margin-right: auto; */
        margin-top: 0;
    }

    @media screen and (min-width: 575px) {
        /* .search {
            width: 80%;
        } */
    }

    @media screen and (min-width: 575px) {
        .exhibits-home .container {
            /* padding-left: 0;
            padding-right: 0; */
        }
    }
</style>