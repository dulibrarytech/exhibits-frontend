<script>
    import { onMount } from 'svelte';
    import { index } from '../libs/index.js';
    import { Templates } from '../config/templates.js';

    export let currentRoute;

    var id;
    var exhibit = {};
    var template = null;
    var sections = null;

    const init = async () => {
        id = currentRoute.namedParams.id ?? null;
        exhibit = await index.getExhibit(id);

        console.log("TEST exhibit init():", exhibit)

        if(exhibit) {
            let {data} = exhibit;
            template = $Templates[data.template] || null;
            if(!template) console.error(`Could not find a template for ${data.template}`);

            // TODO get heading objects, assn to sections[]
        }
        else window.location.replace('/404');
    }

    onMount(async () => {
        init();
    });
</script>

<!-- If display title page before entry -->
<!-- <div id="exhibit-title-page"></div> -->

<!-- Banner -->

<div class="exhibit-page">
    <h3>Exhibit ID: {id}</h3>

    <!-- TODO combine banner and intro section, implement in banner components. Get banner type from exhibit object? -->
    <div class="banner">
        hero banner
    </div>
    <div class="introduction">
        intro text
    </div>
    <!--  -->

    <!-- navbar -->
    <!-- <Navigation {sections} /> -->

    {#if template}
        <svelte:component this={template} items={exhibit.items} />
    {:else}
        <h3>Loading template...</h3>
    {/if}
</div>

<style>

</style>