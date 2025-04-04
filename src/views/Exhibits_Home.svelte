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

    import Site_Branding_Search from '../templates/partials/Site_Branding_Search.svelte';
    import Homepage_Hero from '../components/Homepage_Hero.svelte';
    import Exhibit_Preview_Title_Grid from '../templates/partials/Exhibit_Preview_Title_Grid.svelte';
    import Exhibit_Preview_Slider from '../components/Exhibit_Preview_Slider.svelte';

    export let currentRoute;

    let exhibits;
    let highlightExhibit;
    let featuredExhibits;
    let studentCuratedExhibits;
    let searchData;

    var message = "";

    const FONT_FAMILY = "Breve Sans";
    const FONT_COLOR = '#525252';
    const HERO_DISPLAY = false;
    const EXHIBITS_DISPLAY = "grid";

    const EXHIBIT_FIELDS = Settings.exhibitDataFields;

    const init = async () => {
        searchData = {
            endpoint: "/exhibits-explore",
            queryParam: "terms",
            placeholder: "Search Exhibits",
            fields: Object.keys(Settings.searchFields),
            params: {
                "filter": "keyword"
            },
        }

        highlightExhibit = null;
        featuredExhibits = null;
        studentCuratedExhibits = null;

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

            highlightExhibit = exhibits.sort(function(a, b) {
                return b.created - a.created;
            })[0];

            featuredExhibits = exhibits.filter((exhibit) => {
                return exhibit[EXHIBIT_FIELDS.IS_FEATURED] || false;
            });

            studentCuratedExhibits = exhibits.filter((exhibit) => {
                return exhibit[EXHIBIT_FIELDS.IS_STUDENT] || false;
            });
        }
        else {
            message = "No exhibits found."
        }
    }

    init();

    onMount(async () => {
        if(currentRoute.path == '/') navigateTo('/exhibits-home');
    })
</script>

<div class="exhibits-home">

    <Site_Branding_Search data={searchData} />

    {#if HERO_DISPLAY}
        <div class="hero-banner">
            <Homepage_Hero exhibit={highlightExhibit || {}} />
        </div>
    {/if}

    <div class="page">

        <div class="container">
            <div class="page-description">
                <p>Discover curated stories, collections, and creative projects from the University Libraries.</p>
                <p>These exhibits bring together unique materials and fresh perspectives to inspire discovery, reflection, and connection.</p>
            </div>
            
            {#if exhibits && exhibits.length > 0}

                <div class="exhibit-previews">
                    {#if featuredExhibits && featuredExhibits.length > 0}
                        <hr>
                        <div class="homepage-section">
                            <div class="heading">
                                <h2>Featured Exhibits</h2>
                            </div>

                            {#if EXHIBITS_DISPLAY == "slider"}
                                <Exhibit_Preview_Slider exhibits={featuredExhibits} images="3" scroll="1" />
                            {:else if EXHIBITS_DISPLAY == "grid"}
                                <Exhibit_Preview_Title_Grid exhibits={featuredExhibits} limit="4" />
                            {/if}
                        </div>
                    {/if}
                    {#if studentCuratedExhibits && studentCuratedExhibits.length > 0}
                        <hr>
                        <div class="homepage-section">
                            <div class="heading">
                                <h2>Student Curated Exhibits</h2>
                            </div>

                            {#if EXHIBITS_DISPLAY == "slider"}
                                <Exhibit_Preview_Slider exhibits={studentCuratedExhibits} images="3" scroll="1" />
                            {:else if EXHIBITS_DISPLAY == "grid"}
                                <Exhibit_Preview_Title_Grid exhibits={studentCuratedExhibits} limit="4" />
                            {/if}
                        </div>
                    {/if}
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
    @font-face {
        font-family: "Neue Haas Grotesk Text Pro";
        src: url('../assets/fonts/NeueHaasGroteskTextPro.ttf') format("truetype");
    }

    .exhibits-home {
        font-family: "Neue Haas Grotesk Text Pro";
        /* font-family: var(--theme-FONT_FAMILY); */
        /* color: var(--theme-FONT_COLOR); */
        font-size: 18px;
        letter-spacing: 0.02em;
    }

    .site-branding-banner {
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: #e5e3e1;
    }

    .message {
        margin-top: 100px;
        font-size: 18px;
    }

    .page-description p:last-child {
        margin-bottom: 0;
    }

    .exhibit-previews {
        padding: 50px 0;
    }

    .homepage-section {
        margin-top: 50px;
        margin-bottom: 50px;
    }

    @media screen and (min-width: 575px) {

    }

    @media screen and (min-width: 575px) {

    }
</style>