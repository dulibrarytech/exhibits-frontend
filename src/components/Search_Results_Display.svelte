<script>
    'use strict'

    export let results = [];

    const render = () => {

    }

    $: render();
</script>

<div class="search-results-display">
    <div class="results">
        {#each results as result}

            <!-- TODO design search results content and layout -->

        {/each}
    </div>
</div>