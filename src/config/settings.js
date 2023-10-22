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
     * placeholder image properties
     */
    placeholderImageLocation: "/storage/tn",
    placeholderImageHeight: "",
    placeholderImageWidth: "400",
    placeholderImage: {
        DEFAULT: "image-tn.png",
        IMAGE: "image-tn.png",
        AUDIO: "audio-tn.png",
        VIDEO: "video-tn.png",
        PDF: "pdf-tn.png"
    },
    // exhibitThumbnailWidth: "200",
    // exhibitThumbnailHeight: "",

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
    repositoryObjectDataEndpoint: "/repository/data/{item_id}?key=aec05269d7acf72b1d17f0eb354dd2f0",
    repositoryDatastreamUrl: "/datastream/{item_id}",
    repositoryThumbnailDatastreamEndpoint: "tn",
    repositoryImageDatastreamEndpoint: "jpg",
    repositoryObjectDatastreamEndpoint: "object",

    /* 
     * Index fields included in search (in 'search all', when search field is not specified by user)
     * {index field name}:{human display name}
     */
    searchFieldsExhibit: {
        "title": "Title",
        "description": "Description"
    },
    searchFieldsExhibitItem: {
        "title": "Title",
        "description": "Description"
    },

    /*
     * Styles permitted to be applied by the exhibit creator 
     */
    userThemeStyles: ['color', 'background', 'backgroundColor', 'backgroundImage', 'fontFamily', 'fontWeight', 'textAlign']

    // userThemeStyles: {
    //     THEME_OBJECT.EXHIBIT_TEMPLATE: ['color', 'background', 'backgroundColor', 'fontFamily', 'fontWeight', 'textAlign']
    // }
}