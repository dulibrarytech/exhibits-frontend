import { writable } from 'svelte/store';

/**********************************************
 * exhibit page layout template components
 **********************************************/
import Top_Nav_Page_Layout from '../page-layouts/Top_Nav_Page_Layout.svelte';
import Side_Nav_Page_Layout from '../page-layouts/Side_Nav_Page_Layout.svelte';

/**********************************************
 * {component id} : {component}
 **********************************************/
export const Page_Layouts = writable({
    "top_nav": Top_Nav_Page_Layout,
    "side_nav": Side_Nav_Page_Layout
})