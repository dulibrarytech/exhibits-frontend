<svelte:head>
	<title>{_pageTitle || "Exhibits @ DU"}</title>
</svelte:head>

<script>
    'use-strict'

    import { Index } from '../libs/index.js';
    import { Settings } from '../config/settings';
    import { Fonts } from '../config/fonts'; 

    import Exhibit_Menu from '../components/Exhibit_Menu.svelte';
    import Modal_Dialog_Window from '../components/Modal_Dialog_Window.svelte';
    import Modal_Item_Display from '../components/Modal_Item_Display.svelte';
    import Modal_Page_Display from '../components/Modal_Page_Display.svelte';

    import { USER_ROLE } from '../config/global-constants';
    import { getUserRole } from '../libs/validation';
    import { getItemById, createExhibitPageSections, getInnerText } from '../libs/exhibits_data_helpers';
    import { Templates, Popup_Pages } from '../templates/config/exhibit.js';
    import { Page_Layouts } from '../templates/config/page-layout.js';

    import * as Logger from '../libs/logger.js';

    export let currentRoute;

    const {   
        DEFAULT_FONT_FAMILY, 
        DEFAULT_FONT_COLOR, 
        DEFAULT_FONT_SIZE,
        DEFAULT_BACKGROUND_COLOR,

    } = Settings.exhibitDefaultTheme;

    const EXHIBIT_LOAD_MESSAGE = "Loading exhibit...";
    const EXHIBIT_LOAD_ERROR = "Error loading exhibit";

    let _exhibitId;
    let _isAdmin;

    let _exhibit;
    let _exhibitData;
    let _template;
    let _pageLayout; 
    let _exhibitPage;
    let _items;
    let _sections;
    let _styles;

    let _message;
    let _pageTitle; 
    let _exhibitDisplay;
    let _modalDialog;
    let _modalDialogData;
    let _renderPage;

    let _showMessageOverlay;

    const init = async () => {
        _exhibitId = currentRoute.namedParams.id ?? "null";

        _exhibit = {};
        _exhibitData = null;
        _template = null;
        _pageLayout = null; 
        _items = null;
        _sections = null;
        _styles = null;
        _modalDialog = null;
        _modalDialogData = null;
        _renderPage = false;
        _showMessageOverlay = false;

        // get role
        const authKey = currentRoute.queryParams.key || null;
        if(getUserRole(authKey) == USER_ROLE.ADMIN) {
            _isAdmin = true;
        }
        else {
            _isAdmin = false;
        }

        displayStatusMessage(EXHIBIT_LOAD_MESSAGE);

        // fetch exhibit data and items
        Logger.module().info(`Loading exhibit...`);
        try {
            _exhibit = await Index.getExhibit(_exhibitId, _isAdmin);
            _exhibitData = _exhibit?.data || null;
            _items = _exhibit?.items || [];
        }
        catch(error) {
            Logger.module().error(`${EXHIBIT_LOAD_ERROR}: ${error}`);
            _message = EXHIBIT_LOAD_ERROR;
        }

        // get the exhibit styles object
        try {
            const styles = _exhibitData.styles || {};

            if(!styles) {
                Logger.module().info("Exhibit styles not found");
                return;
            }

            _styles = typeof styles === 'string' ? 
                JSON.parse(styles).exhibit || {} : 
                styles.exhibit || {};
                
            if(!_styles.template) Logger.module().info("Exhibit template styles not found. Using default styles.");
            if(!_styles.navigation) Logger.module().info("Exhibit navigation menu styles not found. Using default styles.");
            if(!_styles.introduction) Logger.module().info("Exhibit introduction section styles not found. Using default styles.");
        }
        catch(error) {
            Logger.module().error(`Error loading exhibit styles: ${error}`);
        }

        // verify data is present before rendering exhibit
        if(!_exhibit || !_exhibitData) {
            _message = EXHIBIT_LOAD_ERROR;
            Logger.module().error(EXHIBIT_LOAD_ERROR);
        }
        else if(Object.keys(_exhibitData).length === 0) {
            Logger.module().info("Exhibit not found");
            window.location.replace('/404');
        }

        else {
            Logger.module().info("Rendering exhibit...");
            render();
        }
    }

    const render = async () => {

        // set page title to exhibit title if it exists
        _pageTitle = Settings.appTitle;
        if(_exhibitData.title) _pageTitle = `${getInnerText(_exhibitData.title || "no title")} | ${_pageTitle}`;

        // create the navigation sections, e.g. heading > items under heading
        Logger.module().info("Creating page sections...");
        _sections = createExhibitPageSections(_items);

        // get fonts used in exhibit and import them
        Logger.module().info("Importing fonts...");
        await importFonts();

        // get the exhibit template and page layout options
        Logger.module().info("Retrieving templates...");
        _pageLayout = $Page_Layouts[_exhibitData.page_layout] || null;
        _template = $Templates[_exhibitData.exhibit_template] || null;
        if(!_pageLayout) {
            Logger.module().error(`Could not find a layout for current setting: '${_exhibitData.page_layout}'`);
            return false;
        }
        if(!_template) {
            Logger.module().error(`Could not find a template for exhibit id: ${_exhibitData.uuid}`);
            return false;
        }

        // updates the items' styles with the specified style template (or parses the styles value as a json string if it is not already an object)
        Logger.module().info("Retrieving item styles...");
        _items = await setItemStyles(_items, _styles);

        _renderPage = true;
    }

    // all item 'styles' value is expected to be a template name. however existing code may detect that ii it not a string, and use it as-is if so e.g. it is a json string for styles object. 
    const setItemStyles = async (items = [], styleTemplates = {}) => {

        for(let item of items) {
            const {
                uuid:   itemId = null,
                styles: styles = null
            } = item;

            if(!styles) continue;

            if(typeof styles !== 'string') {
                Logger.module().info(`Item styles value is not a string for item id: ${itemId}. Expected a json string for styles object, or a style template name`);
                continue;
            }

            // the styles falue is expected to be the name of a style template
            const templateName = styles;

            // assume the 'styles' value is a style template name
            let styleTemplate = styleTemplates[templateName] || {};

            // assign template object to item styles
            if(styleTemplate && Object.keys(styleTemplate).length > 0) {
                item.styles = styleTemplate;
            }

            // the template was not found. if item.styles is a string test if it is a styles object by attempting to parse it as json. if parsing fails, the value is invalid
            else {
                Logger.module().info(`No style template found for item id: ${item.uuid}. Attempting to parse styles value as json string for styles object...`);

                // check if styles value is a json string for styles object. if so, parse it and assign it to item.styles. (object type is not permitted in this field)
                const styleValue = styles;
                try {
                    item.styles = JSON.parse(styleValue || '{}');
                }
                catch(error) {
                    Logger.module().error(`Error parsing styles object for item id: ${itemId}. Error: ${error}. Possible invalid 'styles' value`);
                    item.styles = null;
                }
            }

            // if this item has children items (e.g. it is a container item suchas a grid), set their styles
            if(item.items) {
                item.items = await setItemStyles(item.items, styleTemplates);
            }
        }

        return items;
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

        _modalDialogData = getItemById((itemId || null), _items);
        if(!_modalDialog) _modalDialog = Modal_Item_Display;
    }

    const onOpenPageModal = (event) => {
        openPageModal(event.detail.pageId);
    }

    const openPageModal = (itemId) => {
        _modalDialogData = {
            page: _exhibitData,
            container: getPageById(itemId)
        };

        if(!_modalDialog) _modalDialog = Modal_Page_Display;
    }

    const closeModal = (event) => {
        _modalDialogData = null;
        _modalDialog = null;

        if(location.href.indexOf('#') > 0) {
            history.replaceState(null, null, location.href.substring(0, location.href.indexOf('#')));
        }
    }

    const displayStatusMessage = (message) => {
        if(message) {
            _message = message;
            _showMessageOverlay = true;
        }
        else {
            _message = "";
            _showMessageOverlay = false;   
        }
    }

    const onMountPage = (event) => {
        Logger.module().info("Mounted exhibit page");

        // check for an item id in the url
        let hash = location.hash?.replace('#', '');
        let [itemId] = hash.split('_');

        // if there is an item id in the url, get the item and open it in the modal item viewer
        if(itemId) {
            let item = getItemById(itemId, _items);
            if(item && !item.is_embedded) openViewerModal(itemId);
        }
    }

    const onMountItems = (event) => {
        let {error = null} = event.detail || {};

        if(error) {
            Logger.module().info(`No exhibit items found: ${error}`);
        }
        else {
            Logger.module().info("Mounted exhibit items");
        }

        setTimeout(() => {
            _exhibitDisplay.style.height = "unset";
            _exhibitDisplay.style.overflow = "unset";

            displayStatusMessage(false);

            let anchorId = location.hash?.replace('#', '') || false;
            if(anchorId) _exhibitPage.goToItemId(anchorId, "instant");

        }, Settings.imageLoadDelay)
    }

    init();
</script>

<div class="exhibit-wrapper" bind:this={_exhibitDisplay}>

    <div class="exhibit-load-message container" style="display: {_showMessageOverlay ? 'absolute' : 'none'}">
        <div><h3>{_message}</h3></div>
    </div>

    {#if _renderPage}

        <div class="exhibit" 
                style="visibility: {_showMessageOverlay ? 'hidden' : 'visible'}; 
                    --theme-exhibit-font-color: {DEFAULT_FONT_COLOR}; 
                    --theme-exhibit-background-color: {DEFAULT_BACKGROUND_COLOR}; 
                    --theme-exhibit-font-family: {DEFAULT_FONT_FAMILY};
                    --theme-exhibit-font-size: {DEFAULT_FONT_SIZE}"
            >

            <Exhibit_Menu {_exhibitId} on:click-menu-link={onOpenPageModal} />
        
            <!-- exhibit page -->
            <svelte:component 
                this={_pageLayout} 
                data={_exhibitData} 
                template={_template} 
                sections={_sections} 
                items={_items} 
                styles={_styles} 
                bind:this={_exhibitPage}
                on:mount={onMountPage} 
                on:mount-items={onMountItems} 
                on:click-item={onClickItem} />
        
            {#if _modalDialog}
                <Modal_Dialog_Window 
                    modalDisplay={_modalDialog} 
                    modalData={_modalDialogData} 
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