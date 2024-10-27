import { writable } from 'svelte/store';

/**********************************************
 * import exhibit templates
 **********************************************/
import Vertical_Scroll from '../Template_Vertical_Scroll.svelte';

/**********************************************
 * import popup pages
 **********************************************/
import About_The_Curators from '../popup/About_The_Curators.svelte';
import Download_Exhibit from '../popup/Download_Exhibit.svelte';

/**********************************************
 * {component id} : {component}
 **********************************************/
export const Templates = writable({
    "timeline": Vertical_Scroll,
    "narrative": Vertical_Scroll,
    "vertical_scroll": Vertical_Scroll
});

export const Popup_Pages = writable({
    "about-the-curators": About_The_Curators,
    "download-exhibit": Download_Exhibit
});