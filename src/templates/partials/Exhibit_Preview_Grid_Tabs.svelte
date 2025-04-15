<script>
    'use strict'
    // https://www.w3schools.com/howto/howto_js_full_page_tabs.asp

    import { onMount } from 'svelte';

    export let sections = {};

    let pages = [];

    console.log("TEST EPGT sections in:", sections)

    // const onClickTab = (event) => {
    //     console.log("TEST onClickTab:", event.target)
    // }

    const showPage = (index) => {
        console.log("TEST showPage: index:", index)
        console.log("TEST showPage: page:", pages[index])
        
        for(let page of pages) {
            console.log("TEST showPage: pages: page:", page.getAttribute('data-index'))

            if(page.getAttribute('data-index') == index) {
                page.style.display = "block";
            }
            else {
                page.style.display = "none";
            }

            // page.style.display = (page.getAttribute('data-index')) == index ? "block" : "none";v
        }
    }

    onMount(async () => {
        showPage(0);
    });
    
</script>

<div class="exhibit-preview-grid-tabs">

    <!-- buttons -->
    {#each sections as {label}, index}
        <button class="tab-button" type="button" on:click={() => showPage(index)}>{label}</button>
    {/each}
    
    <!-- pages -->
    {#each sections as {label, exhibits}, index}
        <div class="tab-page" data-index={index} bind:this={pages[index]}>
            <h2>{label}</h2>
        </div>
    {/each}

</div>

<style>
    .tab-page {
        height: 100%;
        padding: 50px 15px;
        display: none;
    }

    .tab-button {
        margin-bottom: 0;
    }
</style>