<script>
    export let currentRoute;

    let results = null;
    let terms;
    let boolean;
    let fields;
    let exhibitId;

    const init = () => {
        console.log("TEST init Search page: currte:", currentRoute) 

        // extract vals from rte data
        terms = currentRoute.queryParams.q || "";
        boolean = currentRoute.queryParams.bool || "and";
        fields = currentRoute.queryParams.fields || "title";
        exhibitId = currentRoute.queryParams.exhibitId || null;

        console.log("TEST init Search page: terms/exhibitId:", terms, exhibitId) 

        executeSearch();

    }

    const executeSearch = () => { // have terms, boolean, fields(csv)
        // construct data object for search.js::search()

        //  invoke search.js::search() async

        // get/massage results data, assn member results[] to render <sea_Res_displ/>
    }

    $: init();
</script>

<div class="search-page page">
    <div class="search-results container">
        {#if results}
            <h3>Results for </h3>
            <!-- <Search_Results_Display results={results} /> -->
        {:else}
            <h3>No results found.</h3>
        {/if}
    </div>
</div>