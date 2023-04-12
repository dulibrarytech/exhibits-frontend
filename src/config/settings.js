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
        [ITEM_TYPE.AUDIO]:        ['audio/mp3', 'audio/mpeg'], // audio player (html initially)
        [ITEM_TYPE.VIDEO]:        ['video/mp4', 'video/mov'], // video player (html initially)
        [ITEM_TYPE.PDF]:          ['application/pdf'] // pdf viewer
    },

    /*
     * File extensions for item type
     */
    fileExtensions: {
        [ITEM_TYPE.IMAGE]:        ['jpg', 'jpeg', 'png'],
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
     * Thumbnail properties
     */
    thumbnailImageLocation: "/storage/tn",
    thumbnailImageHeight: "",
    thumbnailImageWidth: "200",
    thumbnailIcon: {
        DEFAULT: "image-tn.png",
        IMAGE: "image-tn.png",
        AUDIO: "audio-tn.png",
        VIDEO: "video-tn.png",
        PDF: "pdf-tn.png"
    },

    /*
     * Template properties
     */
    gridItemDefaultLayout: "item_top"
}