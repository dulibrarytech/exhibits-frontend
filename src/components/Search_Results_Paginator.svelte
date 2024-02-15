<script>
    /*
     * template downloaded from: https://www.bootdey.com/snippets/view/Search-users-page-result
     */
    import { createEventDispatcher } from 'svelte';
    import { create } from '../libs/paginator';

    export let resultPage = [];
    export let params = {};

    const dispatch = createEventDispatcher();

    var paginator = null;
    
    var pageNumber;
    let resultsPerPage;
    let totalResults;
    var path;

    $: render();

    const render = () => {
        pageNumber = parseInt(params.pageNumber) ?? 1;
        resultsPerPage = params.resultsPerPage || 10;
        totalResults = params.totalResults ?? 0;
        path = window.location.href;

        paginator = create(resultPage, pageNumber, resultsPerPage, totalResults, path);
    }

    const onClickLink = (event) => {
        dispatch('click-paginator-link', {url: event.target.href})
    }
</script>

{#if resultPage.length > 0}
<div class="search-results-paginator text-align-center">
    <ul class="pagination pagination-sm">
        
        {#if paginator.totalHits > 0}
            <p>Showing <strong>{paginator.beginCount} - {paginator.pageHits}</strong> of <strong>{paginator.totalHits}</strong> results.</p>
        {/if}

        {#if paginator.buttons.first}<li><a href={paginator.path.first} title="Go to First Page" on:click={onClickLink}>First</a></li>{/if}
        {#if paginator.buttons.prev}<li><a href={paginator.path.prev} title="Go to Previous Page" on:click={onClickLink}>Previous</a></li>{/if}

        {#if paginator.firstPageLink > 0}
            {#each Array((paginator.lastPageLink+1) - paginator.firstPageLink) as _, index (index)}

                <li>
                    <a href={`${paginator.path.current}page=${index+1}`} title="Go to Page {index+1}" on:click={onClickLink}>
                        {#if paginator.page == index+1}
                            <strong class="highlight-page-link active">{index+1}</strong>
                        {:else}
                            {index+1}
                        {/if}
                    </a>
                </li>

            {/each}
        {/if}

        {#if paginator.buttons.next}<li><a href={paginator.path.next} title="Go to Next Page" on:click={onClickLink}>Next</a></li>{/if}
        {#if paginator.buttons.last}<li><a href={paginator.path.last} title="Go to Last Page" on:click={onClickLink}>Last</a></li>{/if}

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

    .pagination-sm>li:first-child>a, .pagination-sm>li:first-child>span {
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
    }

    .pagination>li:first-child>a, .pagination>li:first-child>span {
        margin-left: 0;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    .pagination>.disabled>a, .pagination>.disabled>a:focus, .pagination>.disabled>a:hover, .pagination>.disabled>span, .pagination>.disabled>span:focus, .pagination>.disabled>span:hover {
        color: #777;
        cursor: not-allowed;
        background-color: #fff;
        border-color: #ddd;
    }

    .pagination-sm>li>a, .pagination-sm>li>span {
        padding: 5px 10px;
        font-size: 12px;
        line-height: 1.5;
    }

    .pagination>li>a, .pagination>li>span {
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

    .pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover {
        z-index: 3;
        color: #fff;
        cursor: default;
        background-color: #337ab7;
        border-color: #337ab7;
    }
</style>