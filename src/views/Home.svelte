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

<style>
    .homepage > .row {
        margin-bottom: 24px;
    }
</style>