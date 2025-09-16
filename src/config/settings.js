/**
 * User settings
 * Update this file or via admin UI
 */
import { EXHIBIT_TEMPLATE, ITEM_TYPE } from './global-constants.js';

export const Settings = {
    appTitle: "Exhibits @ DU",

    siteDefaultTheme: {
        DEFAULT_FONT_FAMILY: "IBM Plex Sans",
        DEFAULT_FONT_COLOR: "#181818",
        DEFAULT_FONT_SIZE: "18px",
        DEFAULT_BACKGROUND_COLOR: "#FFFFFF",
    },

    exhibitDefaultTheme: {
        DEFAULT_FONT_FAMILY: "Arial",
        DEFAULT_FONT_COLOR: "#181818",
        DEFAULT_FONT_SIZE: "20px",
        DEFAULT_BACKGROUND_COLOR: "#FFFFFF",
    },

    imageAssetsPath: "/assets/images",

    /*
     * Mime types for item type
     */
    mimeTypes: {
        [ITEM_TYPE.IMAGE]:        ['image/jpg', 'image/jpeg', 'image/png'], // use <img>
        [ITEM_TYPE.LARGE_IMAGE]:  ['image/tiff'], // use OSD viewer
        [ITEM_TYPE.AUDIO]:        ['audio/mp3', 'audio/mpeg', 'audio/x-wav'], // audio player (html initially)
        [ITEM_TYPE.VIDEO]:        ['video/mp4', 'video/mov', 'video/quicktime'], // video player (html initially)
        [ITEM_TYPE.PDF]:          ['application/pdf'] // pdf viewer
    },

    /*
     * File extensions for item type
     */
    fileExtensions: {
        [ITEM_TYPE.IMAGE]:        ['jpg', 'jpeg', 'png', 'gif'],
        [ITEM_TYPE.LARGE_IMAGE]:  ['tif', 'tiff'],
        [ITEM_TYPE.AUDIO]:        ['mp3'],
        [ITEM_TYPE.VIDEO]:        ['mp4'],
        [ITEM_TYPE.PDF]:          ['pdf']
    },

    /*
     * Kaltura embedded viewer settings
     * Kaltura stream settings
     */
    kalturaDomain: "https://cdnapisec.kaltura.com",
    kalturaPartnerID: "2357732",
    kalturaUiConfID: "44461971",
    kalturaTranscriptUiConfID: "44058172",
    kalturaUniqueObjectID: "kaltura_player_1559751114",
    kalturaFlavorId: "0_7gx3rx5v",
    kalturaPlayerHeight: "100%",
    kalturaPlayerWidth: "100%",
    kalturaThumbnailWidth: "full",
    kalturaThumbnailHeight: "full",

    /*
     * User html fields
     */
    htmlFieldsExhibit: ['title', 'subtitle', 'description', 'alert_text', 'about_the_curators'],
    htmlFieldsExhibitItem: ['title', 'subtitle', 'text', 'description', 'caption'],

    /*
     * html tags allowed in user content
     */
    permittedHtmlTags: ['div', 'p', 'em', 'strong', 'style', 'i', 'b', 'br', 'hr', 'b', 'span', 'button'],

    /*
     * html tags to extract inner text from in non-html textual displays
     */
    permittedHtmlInnerTextTags: ['div', 'p', 'span', 'i', 'b', 'strong'],

    /*
     * thumbnail images
     */
    placeholderImageHeight: "",
    placeholderImageWidth: "250",
    placeholderImage: {
        'DEFAULT': "image-tn.png",
        [ITEM_TYPE.IMAGE]: "image-tn.png",
        [ITEM_TYPE.LARGE_IMAGE]: "image-tn.png",
        [ITEM_TYPE.AUDIO]: "audio-tn.png",
        [ITEM_TYPE.VIDEO]: "video-tn.png",
        [ITEM_TYPE.PDF]: "pdf-tn.png"
    },
    exhibitDefaultImage: "exhibit-default.png",

    /*
     * Delay time before showing the exhibit to allow all exhibit preview images to load
     * in milliseconds
     */
    imageLoadDelay: 2000,

    /*
     * Template properties 
     */
    gridItemDefaultLayout: "item_top",
    defaultBannerTemplate: "banner_1",

    /*
     * Homepage settings
     */
    defaultHeroImage: null,
    heroSliderAutoplayEnabled: false,
    heroSliderAutoplayDuration: 5000,

    /*
     * Time period for exhibit to be displayed in the 'Recently Added' exhibits section
     * In days  (e.g. 30 days: an exhibit is no longer shown in the 'recently added' section if it was added > 30 days ago)
     */
    recentExhibitsPeriod: 60,

    /* 
     * Index fields included in search (in 'search all', when search field is not specified by user)
     * {index field name}:{human display name}
     */
    searchFieldsExhibit: {
        "title": "Title",
        "subtitle": "Subtitle",
        "description": "Description"
    },
    searchFieldsExhibitItem: {
        "title": "Title",
        "description": "Description",
        "text": "Text",
        "caption": "Caption"
    },

    /* 
     * Index fields included in search result data
     */
    searchResultDisplayFields: {
        "title": "Title",
        "description": "Description",
        "text": "Text"
    },

    /*
     * Styles permitted to be applied by the exhibit creator 
     */
    userThemeStyles: ['color', 'background', 'backgroundColor', 'backgroundImage', 'fontFamily', 'fontWeight', 'textAlign'],
    // userThemeStyles: {
    //     THEME_OBJECT.EXHIBIT_TEMPLATE: ['color', 'background', 'backgroundColor', 'fontFamily', 'fontWeight', 'textAlign']
    // }

    /*
     * Location of font files (.otf)
     */
    fontFileLocation: "../assets/fonts",

    /*
     * Limit panel labels (facet labels)
     */
    facetLabels: {
        "type": "Type",
        "is_member_of_exhibit": "Exhibit",
        "item_type": "Format",
        "keyword": "Keywords"
    },
    facetValueLabels: {
        "item": "Exhibit Item",
        "exhibit": "Exhibit",
        "text": "Exhibit Text",
        "image": "Image",
        "audio": "Audio",
        "video": "Video",
        "pdf": "Text Document",
        "external": "Unknown Type"
    },
    facetValues: {
        "type": ["item", "exhibit"],
        "item_type": ["image", "audio", "video", "pdf"],
        // "is_member_of_exhibit": "*"
    },

    /*
     * Default top-level theme styles
     */
    defaultThemeStyles: {
        sectionPadding: "3.5em"
    },

    /*
     * Data object fields
     * exhibit
     */
    exhibitDataFields: {
        UUID: "uuid",
        TYPE: "type",
        TITLE: "title",
        SUBTITLE: "subtitle",
        BANNER_TEMPLATE: "banner_template",
        ABOUT_THE_CURATORS: "about_the_curators",
        ALERT_TEXT: "alert_text",
        HERO_IMAGE: "hero_image",
        THUMBNAIL_IMAGE: "thumbnail_image",
        DESCRIPTION: "description",
        PAGE_LAYOUT: "page_layout",
        EXHIBIT_TEMPLATE: "exhibit_template",
        STYLES: "styles",
        IS_FEATURED: "is_featured",
        IS_PUBLISHED: "is_published",
        IS_STUDENT: "is_student_curated",
        CREATED: "created"
    },

    /*
     * Data object fields
     * item
     */
    exhibitItemDataFields: {
        TITLE: "title",
        IS_MEMBER_OF_EXHIBIT: "is_member_of_exhibit",
        IS_PUBLISHED: "is_published",
        CREATED: "created"
    },

    exhibitItemDefaultTitle: "Untitled item",
    exhibitHeroImageAltText: "Exhibit hero image",
    exhibitPreviewImageAltText: "click to enter exhibit",
}
