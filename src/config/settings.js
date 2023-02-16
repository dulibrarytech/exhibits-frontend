/**
 * User settings
 * Update this file or via admin UI
 */

const ITEM_TYPES = {
    IMAGE: "image",
    LARGE_IMAGE: "large_image",
    AUDIO: "audio",
    VIDEO: "video",
    PDF: "pdf",
    REPO: "repo",
    EXTERNAL_SOURCE: "external"
}

export const Settings = {
    itemTypes: ITEM_TYPES,
    /*
     * Mime types for item type
     */
    mimeTypes: {
        [ITEM_TYPES.IMAGE]:        ['image/jpg', 'image/jpeg', 'image/png'], // use <img>
        [ITEM_TYPES.LARGE_IMAGE]:  ['image/tiff'], // use OSD viewer
        [ITEM_TYPES.AUDIO]:        ['audio/mp3', 'audio/mpeg'], // audio player (html initially)
        [ITEM_TYPES.VIDEO]:        ['video/mp4', 'video/mov'], // video player (html initially)
        [ITEM_TYPES.PDF]:          ['application/pdf'] // pdf viewer
    },

    /*
     * File extensions for item type
     */
    fileExtensions: {
        [ITEM_TYPES.IMAGE]:        ['jpg', 'jpeg', 'png'],
        [ITEM_TYPES.LARGE_IMAGE]:  ['tif', 'tiff'],
        [ITEM_TYPES.AUDIO]:        ['mp3'],
        [ITEM_TYPES.VIDEO]:        ['mp4'],
        [ITEM_TYPES.PDF]:          ['pdf']
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
     * Component properties
     */
    itemPreviewLayout: "tn_right"
}