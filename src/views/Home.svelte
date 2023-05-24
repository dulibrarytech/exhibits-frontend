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
    {#if featured}
        <Hero_Slider items={featured} />
    {/if}

    {#if exhibits}
        <Exhibit_Preview_Grid {exhibits} />
    {:else}
        <h6>No exhibits found</h6>
    {/if}
</div>