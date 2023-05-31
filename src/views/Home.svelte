<script>
    import { onMount } from 'svelte';
    import { Index } from '../libs/index.js';

    import Hero_Slider from '../components/Hero_Slider.svelte';
    import Exhibit_Preview_Grid from '../templates/homepage/Exhibit_Preview_Grid.svelte';

    var exhibits = null;
    var featured = null;

    const render = async () => {
        exhibits = await Index.getExhibits();

        if(exhibits.length == 0) {
            console.log("No exhibits found");
        }
        else {
            featured = getFeaturedExhibits(exhibits);
        }
    }

    const getFeaturedExhibits = (exhibits) => {
        return exhibits.filter((exhibit) => {
            return exhibit.is_featured || false;
        });
    }

    onMount(async () => {
        render();
    });
</script>

<div class="homepage"> <!-- TODO add bootstrap grid -->

    <div class="row">
        {#if featured}
            <div class="col-lg-12">
                <Hero_Slider items={featured} />
            </div>
        {/if}
    </div>

    <div class="container">
        <div class="row heading">
            <h3>Exhibits @ DU</h3>
        </div>

        <div class="row">
            {#if exhibits}
                <div class="col-lg-12">
                    <Exhibit_Preview_Grid {exhibits} />
                </div>
            {:else}
                <h6>No exhibits found</h6>
            {/if}
        </div>
    </div>
</div>

<style>
    .homepage .row {
        margin-bottom: 24px;
    }

    .homepage .row>* {
        padding-left: 0;
        padding-right: 0;
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
</style>