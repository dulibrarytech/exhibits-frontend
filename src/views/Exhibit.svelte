<script>
    'use-strict'

    import { Index } from '../libs/index.js';
    import { getItemById, createExhibitPageSections } from '../libs/exhibits_data_helpers';
    import { Fonts } from '../config/fonts'; 
    import { USER_ROLE } from '../config/global-constants';
    import { getUserRole } from '../libs/validation';

    import { Templates, Popup_Pages } from '../templates/config/exhibit.js';
    import { Page_Layouts } from '../templates/config/page-layout.js';
    import Exhibit_Menu from '../components/Exhibit_Menu.svelte';
    import Search_Box from '../components/Search_Box.svelte';
    import Modal_Dialog_Window from '../components/Modal_Dialog_Window.svelte';
    import Modal_Item_Display from '../components/Modal_Item_Display.svelte';
    import Modal_Page_Display from '../components/Modal_Page_Display.svelte';

    export let currentRoute;
    export let params;

    let apiKey;

    let id;
    let userRole;
    let isPublished;
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

    const FONT_LOCATION = "../assets/fonts";  // TODO: load DU brand fonts
    const IMAGE_LOAD_DELAY = 2000; // TODO: track image load complete? all images must be loaded before the navigation scrollto will work (affects height of exhibit template div)

    const init = async () => {
        showLoadMessage(true);
        
        exhibit = {};
        isPublished = false;
        template = null;
        styles = null;
        pageLayout = null; 
        sections = null;
        items = null;
        data = null;
        modalDialog = null;
        modalDialogData = null;

        apiKey = currentRoute.queryParams.key || null;
        userRole = getUserRole(apiKey);
        id = currentRoute.namedParams.id ?? "null";

        console.log(`Loading exhibit... ID: ${id}`);
        exhibit = await Index.getExhibit(id);
        data = exhibit?.data;

        if(!exhibit || !data) window.location.replace('/404');
        else isPublished = ( data.is_published == true || userRole == USER_ROLE.ADMIN );

        if(isPublished) {
            try {
                styles = JSON.parse(data.styles).exhibit || {};
                if(!styles.template) console.log("Exhibit template style data not found");
                if(!styles.navigation) console.log("Exhibit navigation menu style data not found");
            }
            catch(error) {
                console.error(`Error loading exhibit styles: ${error}`);
            }

            console.log("Importing fonts...");
            await importFonts();

            console.log("Rendering exhibit...");
            render();
        }
        else window.location.replace('/404');
    }

    const render = async () => {
        console.log("Retrieving template...");

        pageLayout = $Page_Layouts[data.page_layout] || null;
        template = $Templates[data.exhibit_template] || null;

        if(!pageLayout) {
            console.error(`Could not find a layout for ${data.page_layout}`);
        }
        if(!template) {
            console.error(`Could not find a template for exhibit ${data.uuid}`);
        }
        else {
            console.log("Retrieving items...");

            // filter out unpublished items if user not role admin
            if(userRole != USER_ROLE.ADMIN) {
                items = exhibit.items.filter((item) => {
                    return item.is_published == true;
                });
            }
            else items = exhibit.items;

            // parse any encoded data
            items = items.map((item) => {
                if(typeof item.styles == 'string') item.styles = JSON.parse(item.styles);

                return item;

            }) || [];

            // create the navigation sections, e.g. heading > items under heading
            console.log("Creating page sections...");
            sections = createExhibitPageSections(items);

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

    const showLoadMessage = (show) => {
        isExhibitVisible = !show;
        isMessageVisible = show;
    }

    const onMountPage = (event) => {
        console.log("Mounted exhibit page");

        let anchorId = location.hash?.replace('#', '') || false;
        if(anchorId) {
            let item = getItemById(anchorId, items);
            if(item && !item.is_embedded) openViewerModal(anchorId);
        }
    }

    const onMountItems = () => {
        console.log("Mounted exhibit items");

        setTimeout(() => {
            showLoadMessage(false);
        }, IMAGE_LOAD_DELAY)
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