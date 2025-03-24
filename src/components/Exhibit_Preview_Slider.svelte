<script>
    'use strict'

    /*
     * https://www.npmjs.com/package/svelte-carousel
     */

    import Carousel from 'svelte-carousel';
    import Exhibit_Preview from './Exhibit_Preview.svelte';

    export let exhibits = [];
    export let images = 3;
    export let scroll = 1;

    const DEFAULT_TITLE_TEXT = "Untitled Exhibit";

    // TODO responsive slider: on device resize, test width, if < 768, update images to "1"

</script>

<div class="exhibit-preview-slider">

    <Carousel 
        particlesToShow={images} 
        particlesToScroll={scroll}
        let:showPrevPage
        let:showNextPage
    >

        <!-- <div slot="prev" on:click={showPrevPage} class="custom-arrow custom-arrow-prev">
            <i class="fa-solid fa-chevron-left"></i>
        </div> -->

        {#each exhibits as exhibit }

            <div class="preview-slide">
                <div class="preview-image">
                    <Exhibit_Preview {exhibit} link="/exhibit/{exhibit.uuid}"/>
                </div>
                
                <div class="preview-text">
                    <a href="/exhibit/{exhibit.uuid}">
                        {exhibit.title || DEFAULT_TITLE_TEXT}
                    </a>
                </div>
            </div>

        {/each}

        <!-- <div slot="next" on:click={showNextPage} class="custom-arrow custom-arrow-next">
            <i />
        </div> -->

    </Carousel>

</div>

<style>
    .exhibit-preview-slider {
        /* styles for 1 slide per row */
        /* width: 70%; */
        /* margin: 0 auto; */
        /* END styles for 1 slide per row */
    }

    .preview-slide {
        /* max-width: 200px; */
        /* padding: 30px; */
    }

    .preview-text {
        padding: 20px;
        text-align: center;
        font-size: 24px;
    }

    .preview-text a {
        color: #181818;

    }

    :global(.sc-carousel__content-container) {
        /* styles for 1 slide per row */
        /* height: 450px; */
        /* END styles for 1 slide per row */
    }

    :global(.sc-carousel-arrow__circle) {
        width: 40px !important;
        height: 40px !important;
        background-color: #e5e3e1 !important;
    }

    :global(.sc-carousel-arrow__arrow) {
        width: 11px;
        height: 11px;
    }

    :global(.exhibit-preview-slider .exhibit-thumbnail) {
        padding: 20px;
    }
</style>