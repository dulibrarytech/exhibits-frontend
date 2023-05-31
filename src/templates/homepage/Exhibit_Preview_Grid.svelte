<script>
    'use strict'

    import { onMount } from 'svelte';
    import { Resource } from '../../libs/resource';
    import Exhibit_Preview from '../../components/Exhibit_Preview.svelte';

    export let exhibits = [];

    let previews = [];

    const init = () => {
        for(let exhibit of exhibits) {
            let  {thumbnail_image=null, hero_image=null} = exhibit;

            if(!thumbnail_image) {
                exhibit.thumbnail_image = Resource.getImageDerivativeUrl({
                    type: 'crop',
                    filename: hero_image || "",
                    width: "400",
                    height: "400"
                });
            }
            else {
                exhibit.thumbnail_image = Resource.getUrl(thumbnail_image);
            }

            previews.push(exhibit);
        }
    }

    $: init();

    onMount(async () => {
        
    });
</script>

<div class="exhibits-preview-grid">

    {#if previews.length > 0}
        {#each previews as exhibit}
            <div class="grid-item col-lg-3">
                <Exhibit_Preview {exhibit} />
            </div>
        {/each}
    {/if}

</div>

<style>
    .exhibits-preview-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        column-gap: 14px;
        row-gap: 26px;
        margin: 6px auto;
    }

    .grid-item {
        /* padding: 12px; */
    }

    .col-lg-3 {
        width: 23.5%;
    }
</style>