<script>
    'use-strict'

    import { onMount } from 'svelte';
    import { Resource } from '../libs/resource';
    import { Index } from '../libs/index.js';
    // import { Templates, Page_Layouts } from '../config/templates.js';
    import { Templates } from '../templates/config/exhibit.js';
    import { Page_Layouts } from '../templates/config/page-layout.js';

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

            if(!pageLayout) {
                console.error(`Could not find a layout for ${data.page_layout}`);
            }
            if(!template) {
                console.error(`Could not find a template for ${data.template}`);
            }
            else {
                items = exhibit.items;
                sections = getSections(items);
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
        let {heading={}, navigation={}, template={}} = styles;

        let headingElements = document.querySelectorAll(".exhibit-heading");
        for(let element of headingElements) {
            for(let style in heading) {
                element.style[style] = heading[style];
            }
        }

        let navigationMenu = document.querySelector('.exhibit-navigation');
        for(let style in navigation.menu) {
            navigationMenu.style[style] = navigation.menu[style];
        }

        let navigationMenuLinks = document.querySelectorAll('.exhibit-navigation ul li a');
        for(let link of navigationMenuLinks) {
            for(let style in navigation.links) {
                link.style[style] = navigation.links[style];
            }
        }

        let templateElement = document.querySelector('.exhibit-template');
        for(let style in template) {
            if(style == "backgroundImage") {
                let filename = template[style];
                let pageElement = document.querySelector(".exhibit-page")
                pageElement.style[style] = `url('${ Resource.getUrl(filename) }')`;
                //pageElement.style['backgroundSize'] = "contain"; // <-- default?
            }

            else {
                templateElement.style[style] = template[style];  
            }
        }
    }

    const onMountPage = (event) => {
        let styles = data.styles?.exhibit;
        if(styles) setTheme(styles);
    }

    onMount(async () => {
        init();
    });
</script>

{#if pageLayout}
    <svelte:component this={pageLayout} {data} {template} {sections} {items} on:mount={onMountPage}/>
{:else}
    <h3>Loading exhibit...</h3>
{/if}

<style>

</style>