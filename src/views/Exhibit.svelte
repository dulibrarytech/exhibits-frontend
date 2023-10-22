<script>
    'use-strict'

    import { onMount } from 'svelte';
    import { Resource } from '../libs/resource';
    import { Index } from '../libs/index.js';
    import { Templates, Popup_Pages } from '../templates/config/exhibit.js';
    import { Page_Layouts } from '../templates/config/page-layout.js';
    import { getItemById, getHtmlIdString, stripHtmlTags } from '../libs/data_helpers';

    import Exhibit_Menu from '../components/Exhibit_Menu.svelte';
    import Modal_Dialog_Window from '../components/Modal_Dialog_Window.svelte';
    import Modal_Media_Display from '../components/Modal_Media_Display.svelte';
    import Modal_Page_Display from '../components/Modal_Page_Display.svelte';

    import {ENTITY_TYPE} from '../config/global-constants';

    export let currentRoute;

    var id;
    var exhibit = {};
    var template = null;
    var pageLayout = null;
    var sections = null;
    var items = [];
    var data = null;
    var modalDialog = null;
    var modalDialogData = null;

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
                sections = createPageSections(items);
            }
        }
        else window.location.replace('/404');
    }

    const createPageSections = (items) => {
        let headings = [];
        let heading = null;
        let subheading = null;

        for(let index in items) {
            let item = items[index];
            let {type = "", title = null, text = ""}  = item;

            // If the item is a heading, add a new heading
            if(type == ENTITY_TYPE.EXHIBIT_HEADING) {
                
                // Push the previous heading to the heading array
                if(heading) headings.push(heading);

                heading = {
                    id: getHtmlIdString(text),
                    text: stripHtmlTags(text),
                    subheadings: []
                }

                item.anchorId = heading.id;
            }

            // If this item is in a heading section, and it has a title, add a subheading
            else if(heading && title) {

                subheading = {
                    id: getHtmlIdString(title),
                    text: stripHtmlTags(title)
                }

                heading.subheadings.push(subheading);

                item.anchorId = subheading.id;
            }

            // End case: push current heading to the headings array if this is the last item in the exhibit
            if(parseInt(index) == items.length-1) {
                if(heading) headings.push(heading);
            }
        }

        return headings;
    }

    const getPageById = (id) => {
        let pageComponent = null;

        for(let page in $Popup_Pages) {
            if(page == id) pageComponent = $Popup_Pages[page];
        }

        return pageComponent;
    }

    const setTheme = (styles) => {
        let {heading={}, navigation={}, template={}} = styles;

        /* Exhibit template theme */
        for(let style in template) {
            /* handle special cases that affect the exhibit template */
            if(style == 'backgroundImage') {
                let filename = template[style];  
                let exhibitPage = document.querySelector(".exhibit-page");              
                if(exhibitPage) exhibitPage.style[style] = `url('${ Resource.getFileUrl(filename) }')`;
            }
            else {
                /* Apply exhibit template theme to body element */
                document.body.style[style] = template[style];
            }
        }

        /* Exhibit heading theme */
        let headingElements = document.querySelectorAll(".exhibit-heading");
        for(let element of headingElements) {
            for(let style in heading) {
                element.style[style] = heading[style];
            }
        }

        /* Navigation menu bar (top) or section (side) theme */
        let navigationMenu = document.querySelector('.exhibit-navigation');
        for(let style in navigation.menu) {
            navigationMenu.style[style] = navigation.menu[style];
        }

        /* Navigation menu link theme, does not affect navigation menu */
        let navigationMenuLinks = document.querySelectorAll('.exhibit-navigation .nav-link a.main-menu-link');
        for(let link of navigationMenuLinks) {
            for(let style in navigation.links) {
                link.style[style] = navigation.links[style];
            }
        }
    }

    const onOpenViewerModal = (event) => {
        modalDialogData = getItemById((event.detail.itemId || null), items);
        if(!modalDialog) modalDialog = Modal_Media_Display;
        document.body.classList.add('modal-open');
    }

    const onOpenPageModal = (event) => {
        modalDialogData = {
            page: data,
            container: getPageById(event.detail.pageId) // ret About_The_Curators
        };

        if(!modalDialog) modalDialog = Modal_Page_Display;
        document.body.classList.add('modal-open');
    }

    const onCloseModal = (event) => {
        modalDialogData = null;
        modalDialog = null;
        document.body.classList.remove('modal-open');
    }

    const onOpenExternalPage = (event) => {}

    const onMountPage = (event) => {
        let styles = data.styles?.exhibit;
        if(styles) setTheme(styles);
    }

    onMount(async () => {
        init();
    });
</script>

{#if pageLayout}
    <Exhibit_Menu {exhibit} on:click-menu-link={onOpenPageModal}  />

    <svelte:component this={pageLayout} {data} {template} {sections} {items} on:mount={onMountPage} on:click-item={onOpenViewerModal} />

    {#if modalDialog}<Modal_Dialog_Window modalDisplay={modalDialog} modalData={modalDialogData} on:close={onCloseModal} />{/if}
{:else}
    <h3>Loading exhibit...</h3>
{/if}

<style>
    :global(body.modal-open) {
		height: 100vh;
		overflow-y: hidden;
		padding-right: 15px; /* Avoid width reflow */
	}
</style>