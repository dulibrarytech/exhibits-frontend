<script>
    import { onMount } from 'svelte';
    import { index } from '../libs/index.js';
    import { Templates } from '../config/templates.js';

    import Hero from '../templates/Hero.svelte';
    import Navigation from '../components/Navigation.svelte';

    export let currentRoute;

    var id;
    var exhibit = {};
    var template = null;
    var sections = null;
    var items = [];

    const init = async () => {
        id = currentRoute.namedParams.id ?? null;
        exhibit = await index.getExhibit(id);

        if(exhibit) {
            let {data} = exhibit;

            template = $Templates[data.template] || null;
            if(!template) console.error(`Could not find a template for ${data.template}`);

            items = exhibit.items;
            sections = getSections(items);
        }
        else window.location.replace('/404');
    }

    const getSections = (items) => {
        let sections = items.filter((item) => {
            return item.type == 'heading';

        }).map((heading) => {
            heading['id'] = heading.text.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]*/g, "").toLowerCase();
            return heading;
        });

        return sections;
    }

    onMount(async () => {
        init();
    });
</script>

<!-- If display title page before entry -->
<!-- <div id="exhibit-title-page"></div> -->

<div class="exhibit-page">
    <h3>Exhibit ID: {id}</h3>

    <Hero data={exhibit.data} />

    <Navigation {sections} />

    {#if template}
        <svelte:component this={template} {sections} {items} />
    {:else}
        <h3>Loading template...</h3>
    {/if}
</div>

<style>

</style>