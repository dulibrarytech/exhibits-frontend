import { writable } from 'svelte/store';

/**********************************************
 * exhibit page layout template components
 **********************************************/
import Top_Nav_Page_Layout from '../templates/page-layouts/Top_Nav_Page_Layout.svelte';
import Side_Nav_Page_Layout from '../templates/page-layouts/Side_Nav_Page_Layout.svelte';

export const Page_Layouts = writable({
    "top_nav": Top_Nav_Page_Layout,
    "side_nav": Side_Nav_Page_Layout
})

/**********************************************
 * exhibit template components
 **********************************************/
import Exhibit_Vertical_Scroll from '../templates/Exhibit_Vertical_Scroll.svelte'; 

export const Templates = writable({
    "timeline": Exhibit_Vertical_Scroll,
    "narrative": Exhibit_Vertical_Scroll,
    "vertical_scroll": Exhibit_Vertical_Scroll
})

/************************************************
 * hero banner components
 ************************************************/
import Hero_Banner_1 from '../templates/partials/Hero_Banner_1.svelte'; 

export const Banners = writable({
    "banner_1": Hero_Banner_1
})