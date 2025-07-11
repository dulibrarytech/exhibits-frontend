<script>
    'use strict'

    import { onMount } from 'svelte';
    import Exhibit_Preview_Grid from './Exhibit_Preview_Grid.svelte';

    export let sections = [];
    export let args = {};

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
        <div class="tabs">
            {#each sections as {label}, index}
                <button class="tab-button" type="button" on:click={() => showPage(index)} aria-label="page tab {label}" bind:this={tabs[index]}>{label}</button>
            {/each}
        </div>
        <!-- buttons ul -->
        <!-- <div class="tabs">
            <ul>
                {#each sections as {label}, index}
                    <li>
                        <button class="tab-button" type="button" on:click={() => showPage(index)} aria-label="show {label}" bind:this={tabs[index]}>{label}</button>
                    </li>
                {/each}
            </ul>
         </div> -->
        
        <!-- pages -->
        {#each sections as {label, exhibits = []}, index}
            <div class="tab-page" data-index={index} bind:this={pages[index]}>

                {#if exhibits.length > 0}
                    <Exhibit_Preview_Grid {exhibits} {args} />
                {:else}
                    <div class="message">
                        <p>No exhibits found.</p>
                    </div>
                {/if}

            </div>
        {/each}

    </div>


<style>
    .tabs {
        display: flex;
    }
     /* buttons ul */
    /* .tabs > ul {
        display: flex;
    } */
    
    .tab-page {
        height: 100%;
        min-height: 75vh;
        padding: 50px 30px;
        background-color: #f1f1f1;
    }

    .message {
        padding: 20px 40px;
    }

    button.tab-button {
        margin-bottom: 0;
        background-color: white;
        border-bottom-style: none;
        border-color: #ddd;
        width: 33%;
        padding: 15px;
        font-size: 1rem;
        text-align: left;
    }

    button.tab-button:focus {
        border-color: #ddd;
    }

    :global(.exhibit-preview-grid-tabs button.tab-button.active) {
        border: none;
        background-color: #f1f1f1;
    }

    @media screen and (min-width: 420px) {
        button.tab-button {
            font-size: 1.2rem;
            padding: 20px 30px;
        }
    }

    @media screen and (min-width: 480px) {
        button.tab-button {
            font-size: 1.3rem;
        }
    }

    @media screen and (min-width: 480px) {
        button.tab-button {
            font-size: 1.3rem;
        }
    }

    @media screen and (min-width: 992px) {
        button.tab-button {
            padding: 20px 30px;
        }
    }
</style>