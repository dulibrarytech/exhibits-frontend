import { writable } from 'svelte/store'

export const Settings = writable({

    /*
     * Define item types by mime type
     */
    itemTypes: {

    "image":        ['image/jpg', 'image/jpeg', 'image/png'], // use <img>
    "large_image":  ['image/tiff'], // use OSD viewer
    "audio":        ['audio/mp3'], // audio player (html initially)
    "video":        ['video/mp4', 'video/mov'], // video player (html initially)
    "pdf":          ['application/pdf'] // pdf viewer
    }
})