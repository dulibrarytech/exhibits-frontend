/**
 * User settings
 * Update this file or via admin UI
 */
import { ITEM_TYPE } from './global-constants.js';

export const Settings = {
    /*
     * Mime types for item type
     */
    mimeTypes: {
        [ITEM_TYPE.IMAGE]:        ['image/jpg', 'image/jpeg', 'image/png'], // use <img>
        [ITEM_TYPE.LARGE_IMAGE]:  ['image/tiff'], // use OSD viewer
        [ITEM_TYPE.AUDIO]:        ['audio/mp3', 'audio/mpeg', 'audio/x-wav'], // audio player (html initially)
        [ITEM_TYPE.VIDEO]:        ['video/mp4', 'video/mov'], // video player (html initially)
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
    kalturaUI_ID: "44058172",
    kalturaUniqueObjectID: "kaltura_player_1559751114",
    kalturaFlavorId: "0_7gx3rx5v",
    kalturaPlayerHeight: "",
    kalturaPlayerWidth: "",
    kalturaThumbnailWidth: "200",
    kalturaThumbnailHeight: "250",

    /*
     * html tags allowed in user content
     */
    allowedHtmlTags: ['div', 'p', 'em', 'strong', 'style', 'i', 'br', 'b', 'span', 'img'],

    /*
     * thumbnail images
     */
    thumbnailImageLocation: "tn",
    placeholderImageHeight: "",
    placeholderImageWidth: "400",
    placeholderImage: {
        DEFAULT: "image-tn.png",
        IMAGE: "image-tn.png",
        AUDIO: "audio-tn.png",
        VIDEO: "video-tn.png",
        PDF: "pdf-tn.png"
    },
    exhibitDefaultImage: "exhibit-default.png",

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
     * repository 
     */
    repositoryObjectDataEndpoint: "/repository/data/{item_id}",
    repositoryDatastreamUrl: "/datastream/{item_id}",
    repositoryThumbnailDatastreamEndpoint: "tn",
    repositoryImageDatastreamEndpoint: "jpg",
    repositoryObjectDatastreamEndpoint: "object",

    /*
     * Time period for exhibit to be displayed in the 'Recently Added' exhibits section
     * In days  (e.g. 30 days: an exhibit is no longer shown in the 'recently added' section if it was added > 30 days ago)
     */
    recentExhibitsPeriod: 60,

    /* 
     * Index fields included in search (in 'search all', when search field is not specified by user)
     * {index field name}:{human display name}
     */
    searchFields: {
        "title": "Title",
        "description": "Description"
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
     * Limit panel labels (facet labels)
     */
    facetLabels: {
        "type": "Entity",
        "is_member_of_exhibit": "Exhibits",
        "item_type": "Item Type"
    },
    facetValueLabels: {
        "item": "Exhibit Item",
        "exhibit": "Exhibit",
        "grid": "Exhibit Item Grid",
        "text": "Exhibit Text",
        "image": "Image",
        "audio": "Audio",
        "video": "Video",
        "pdf": "Text Document",
        "external": "Unknown Type"
    }
}