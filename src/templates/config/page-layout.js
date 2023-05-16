import { writable } from 'svelte/store';

/**********************************************
 * exhibit page layout template components
 **********************************************/
import Page_Layout__Top_Nav from '../Page_Layout__Top_Nav.svelte';
import Page_Layout__Side_Nav from '../Page_Layout__Side_Nav.svelte';

/**********************************************
 * {component id} : {component}
 **********************************************/
export const Page_Layouts = writable({
    "top_nav": Page_Layout__Top_Nav,
    "side_nav": Page_Layout__Side_Nav
})