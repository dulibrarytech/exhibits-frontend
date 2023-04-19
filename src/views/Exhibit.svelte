<script>
    'use-strict'

    import { onMount } from 'svelte';
    import { Index } from '../libs/index.js';
    import { Templates } from '../config/templates.js';

    import Hero from '../templates/Hero.svelte';
    import Navigation from '../components/Navigation.svelte';

    export let currentRoute;

    var id;
    var exhibit = {};
    var template = null;
    var sections = null;
    var items = [];
    var data = null;

    const init = async () => {
        id = currentRoute.namedParams.id ?? null;
        exhibit = await Index.getExhibit(id);

        if(exhibit) {
            data = exhibit.data;
            template = $Templates[data.template] || null;

            if(!template) {
                console.error(`Could not find a template for ${data.template}`);
            }
            else {
                items = exhibit.items;
                sections = getSections(items);

                let css = data.css?.exhibit;
                if(css) setTheme(css);
            }
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

   const setTheme = (css) => {
        let exhibit = document.querySelector('.exhibit-page');
        for(let style in css) {
            exhibit.style[style] = css[style];
        }
    }

    onMount(async () => {
        init();
    });
</script>

<!-- If display title page before entry -->
<!-- <div id="exhibit-title-page"></div> -->

<div class="exhibit-page">
    <Hero {data} />
    <Navigation {sections} />

    {#if template}
        <svelte:component this={template} {sections} {items} />
    {:else}
        <h3>Loading template...</h3>
    {/if}
</div>

<style>

</style>