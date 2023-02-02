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
     * 
     */
    mimeTypes: {
        [ITEM_TYPES.IMAGE]:        ['image/jpg', 'image/jpeg', 'image/png'], // use <img>
        [ITEM_TYPES.LARGE_IMAGE]:  ['image/tiff'], // use OSD viewer
        [ITEM_TYPES.AUDIO]:        ['audio/mp3', 'audio/mpeg'], // audio player (html initially)
        [ITEM_TYPES.VIDEO]:        ['video/mp4', 'video/mov'], // video player (html initially)
        [ITEM_TYPES.PDF]:          ['application/pdf'] // pdf viewer
    },

    /*
     * 
     */
    fileExtensions: {
        [ITEM_TYPES.IMAGE]:        ['jpg', 'jpeg', 'png'],
        [ITEM_TYPES.LARGE_IMAGE]:  ['tif', 'tiff'],
        [ITEM_TYPES.AUDIO]:        ['mp3'],
        [ITEM_TYPES.VIDEO]:        ['mp4'],
        [ITEM_TYPES.PDF]:          ['pdf']
    }
}