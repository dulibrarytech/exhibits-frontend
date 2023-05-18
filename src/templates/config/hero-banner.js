import { writable } from 'svelte/store';

/************************************************
 * hero banner components
 ************************************************/
import Hero_Banner_1 from '../exhibit/hero/partial/Hero_Banner_1.svelte';
import Hero_Banner_2 from '../exhibit/hero/partial/Hero_Banner_2.svelte';

/**********************************************
 * {component id} : {component}
 **********************************************/
export const Banners = writable({
    "banner_1": Hero_Banner_1,
    "banner_2": Hero_Banner_2
})