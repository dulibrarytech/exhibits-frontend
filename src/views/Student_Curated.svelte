<script>
    'use-strict'

    import { onMount } from 'svelte';
    import { formatExhibitFields } from '../libs/exhibits_data_helpers.js';
    import { Index } from '../libs/index.js';
    import { Cache } from '../libs/cache.js';

    import Exhibit_Preview_Grid from '../templates/partials/Exhibit_Preview_Grid.svelte';

    var message = "";
    let exhibits = null;

    const EXHIBIT_FIELDS = {
        IS_PUBLISHED: "is_published",
        IS_STUDENT: "is_student_curated"
    }

    const init = async () => {
        message = "Retrieving exhibits...";
        exhibits = await Index.getExhibits();

        if(exhibits) {
            exhibits = exhibits.filter((exhibit) => {
                return exhibit[EXHIBIT_FIELDS.IS_PUBLISHED] || false;
            });

            exhibits = exhibits.filter((exhibit) => {
                return exhibit[EXHIBIT_FIELDS.IS_STUDENT] == true;
            });

            Cache.storeExhibits(exhibits);

            render();
        }
        else message = "Error retrieving exhibits";
    }

    const render = () => {
        if(exhibits?.length > 0) {
            message = "Loading exhibits...";
            formatExhibitFields(exhibits);
        }
        else {
            message = "No exhibits found";
        }
    }

    onMount(async () => {
        init();
    });
</script>

<div class="student-curated page">
    <div class="container">

        <div class="page-content">
            <h3>Student Curated Exhibits</h3>

            {#if exhibits && exhibits.length > 0}
                <div class="preview-section">
                    <Exhibit_Preview_Grid {exhibits} />
                </div>
            {:else}
                <h6>{message}</h6>
            {/if}
        </div>

    </div>
</div>

<style>
    
</style>