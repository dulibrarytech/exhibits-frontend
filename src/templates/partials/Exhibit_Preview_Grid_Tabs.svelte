<script>
    'use strict'

    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    import Exhibit_Preview_Grid from './Exhibit_Preview_Grid.svelte';

    export let panelData = [];
    export let activePanelId = null;
    export let args = {};

    const dispatch = createEventDispatcher();

    const MAX_PANELS = 3;

    let _tabElements = [];
    let _panelElements = [];

    $: {
        if(panelData.length+1 > MAX_PANELS) {
            panelData = panelData.slice(0, MAX_PANELS);
        }
    }

    const showPanel = (id = null) => {
        // get panel data index for panel with specified id
        const panelIndex = id ? panelData.findIndex(panel => panel.id == id) : 0;

        // reset page element displays to none and set the element at panel index to block
        _panelElements.forEach(element => {
            element.style.display = (element.getAttribute('data-index')) == panelIndex ? "block" : "none";
        });

        // reset all tab elements' active class and aria-selected state and set the tab element at panel index to active 
        _tabElements.forEach(element => {
            if(element.getAttribute('data-index') == panelIndex) {
                element.classList.add('active');
                element.setAttribute('aria-selected', true);
            }
            else {
                element.classList.remove('active');
                element.setAttribute('aria-selected', false);
            }
        });
    }

    const selectPanel = (id) => {
        showPanel(id);
        dispatch('select-panel', {panelId: id});
    }

    onMount(async () => {
        showPanel(panelData[0].id);
    });
    
</script>

    <div class="exhibit-preview-grid-tabs" role="tablist">

        <!-- buttons -->
        <div class="tabs">
            {#each panelData as {id, label}, index}
                <div 
                    class="tab" 
                    role="tab" 
                    data-index={index}
                    aria-selected={index == 0 ? 'true' : 'false'} 
                    aria-controls="tabPage{index+1}" tabindex="0" 
                    bind:this={_tabElements[index]}
                >
                    <h2>
                        <button 
                            class="tab-button" 
                            type="button" 
                            on:click={() => selectPanel(id)} 
                        >
                            {label}
                        </button>
                    </h2>
                </div>
                
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
        {#each panelData as {label, exhibits = []}, index}
            <div id="tabPage{index+1}" class="tab-page" role="tabpanel" data-index={index} bind:this={_panelElements[index]}>

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
        min-height: 75px;
    }

    .tabs > .tab {
        width: 33%;
    }

    .tabs h2 {
        margin: 0;
        height: 100%;
    }
    
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
        width: 100%;
        height: 100%;
        padding: 15px;
        font-size: 1rem;
        text-align: left;
        position: relative;
    }

    button.tab-button:focus {
        border-color: #ddd;
    }

    button.tab-button:focus-visible {
        z-index: 1;
    }

    :global(.exhibit-preview-grid-tabs .tab.active .tab-button) {
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