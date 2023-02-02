<script>
    import { onMount } from 'svelte';
    import { index } from '../libs/index.js';
    import { Templates } from '../config/templates.js';

    export let currentRoute;

    var id;
    var exhibit = {};
    var template = null;

    const init = async () => {
        id = currentRoute.namedParams.id ?? null;
        exhibit = await index.getExhibitById(id);

        if(exhibit) {
            let {data} = exhibit;
            template = $Templates[data.template] || null;
            if(!template) console.error(`Could not find a template for ${data.template}`);
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

    {#if template}
        <svelte:component this={template} items={exhibit.items} />
    {:else}
        <h3>Loading template...</h3>
    {/if}
</div>

<style>

</style>