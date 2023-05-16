import { writable } from 'svelte/store';

/**********************************************
 * import exhibit templates
 **********************************************/
import Exhibit_Vertical_Scroll from '../Exhibit__Vertical_Scroll.svelte'; 

/**********************************************
 * {component id} : {component}
 **********************************************/
export const Templates = writable({
    "timeline": Exhibit_Vertical_Scroll,
    "narrative": Exhibit_Vertical_Scroll,
    "vertical_scroll": Exhibit_Vertical_Scroll
})