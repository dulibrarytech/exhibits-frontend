<script>
    'use strict'

    import { onMount } from 'svelte';
    import Exhibit_Preview_Title_Grid from './Exhibit_Preview_Title_Grid.svelte';

    export let sections = [];

    const MAX_SECTIONS = 3;

    let pages = [];
    let tabs = [];

    $: {
        if(sections.length+1 > MAX_SECTIONS) {
            sections = sections.slice(0, MAX_SECTIONS);
        }
    }

    const showPage = (index) => {

        for(let page of pages) {
            page.style.display = (page.getAttribute('data-index')) == index ? "block" : "none";
        }

        for(let tabIndex in tabs) {
            if(tabIndex == index) {
                tabs[tabIndex].classList.add('active');
            }
            else tabs[tabIndex].classList.remove('active');
        }
    }

    onMount(async () => {
        showPage(0);
    });
    
</script>

    <div class="exhibit-preview-grid-tabs">

        <!-- buttons -->
        {#each sections as {label}, index}
            <!-- <button class="tab-button" type="button" on:click={() => showPage(index)} bind:this={tabs[index]}><h1>{label}</h1></button> -->
            <button class="tab-button" type="button" on:click={() => showPage(index)} bind:this={tabs[index]}>{label}</button>
        {/each}
        
        <!-- pages -->
        {#each sections as {label, exhibits = []}, index}
            <div class="tab-page" data-index={index} bind:this={pages[index]}>

                {#if exhibits.length > 0}
                    <Exhibit_Preview_Title_Grid {exhibits} />
                {:else}
                    <div class="message">
                        <p>No exhibits found.</p>
                    </div>
                {/if}

            </div>
        {/each}

    </div>


<style>
    .tab-page {
        height: 100%;
        padding: 50px 30px;
        background-color: #f1f1f1;
    }

    button.tab-button {
        margin-bottom: 0;
        background-color: white;
        border-bottom-style: none;

        width: 33%;
        padding: 20px 30px;
        font-size: 1.4rem;
        text-align: left;
    }

    /* button.tab-button h1 {
        margin-bottom: 0;
        font-size: 1.4rem;
    } */

    :global(button.tab-button.active) {
        border: none;
        background-color: #f1f1f1;
    }

    :global(.exhibit-preview-grid) {
        column-gap: 2.2vw !important;
    }

    @media screen and (min-width: 992px) {
        button.tab-button {
            /* width: auto; */
            padding: 20px 30px;
        }
    }
</style>