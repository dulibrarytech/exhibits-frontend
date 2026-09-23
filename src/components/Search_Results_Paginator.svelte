<script>
    /*
     * template downloaded from: https://www.bootdey.com/snippets/view/Search-users-page-result
     */
    import { createEventDispatcher } from 'svelte';
    import { create } from '../libs/paginator';

    export let resultsPage = [];
    export let params = {};

    const dispatch = createEventDispatcher();

    var paginator = null;
    
    var pageNumber;
    let resultsPerPage;
    let totalResults;
    var path;

    $: {
        init();
    }

    const init = () => {
        pageNumber = params.pageNumber ?? 1;
        resultsPerPage = params.resultsPerPage || 10;
        totalResults = params.totalResults ?? 0;
        path = window.location.href;
        paginator = create(resultsPage, pageNumber, resultsPerPage, totalResults, path);
    }

    const onClickLink = (event) => {
        dispatch('click-paginator-link', {page: event.target.getAttribute('data-page'), url: event.target.href})
    }
</script>

{#if resultsPage.length > 0}

    <div class="search-results-paginator text-align-center">
        {#if paginator.totalHits > 0}
            <p>Showing <strong>{paginator.beginCount} -<span class="hidden">through</span> {paginator.pageHits}</strong> of <strong>{paginator.totalHits}</strong> results.</p>
        {/if}

        <ul class="pagination pagination-sm">
            {#if paginator.buttons.first}<li><button aria-label="Go to First Page" data-page={1} on:click={onClickLink}>First</button></li>{/if}
            {#if paginator.buttons.prev}<li><button aria-label="Go to Previous Page" data-page={pageNumber-1} on:click={onClickLink}>Previous</button></li>{/if}

            {#if paginator.firstPageLink > 0}
                {#each Array.from({length: paginator.lastPageLink - paginator.firstPageLink + 1}, (_, i) => i + paginator.firstPageLink) as page}

                    <li class={paginator.page == page ? "active" : undefined}>
                        <button aria-label="Go to Page {page}" data-page={page} aria-current={paginator.page == page ? 'page' : undefined} on:click={onClickLink}>
                            {page}
                        </button>
                    </li>

                {/each}
            {/if}

            {#if paginator.buttons.next}<li><button aria-label="Go to Next Page" data-page={pageNumber+1} on:click={onClickLink}>Next</button></li>{/if}
            {#if paginator.buttons.last}<li><button aria-label="Go to Last Page" data-page={paginator.lastPageLink} on:click={onClickLink}>Last</button></li>{/if}
        </ul>
    </div>
{/if}

<style>
    .text-align-center {
        text-align: center;
    }

    .pagination {
        display: inline-block;
        padding-left: 0;
        margin: 20px 0;
        border-radius: 4px;
    }

    .pagination>li {
        display: inline;
    }

    .pagination-sm>li:first-child>button, .pagination-sm>li:first-child>span {
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
    }

    .pagination>li:first-child>button, .pagination>li:first-child>span {
        margin-left: 0;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    .pagination>.disabled>button, .pagination>.disabled>button:focus, .pagination>.disabled>button:hover, .pagination>.disabled>span, .pagination>.disabled>span:focus, .pagination>.disabled>span:hover {
        color: #777;
        cursor: not-allowed;
        background-color: #fff;
        border-color: #ddd;
    }

    .pagination-sm>li>button, .pagination-sm>li>span {
        padding: 5px 10px;
        font-size: 16px;
        line-height: 1.5;
    }

    .pagination>li>button, .pagination>li>span {
        position: relative;
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        color: #337ab7;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #ddd;
    }

    .pagination>.active>button, .pagination>.active>button:focus, .pagination>.active>button:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover {
        z-index: 3;
        color: #fff;
        cursor: default;
        background-color: #337ab7;
        border-color: #337ab7;
    }
</style>