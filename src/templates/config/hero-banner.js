import { writable } from 'svelte/store';

/************************************************
 * hero banner components
 ************************************************/
import Hero_Banner_1 from '../partials/Hero_Banner_1.svelte';
import Hero_Banner_2 from '../partials/Hero_Banner_2.svelte';
import Hero_Banner_3 from '../partials/Hero_Banner_3.svelte';
import Hero_Banner_4 from '../partials/Hero_Banner_4.svelte';
import Hero_Banner_5 from '../partials/Hero_Banner_5.svelte';
import Hero_Banner_6 from '../partials/Hero_Banner_6.svelte';

/**********************************************
 * {component id} : {component}
 **********************************************/
export const Banners = writable({
    "banner_1": Hero_Banner_4,
    "banner_2": Hero_Banner_5,
    "banner_3": Hero_Banner_6,
    // "banner_4": Hero_Banner_1,
    // "banner_5": Hero_Banner_2,
    // "banner_6": Hero_Banner_3
})