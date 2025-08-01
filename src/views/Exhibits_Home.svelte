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
    let _highlightExhibit;
    let _featuredExhibits;
    let _studentCuratedExhibits;
    let _searchData;

    var message = "";

    const HERO_DISPLAY = false;
    const SHOW_STUDENT_CURATED_EXHIBITS = false;
    const EXHIBITS_DISPLAY = "grid";
    const EXHIBIT_FIELDS = Settings.exhibitDataFields;

    const init = async () => {
        _exhibits = null;

        _searchData = {
            endpoint: "/exhibits-explore",
            queryParam: "keyword",
            buttonText: "Filter",
            placeholder: "Filter by keyword"
        }

        _highlightExhibit = null;
        _featuredExhibits = null;
        _studentCuratedExhibits = null;
    }

    const render = async () => {
        if(_exhibits.length > 0) {

            _highlightExhibit = _exhibits.sort(function(a, b) {
                return b.created - a.created;
            })[0];

            _featuredExhibits = _exhibits.filter((exhibit) => {
                return exhibit[EXHIBIT_FIELDS.IS_FEATURED] || false;
            });

            _studentCuratedExhibits = _exhibits.filter((exhibit) => {
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

        message = "Retrieving exhibits...";
        _exhibits = await Index.getExhibits(); 

        if(_exhibits) render();
        else message = "Error retrieving exhibits";
    })
</script>

<div class="exhibits-home">

    <Site_Branding_Search data={_searchData} args={{isPageHeading: true}} />

    {#if HERO_DISPLAY}
        <div class="hero-banner">
            <Homepage_Hero exhibit={_highlightExhibit || {}} />
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
                    {#if _featuredExhibits?.length > 0}
                        <hr>
                        <div class="homepage-section">
                            <div class="heading">
                                <h1>Featured Exhibits</h1>

                                <a href="/exhibits-explore">View More</a>
                            </div>

                            {#if EXHIBITS_DISPLAY == "slider"}
                                <Exhibit_Preview_Slider exhibits={_featuredExhibits} images="3" scroll="1" />
                            {:else if EXHIBITS_DISPLAY == "grid"}
                                <Exhibit_Preview_Grid exhibits={_featuredExhibits} args={{limit: 4, showTitle: true}} />
                            {/if}
                        </div>
                    {/if}
                    {#if SHOW_STUDENT_CURATED_EXHIBITS && _studentCuratedExhibits?.length > 0}
                        <hr>
                        <div class="homepage-section">
                            <div class="heading">
                                <h1>Student Curated Exhibits</h1>

                                <a href="/exhibits-explore">View More</a>
                            </div>

                            {#if EXHIBITS_DISPLAY == "slider"}
                                <Exhibit_Preview_Slider exhibits={_studentCuratedExhibits} images="3" scroll="1" />
                            {:else if EXHIBITS_DISPLAY == "grid"}
                                <Exhibit_Preview_Grid exhibits={_studentCuratedExhibits} args={{limit: 4, showTitle: true}} />
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
        padding: 50px 0 100px 0;
    }

    .exhibit-previews hr:first-child {
        margin-top: 0;
    }

    .homepage-section {
        margin-top: 50px;
        margin-bottom: 50px;
    }

    .homepage-section .heading {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 50px;
        row-gap: 20px;
    }

    .homepage-section .heading h1 {
        margin-bottom: 0;
    }

    .homepage-section .heading a {
        text-decoration: underline;
        color: #71190E;
        font-family: "IBM Plex Mono";
    }

    :global(.exhibits-home .homepage-section .exhibit-preview-grid) {
        justify-content: space-between !important;
    }

    @media screen and (min-width: 480px) {
        .homepage-section .heading {
            flex-direction: row;
        }
    }
</style>