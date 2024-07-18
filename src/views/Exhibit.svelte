<script>
    'use-strict'

    import { Index } from '../libs/index.js';
    import { getItemById, getHtmlIdString, stripHtmlTags } from '../libs/data_helpers';
    import { Fonts } from '../config/fonts'; 
    import { ENTITY_TYPE } from '../config/global-constants';
    import { isAdmin, getUserRole } from '../libs/validation';

    import { Templates, Popup_Pages } from '../templates/config/exhibit.js';
    import { Page_Layouts } from '../templates/config/page-layout.js';
    import Exhibit_Menu from '../components/Exhibit_Menu.svelte';
    import Search_Box from '../components/Search_Box.svelte';
    import Modal_Dialog_Window from '../components/Modal_Dialog_Window.svelte';
    import Modal_Item_Display from '../components/Modal_Item_Display.svelte';
    import Modal_Page_Display from '../components/Modal_Page_Display.svelte';

    export let currentRoute;

    let apiKey;

    let id;
    let userRole;
    let exhibit;
    let template;
    let styles;
    let pageLayout; 
    let sections;
    let items;
    let data;
    let modalDialog;
    let modalDialogData;
    let isExhibitVisible;
    let isMessageVisible;

    let renderPage = false;

    const FONT_LOCATION = "../assets/fonts";  // TODO load DU brand fonts

    const init = async () => {
        exhibit = {};
        template = null;
        styles = null;
        pageLayout = null; 
        sections = null;
        items = null;
        data = null;
        modalDialog = null;
        modalDialogData = null;
        isExhibitVisible = false;
        isMessageVisible = true;

        apiKey = currentRoute.queryParams.key || null;
        userRole = getUserRole(apiKey);

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

        if(data.is_published || isAdmin(apiKey)) {
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
            items = exhibit.items.map((item) => {
                if(typeof item.styles == 'string') item.styles = JSON.parse(item.styles);
                return item;

            }) || [];
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
        let sectionStyles = null;

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

                if(item.styles) sectionStyles = item.styles; // use heading styles for current section
            }

            if(type == ENTITY_TYPE.ITEM || type == ENTITY_TYPE.GRID || type == ENTITY_TYPE.VERTICAL_TIMELINE_2) {

                // If this item is in a heading section, and it has a title, add a subheading
                if(heading && title) {
                    subheading = {
                        id: getHtmlIdString(title),
                        text: stripHtmlTags(title)
                    }

                    heading.subheadings.push(subheading);
                    item.anchorId = subheading.id;
                }

                // TEST this should add heading styles, and item sub object to all non-heading items (items,grids) test log "items" in vscroll template
                let styles = {
                    item: item.styles
                }
                if(sectionStyles) {
                    styles.heading = sectionStyles;
                }
                item.styles = styles;
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

    const onOpenViewerModal = (event) => {
        openViewerModal(event.detail.itemId);
    }

    const openViewerModal = (itemId) => {
        modalDialogData = getItemById((itemId || null), items);
        if(!modalDialog) modalDialog = Modal_Item_Display;
        document.body.classList.add('modal-open');
    }

    const onOpenPageModal = (event) => {
        openPageModal(event.detail.pageId);
    }

    const openPageModal = (itemId) => {
        modalDialogData = {
            page: data,
            container: getPageById(itemId) // ret About_The_Curators
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
        console.log("Mounted exhibit page");
        let hash = location.hash?.replace('#', '') || false;
        if(hash) openViewerModal(hash);
    }

    const onMountItems = () => {
        console.log("Mounted exhibit items");
        isExhibitVisible = true;
        isMessageVisible = false;
    }

    init();
</script>

{#if renderPage}

    <div class="exhibit-wrapper">
        <div class="load-message" style="display: {isMessageVisible ? 'block' : 'none'}"><h3>Please wait...</h3></div>

        <div class="exhibit" style="visibility: {isExhibitVisible ? 'visible' : 'hidden'}">

            <div class="exhibit-menubar row">
                <div class="col-md-6 col-lg-8 col-xl-9">
                    <Exhibit_Menu {exhibit} on:click-menu-link={onOpenPageModal}  />
                </div>
                <div class="col-md-6 col-lg-4 col-xl-3 exhibit-search">
                    <Search_Box endpoint="/search" fields={['title', 'description']} placeholder="Search in this exhibit" params={{exhibitId: id}}/>
                </div>
            </div>
        
            <!-- exhibit page -->
            <svelte:component this={pageLayout} {data} {template} {sections} {items} {styles} args={{userRole}} on:mount={onMountPage} on:mount-items={onMountItems} on:click-item={onOpenViewerModal} /> <!-- args.key -->
        
            {#if modalDialog}<Modal_Dialog_Window modalDisplay={modalDialog} modalData={modalDialogData} on:close={closeModal} />{/if}
        
        </div>
    </div>

{/if}

<style>
    .load-message {
        position: relative;
        left: 70px;
        top: 50px;
    }

    .exhibit-wrapper {
        background: darkgray;
    }

    :global(body.modal-open) {
		height: 100vh;
		overflow-y: hidden;
		padding-right: 15px;
	}

    .exhibit-menubar {
        display: flex;
        padding: 0 1rem;
        background: white;
    }

    .exhibit-search {
        padding: 20px 6px;
    }

    :global(.exhibit-search .search-box form) {
        margin-right: 15px;
    }

    :global(.exhibit-menubar .exhibit-menu) {
        position: relative;
        top: calc(50% - 15px);
    }

    @media screen and (min-width: 768px) {
        .exhibit-search {
            padding: 8px 6px;
        }
    }
</style>