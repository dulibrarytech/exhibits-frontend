import { writable } from 'svelte/store';

/************************************************
 * import hero banner components
 ************************************************/
import Hero_Banner_1 from '../partials/Hero_Banner_1.svelte';
import Hero_Banner_2 from '../partials/Hero_Banner_2.svelte';
import Hero_Banner_3 from '../partials/Hero_Banner_3.svelte';
import Hero_Banner_4 from '../partials/Hero_Banner_4.svelte';

/**********************************************
 * map {component id} : {component}
 **********************************************/
export const Banners = writable({
    "banner_1": Hero_Banner_1,
    "banner_2": Hero_Banner_2,
    "banner_3": Hero_Banner_3,
    "banner_4": Hero_Banner_4
})