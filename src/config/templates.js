import { writable } from 'svelte/store'

import Vertical_Scroll from '../templates/Vertical_Scroll.svelte'; 

export const Templates = writable({
    "timeline": Vertical_Scroll,
    "narrative": Vertical_Scroll,
    "vertical_scroll": Vertical_Scroll
    //"item_centered": Item_Page
})