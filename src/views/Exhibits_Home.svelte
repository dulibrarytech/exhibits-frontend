<svelte:head>
	<title>{Settings.appTitle}</title>
</svelte:head>

<script>
    'use strict'

    import { onMount } from 'svelte';
    import { navigateTo } from 'svelte-router-spa';
    import { Settings } from '../config/settings.js';
    import { Index } from '../libs/index.js';

    import Site_Branding_Search from '../templates/partials/Site_Branding_Search.svelte';
    import Homepage_Hero from '../components/Homepage_Hero.svelte';
    import Exhibit_Preview_Grid from '../templates/partials/Exhibit_Preview_Grid.svelte';
    import Exhibit_Preview_Slider from '../components/Exhibit_Preview_Slider.svelte';

    export let currentRoute;

    let _exhibits;
    let highlightExhibit;
    let featuredExhibits;
    let studentCuratedExhibits;
    let searchData;

    var message = "";

    const HERO_DISPLAY = false;
    const EXHIBITS_DISPLAY = "grid";
    const EXHIBIT_FIELDS = Settings.exhibitDataFields;

    const init = async () => {
        _exhibits = null;

        searchData = {
            endpoint: "/exhibits-explore",
            queryParam: "keyword",
            buttonText: "Filter",
            placeholder: "Filter by keyword"
        }

        highlightExhibit = null;
        featuredExhibits = null;
        studentCuratedExhibits = null;

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

            highlightExhibit = _exhibits.sort(function(a, b) {
                return b.created - a.created;
            })[0];

            featuredExhibits = _exhibits.filter((exhibit) => {
                return exhibit[EXHIBIT_FIELDS.IS_FEATURED] || false;
            });

            studentCuratedExhibits = _exhibits.filter((exhibit) => {
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

    <Site_Branding_Search data={searchData} args={{isPageHeading: true}} />

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
            
            {#if _exhibits && _exhibits.length > 0}

                <div class="exhibit-previews">
                    {#if featuredExhibits && featuredExhibits.length > 0}
                        <hr>
                        <div class="homepage-section">
                            <div class="heading">
                                <h1>Featured Exhibits</h1>
                            </div>

                            {#if EXHIBITS_DISPLAY == "slider"}
                                <Exhibit_Preview_Slider exhibits={featuredExhibits} images="3" scroll="1" />
                            {:else if EXHIBITS_DISPLAY == "grid"}
                                <Exhibit_Preview_Grid exhibits={featuredExhibits} args={{limit: 4, showTitle: true}} />
                            {/if}
                        </div>
                    {/if}
                    {#if studentCuratedExhibits && studentCuratedExhibits.length > 0}
                        <hr>
                        <div class="homepage-section">
                            <div class="heading">
                                <h1>Student Curated Exhibits</h1>
                            </div>

                            {#if EXHIBITS_DISPLAY == "slider"}
                                <Exhibit_Preview_Slider exhibits={studentCuratedExhibits} images="3" scroll="1" />
                            {:else if EXHIBITS_DISPLAY == "grid"}
                                <Exhibit_Preview_Grid exhibits={studentCuratedExhibits} args={{limit: 4, showTitle: true}} />
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
        font-family: "Breve Sans Text";
        src: url('../assets/fonts/BreveSansTextLight.otf') format("truetype");
    }

    .exhibits-home {
        font-size: 18px;
        letter-spacing: 0.02em;
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

    .exhibit-previews hr:first-child {
        margin-top: 0;
    }

    .homepage-section {
        margin-top: 50px;
        margin-bottom: 50px;
    }
</style>