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
            <div class="grid-item exhibit-preview-item col-1">
                <Exhibit_Preview {exhibit} />

                <div class="overlay"></div>
                <div class="overlay-text">VISIT</div>
            </div>
        {/each}
    {/if}

</div>

<style>
    .col-lg-3 {
        width: 23.5%;
    } 

    .exhibits-preview-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        column-gap: 25px;
        row-gap: 26px;
        margin: 6px auto;
    }

    .grid-item {
        position: relative;
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
</style>
