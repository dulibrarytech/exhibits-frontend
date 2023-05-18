import { writable } from 'svelte/store';

/**********************************************
 * import exhibit templates
 **********************************************/
import Vertical_Scroll from '../exhibit/template/Vertical_Scroll.svelte'; 

/**********************************************
 * {component id} : {component}
 **********************************************/
export const Templates = writable({
    "timeline": Vertical_Scroll,
    "narrative": Vertical_Scroll,
    "vertical_scroll": Vertical_Scroll
})