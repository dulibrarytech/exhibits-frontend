<script>
    'use strict'

    import Exhibit_Preview from '../../components/Exhibit_Preview.svelte';

    export let exhibits = [];

    let previews = [];

    const init = () => {
        for(let exhibit of exhibits) {
            previews.push(exhibit);
        }
    }

    $: init();
</script>

<div class="exhibits-preview-grid">

    {#if previews.length > 0}
        {#each previews as exhibit}
            <div class="grid-item exhibit-preview-item">
                <Exhibit_Preview {exhibit} link="/exhibit/{exhibit.uuid}"/>

                <div class="overlay"></div>
                <div class="overlay-text">VISIT</div>
            </div>
        {/each}
    {/if}

</div>

<style>
    .exhibits-preview-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        column-gap: 2.5vw;
        row-gap: 2.5vw;
        margin: 6px auto;
    }

    .grid-item {
        position: relative;
        width: 100%;
    }
    
    .grid-item:hover .overlay,
    .grid-item:hover .overlay-text {
        display: block;
    }

    .overlay {
        display: none;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        background-color: #181818;
        opacity: 0.4;
        pointer-events: none;
    }

    .overlay-text {
        display: none;
        width: 100%;
        height: 100%;
        position: absolute;
        top: calc(50% - 13px);
        left: 0;
        z-index: 11;
        color: white;
        font-size: 24px;
        text-align: center;
        pointer-events: none;
    }

    /* begin responsive breakpoints: small mobile devices/phones first ^ */
    @media screen and (min-width: 480px) {
    /* start of portrait tablet styles */
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

    @media screen and (min-width: 1920px) {
    /* start of extra large desktop styles */

    }
</style>
