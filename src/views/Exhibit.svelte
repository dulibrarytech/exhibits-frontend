<script>
    'use-strict'

    import { onMount } from 'svelte';
    import { Index } from '../libs/index.js';
    import { Templates, Popup_Pages } from '../templates/config/exhibit.js';
    import { Page_Layouts } from '../templates/config/page-layout.js';
    import { getItemById, getHtmlIdString, stripHtmlTags } from '../libs/data_helpers';
    import { Fonts } from '../config/fonts'; 

    import Exhibit_Menu from '../components/Exhibit_Menu.svelte';
    import Modal_Dialog_Window from '../components/Modal_Dialog_Window.svelte';
    import Modal_Item_Display from '../components/Modal_Item_Display.svelte';
    import Modal_Page_Display from '../components/Modal_Page_Display.svelte';

    import { ENTITY_TYPE, USER_ROLE } from '../config/global-constants';
    import { validateApiKey } from '../libs/validation';

    export let currentRoute;

    // TODO remove defs from this section
    let id;
    let userRole;
    let exhibit = {};
    let isPublished;
    let template = null;
    let styles = null;
    let pageLayout = null; 
    let sections = null;
    let items = null;
    let data = null;
    let modalDialog = null;
    let modalDialogData = null;

    var renderPage = false;

    const FONT_LOCATION = "../assets/fonts";

    const init = async () => {
        let key = currentRoute.queryParams.key || null;
        userRole = key ? getUserRole(key) : USER_ROLE.STANDARD;

        id = currentRoute.namedParams.id ?? "null";
        console.log(`Loading exhibit... ID: ${id}`);

        exhibit = await Index.getExhibit(id);
        data = exhibit?.data;
        if(!exhibit || !data) window.location.replace('/404');

        try {
            styles = JSON.parse(data.styles).exhibit || {};
        }
        catch(error) {
            console.error(`Error loading exhibit styles: ${error}`);
        }

        isPublished = data.is_published || 0; 
        if(isPublished || userRole == USER_ROLE.ADMIN) {
            render();
        }
        else window.location.replace('/404');
    }

    const render = async () => {
        console.log("Rendering exhibit...");
        await importFonts();

        pageLayout = $Page_Layouts[data.page_layout] || null;
        template = $Templates[data.template] || null;

        if(!pageLayout) {
            console.error(`Could not find a layout for ${data.page_layout}`);
        }
        if(!template) {
            console.error(`Could not find a template for ${data.template}`);
        }
        else {
            console.log("Retrieving items...");
            items = exhibit.items || [];
            if(items.length == 0) console.log("No items found");

            console.log("Creating page sections...");
            sections = createPageSections(items);

            renderPage = true;
        }
    }

    const importFonts = () => {
        return new Promise(function(resolve, reject) {
            let fontLocation, fontFace;

            Fonts.forEach((font) => {
                let {name="", file=null, url="./"} = font;

                fontLocation = file ? `${FONT_LOCATION}/${file}` : url;
                fontFace = new FontFace(name, `url(${fontLocation})`);

                fontFace.load().then(function(loaded) {
                    document.fonts.add(loaded);
                    console.log(`Loaded user font: ${name}`);
                    resolve(true);

                }).catch(function(error) {
                    console.error(`Error loading font: ${font}. Error: ${error}`);
                    resolve(false);
                });
            });
        });
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

    const openViewerModal = (event) => {
        
        modalDialogData = getItemById((event.detail.itemId || null), items);
        if(!modalDialog) modalDialog = Modal_Item_Display;
        document.body.classList.add('modal-open');
    }

    const openPageModal = (event) => {
        modalDialogData = {
            page: data,
            container: getPageById(event.detail.pageId) // ret About_The_Curators
        };

        if(!modalDialog) modalDialog = Modal_Page_Display;
        document.body.classList.add('modal-open');
    }

    const closeModal = (event) => {
        modalDialogData = null;
        modalDialog = null;
        document.body.classList.remove('modal-open');
    }

    const onMountPage = (event) => {
        console.log("Mount exhibit page");
    }

    const getUserRole = (key) => {
        let role;

        if(validateApiKey(key)) role = USER_ROLE.ADMIN;
        else role = USER_ROLE.STANDARD;

        return role;
    }

    onMount(async () => {
        init();
    });
</script>

<!-- {#if isPublished || userRole == USER_ROLE.ADMIN} -->

    {#if renderPage}
        <Exhibit_Menu {exhibit} on:click-menu-link={openPageModal}  />

        <!-- exhibit page -->
        <svelte:component this={pageLayout} {data} {template} {sections} {items} {styles} args={{userRole}} on:mount={onMountPage} on:click-item={openViewerModal} /> <!-- args.key -->

        {#if modalDialog}<Modal_Dialog_Window modalDisplay={modalDialog} modalData={modalDialogData} on:close={closeModal} />{/if}
    {:else}
        <div class="container page"><h3>Loading exhibit...</h3></div>
    {/if}

<!-- {:else}
    <h3>Unauthorized</h3>
{/if} -->

<style>
    :global(body.modal-open) {
		height: 100vh;
		overflow-y: hidden;
		padding-right: 15px; /* Avoid width reflow */
	}
</style>