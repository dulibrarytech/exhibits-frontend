import { writable } from 'svelte/store'

/***********************
 * template components
 ***********************/
import Vertical_Scroll from '../templates/Vertical_Scroll.svelte'; 

export const Templates = writable({
    "timeline": Vertical_Scroll,
    "narrative": Vertical_Scroll,
    "vertical_scroll": Vertical_Scroll
    // "item_centered": Item_Page
})

/*************************
 * hero banner components
 *************************/
import Hero_Banner_1 from '../templates/partials/Hero_Banner_1.svelte'; 

export const Banners = writable({
    "banner_1": Hero_Banner_1
})