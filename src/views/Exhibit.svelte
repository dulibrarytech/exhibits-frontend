<svelte:head>
	<title>{pageTitle || "Exhibits @ DU"}</title>
</svelte:head>

<script>
    'use-strict'

    import * as Logger from '../libs/logger.js';
    import { Index } from '../libs/index.js';
    import { Settings } from '../config/settings';
    import { Fonts } from '../config/fonts'; 
    import { EXHIBIT_TEMPLATE, USER_ROLE } from '../config/global-constants';
    import { getUserRole } from '../libs/validation';
    import { getItemById, createExhibitPageSections, getInnerText } from '../libs/exhibits_data_helpers';
    import { Templates, Popup_Pages } from '../templates/config/exhibit.js';
    import { Page_Layouts } from '../templates/config/page-layout.js';

    import Exhibit_Menu from '../components/Exhibit_Menu.svelte';
    import Modal_Dialog_Window from '../components/Modal_Dialog_Window.svelte';
    import Modal_Item_Display from '../components/Modal_Item_Display.svelte';
    import Modal_Page_Display from '../components/Modal_Page_Display.svelte';

    export let currentRoute;

    let {   DEFAULT_FONT_FAMILY, 
            DEFAULT_FONT_COLOR, 
            DEFAULT_FONT_SIZE,
            DEFAULT_BACKGROUND_COLOR 

        } = Settings.exhibitDefaultTheme;

    const EXHIBIT_LOAD_MESSAGE = "Loading exhibit...";
    const EXHIBIT_LOAD_ERROR = "Error loading exhibit";

    let page;
    let authKey;
    let exhibitId;
    let isAdmin;
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

    var message;
    var pageTitle; 
    var renderPage;

    let exhibitDisplay;

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
        renderPage = false;

        authKey = currentRoute.queryParams.key || null;
        if(getUserRole(authKey) == USER_ROLE.ADMIN) isAdmin = true;
        else isAdmin = false;

        message = EXHIBIT_LOAD_MESSAGE;
        showLoadMessage(true);

        Logger.module().info(`Loading exhibit...`);
        exhibitId = currentRoute.namedParams.id ?? "null";
        exhibit = await Index.getExhibit(exhibitId, isAdmin);
        data = exhibit?.data;

        if(!exhibit || !data) {
            message = EXHIBIT_LOAD_ERROR;
            Logger.module().error(EXHIBIT_LOAD_ERROR);
        }
        else if(Object.keys(data).length === 0) {
            Logger.module().info("Exhibit not found");
            window.location.replace('/404');
        }
        else {
            try {
                styles = JSON.parse(data.styles).exhibit || {};
                if(!styles.template) Logger.module().info("Exhibit template style data not found");
                if(!styles.navigation) Logger.module().info("Exhibit navigation menu style data not found");
            }
            catch(error) {
                Logger.module().error(`Error loading exhibit styles: ${error}`);
            }

            pageTitle = Settings.appTitle;
            if(data.title) pageTitle = `${getInnerText(data.title || "no title")} | ${pageTitle}`;

            Logger.module().info("Importing fonts...");
            await importFonts();

            Logger.module().info("Rendering exhibit...");
            render();
        }
    }

    const render = async () => {
        Logger.module().info("Retrieving template...");

        pageLayout = $Page_Layouts[data.page_layout] || null;
        template = $Templates[data.exhibit_template] || null;

        if(!pageLayout) {
            Logger.module().error(`Could not find a layout for current setting: '${data.page_layout}'`);
        }
        if(!template) {
            Logger.module().error(`Could not find a template for exhibit id: ${data.uuid}`);
        }
        else {
            Logger.module().info("Retrieving items...");

            // parse styles json string for all exhibit items
            items = exhibit.items.map((item) => {
                if(typeof item.styles == 'string') item.styles = JSON.parse(item.styles);
                return item;
            }) || [];

            // create the navigation sections, e.g. heading > items under heading
            Logger.module().info("Creating page sections...");
            sections = createExhibitPageSections(items);
            renderPage = true;
        }
    }

    const importFonts = () => {
        return new Promise(function(resolve, reject) {
            let fontLocation, fontFace;

            Fonts.forEach((font) => {
                let {name="", file=null, url="./"} = font;

                fontLocation = file ? `${Settings.fontFileLocation}/${file}` : url;
                fontFace = new FontFace(name, `url(${fontLocation})`);

                fontFace.load().then(function(loaded) {
                    document.fonts.add(loaded);
                    Logger.module().info(`Loaded user font: ${name}`);
                    resolve(true);

                }).catch(function(error) {
                    Logger.module().error(`Error loading font: ${font}. Error: ${error}`);
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

    const onClickItem = (event) => {
        openViewerModal(event.detail.itemId);
    }

    const openViewerModal = (itemId) => {
        // add item id to url
        if(location.href.indexOf('#') < 0) {
            history.pushState(null, null, `${location.href}#${itemId}`);
        }

        modalDialogData = getItemById((itemId || null), items);
        if(!modalDialog) modalDialog = Modal_Item_Display;
    }

    const onOpenPageModal = (event) => {
        openPageModal(event.detail.pageId);
    }

    const openPageModal = (itemId) => {
        modalDialogData = {
            page: data,
            container: getPageById(itemId)
        };

        if(!modalDialog) modalDialog = Modal_Page_Display;
    }

    const closeModal = (event) => {
        modalDialogData = null;
        modalDialog = null;

        if(location.href.indexOf('#') > 0) {
            history.replaceState(null, null, location.href.substring(0, location.href.indexOf('#')));
        }
    }

    const showLoadMessage = (show) => {
        isExhibitVisible = !show;
        isMessageVisible = show;
    }

    const onMountPage = (event) => {
        Logger.module().info("Mounted exhibit page");

        // check for an item id in the url
        let hash = location.hash?.replace('#', '');
        let [itemId] = hash.split('_');

        // if there is an item id in the url, get the item and open it in the modal item viewer
        if(itemId) {
            let item = getItemById(itemId, items);
            if(item && !item.is_embedded) openViewerModal(itemId);
        }
    }

    const onMountItems = () => {
        Logger.module().info("Mounted exhibit items");

        setTimeout(() => {
            exhibitDisplay.style.height = "unset";
            exhibitDisplay.style.overflow = "unset";
            showLoadMessage(false);

            let anchorId = location.hash?.replace('#', '') || false;
            if(anchorId) page.goToItemId(anchorId, "instant");

        }, Settings.imageLoadDelay)
    }

    init();
</script>

<div class="exhibit-wrapper" bind:this={exhibitDisplay}>

    <div class="exhibit-load-message container" style="display: {isMessageVisible ? 'absolute' : 'none'}">
        <div><h3>{message}</h3></div>
    </div>

    {#if renderPage}

        <div class="exhibit" 
            style="visibility: {isExhibitVisible ? 'visible' : 'hidden'}; 
                    --theme-exhibit-font-color: {DEFAULT_FONT_COLOR}; 
                    --theme-exhibit-background-color: {DEFAULT_BACKGROUND_COLOR}; 
                    --theme-exhibit-font-family: {DEFAULT_FONT_FAMILY};
                    --theme-exhibit-font-size: {DEFAULT_FONT_SIZE}"
            >

            <Exhibit_Menu {exhibitId} on:click-menu-link={onOpenPageModal} />
        
            <!-- exhibit page -->
            <svelte:component 
                this={pageLayout} 
                {data} 
                {template} 
                {sections} 
                {items} 
                {styles} 
                bind:this={page}
                on:mount={onMountPage} 
                on:mount-items={onMountItems} 
                on:click-item={onClickItem} />
        
            {#if modalDialog}
                <Modal_Dialog_Window 
                    modalDisplay={modalDialog} 
                    modalData={modalDialogData} 
                    on:close={closeModal} 
                />
            {/if}
        </div>

    {/if}
</div>

<style>
    .exhibit-wrapper {
        background: darkgray;
        min-height: 100vh;

        height: 100vh;
        overflow: hidden;
    }

    .exhibit-load-message {
        position: relative;
        top: 100px;
    }

    .exhibit-load-message > div {
        align-items: center;
    }

    :global(.navbar.fixed-top) {
        position: relative;
    }

    :global(.exhibit-search .search-box form) {
        margin-right: 15px;
    }

    :global(.exhibit-menubar .exhibit-menu) {
        position: relative;
        top: calc(50% - 15px);
    }

    :global(.load-message) {
        background-color: lightgreen;
        padding-left: 10px;
        color: #000000;
        font-family: Arial, Helvetica, sans-serif;
        padding: 10px;
    }

    @media screen and (min-width: 576px) {
        :global(.search-box-wrapper .search-box) {
            float: right;
        }
    }
</style>