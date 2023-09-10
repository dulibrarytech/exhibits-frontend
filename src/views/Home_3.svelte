<!-- homepage option with no hero image -->

<script>
    import { onMount } from 'svelte';
    import { Index } from '../libs/index.js';

    import Hero_Slider from '../components/Hero_Slider.svelte';
    import Search_Box from '../components/Search_Box.svelte';
    import Exhibit_Preview_Grid from '../templates/homepage/Exhibit_Preview_Grid.svelte';

    var exhibits = null;
    var featuredExhibits = null;
    var recentExhibits = null;

    const render = async () => {
        exhibits = await Index.getExhibits();
        console.log("TEST exhibits", exhibits)

        if(exhibits.length == 0) {
            console.log("No exhibits found");
        }
        else {
            featuredExhibits = getFeaturedExhibits(exhibits);
            recentExhibits = getRecentExhibits(exhibits);
        }

        // TODO init search box - add fields (from Settings object) set "searchData" local var?
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

        // dev
        recents.push(exhibits[2])
        recents.push(exhibits[4])
        recents.push(exhibits[6])
        recents.push(exhibits[8])

        return recents.length > 0 ? recents : null;
    }

    onMount(async () => {
        render();
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
                        <Search_Box endpoint="/search"/>
                        <!-- <Search_Box endpoint="/search" params={{exhibitId: "2"}}/> --> <!-- test -->
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

        {#if exhibits}
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
            <h6>No exhibits found</h6>
        {/if}

        <!-- <div class="row heading">
            <div class="col-md-6">
                <h3>Explore</h3>
            </div>
            <div class="col-md-6">
                <div class="exhibits-search">
                    <Search_Box />
                </div>
            </div>
        </div>

        <div class="row preview-section">
            {#if exhibits}
                <div class="col-lg-12">
                    <Exhibit_Preview_Grid {exhibits} />
                </div>
            {:else}
                <h6>No exhibits found</h6>
            {/if}
        </div> -->
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

    .featured > .container {
        padding: 0;
    }
</style>