<script>
    'use-strict'

    import { onMount } from 'svelte';
    import { Index } from '../libs/index.js';
    //import { Templates } from '../config/templates.js';
    import { Templates, Page_Layouts } from '../config/templates.js';

    // To page layout?
    // import Hero from '../templates/Hero.svelte';
    // import Navigation_Top from '../components/Navigation_Top.svelte';

    export let currentRoute;

    var id;
    var exhibit = {};
    var template = null;
    var pageLayout = null;
    var sections = null;
    var items = [];
    var data = null;

    const init = async () => {
        id = currentRoute.namedParams.id ?? null;
        exhibit = await Index.getExhibit(id);

        if(exhibit) {
            data = exhibit.data;

            pageLayout = $Page_Layouts[data.page_layout] || null; // TODO get default from settings
            template = $Templates[data.template] || null;  // TODO get default from settings

            console.log("TEST exhibit page page layout/exhibit template:", pageLayout, template)

            if(!template) {
                console.error(`Could not find a template for ${data.template}`);
            }
            else {
                items = exhibit.items;
                sections = getSections(items);

                let styles = data.styles?.exhibit;
                if(styles) setTheme(styles);
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

   const setTheme = (styles) => {
        let exhibit = document.querySelector('.exhibit-page');
        for(let style in styles) {
            exhibit.style[style] = styles[style];
        }
    }

    onMount(async () => { // TODO catch event when page has loaded?
        init();
    });
</script>

<!-- <div class="exhibit-page">
    {#if template}
        <Hero {data} />
        <Navigation_Top {sections} />
        
        <svelte:component this={template} {sections} {items} />
    {:else}
        <h3>Loading template...</h3>
    {/if}
</div> -->

{#if pageLayout}
    <svelte:component this={pageLayout} {data} {template} {sections} {items} />
{:else}
    <h3>Loading page...</h3>
{/if}

<style>

</style>