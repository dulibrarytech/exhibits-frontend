import { writable } from 'svelte/store';

/**********************************************
 * exhibit page layout template components
 **********************************************/
import Top_Nav from '../Page_Layout_Top_Nav.svelte';
import Side_Nav from '../Page_Layout_Side_Nav.svelte';

/**********************************************
 * {component id} : {component}
 **********************************************/
export const Page_Layouts = writable({
    "top_nav": Top_Nav,
    "side_nav": Side_Nav
})