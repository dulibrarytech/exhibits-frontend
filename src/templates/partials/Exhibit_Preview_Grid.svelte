<script>
    'use strict'

    import Exhibit_Preview from '../../components/Exhibit_Preview.svelte';

    export let exhibits = [];
    export let args = {};

    let {
        limit = 0
    } = args;

    let previews = [];

    const init = () => {
        for(let exhibit of exhibits) {
            previews.push(exhibit);
            if(limit > 0 && previews.length >= limit) break; 
        }
    }

    $: init();
</script>

<div class="exhibit-preview-grid">

    {#if previews.length > 0}
        {#each previews as exhibit}
            <div class="grid-item exhibit-preview-item">
                <Exhibit_Preview {exhibit} {args} link="/exhibit/{exhibit.uuid}"/>
            </div>
        {/each}
    {/if}

</div>

<style>
    .exhibit-preview-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        column-gap: 2.2vw;
        row-gap: 14vw;
        margin: 6px auto;
    }

    .grid-item {
        position: relative;
        width: 100%;
    }

    /* begin responsive breakpoints: small mobile devices/phones first ^ */
    @media screen and (min-width: 480px) {
        /* start of portrait tablet styles */
        .exhibit-preview-grid {
            row-gap: 5vw;
        }

        .grid-item {
            width: 47.5%; /* 2 col */
        }
    }

    @media screen and (min-width: 768px) {
        /* start of landscape/large tablet styles */
        .grid-item {
            width: 30.5%; /* 3 col */
        }
    }

    @media screen and (min-width: 992px) {
        /* start of large tablet styles */
        .grid-item {
            width: 22.5%; /* 4 col */
        }
    }

    @media screen and (min-width: 1280px) {
        /* start of medium/large desktop styles */

    }

    @media screen and (min-width: 1860px) {
        /* start of extra large desktop styles */
        .exhibit-preview-grid {
            column-gap: 35px;
        }
    }
</style>
