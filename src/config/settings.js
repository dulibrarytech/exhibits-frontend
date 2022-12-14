/**
 * User settings
 * Update this file or via admin UI
 */

import { writable } from 'svelte/store'

export const Settings = {
    /*
     * Associate item types with mime type
     */
    itemTypes: {
        "image":        ['image/jpg', 'image/jpeg', 'image/png'], // use <img>
        "large_image":  ['image/tiff'], // use OSD viewer
        "audio":        ['audio/mp3', 'audio/mpeg'], // audio player (html initially)
        "video":        ['video/mp4', 'video/mov'], // video player (html initially)
        "pdf":          ['application/pdf'] // pdf viewer
    },

    /*
     * Associate item types with file extensions
     */
    fileExtensions: {
        "image":        ['jpg', 'jpeg', 'png'],
        "large_image":  ['tif', 'tiff'],
        "audio":        ['mp3'],
        "video":        ['mp4'],
        "pdf":          ['pdf']
    },
    repositoryFields: {
        mimeType: "mime_type"
    }
}