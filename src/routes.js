import Exhibits_Home from './views/Exhibits_Home.svelte';
import Exhibits_Explore from './views/Exhibits_Explore.svelte';
import Exhibit from './views/Exhibit.svelte';
import Search from './views/Search.svelte';
import Whats_On from './views/Whats_On.svelte';
import Events from './views/Events.svelte';

import Test_Component from './test/Test_Component.svelte';
import Test_View from './test/Test_View.svelte';

import NotFound from './views/NotFound.svelte';

const routes = [
    /**********************
     * root
     **********************/
    {name: '/', component: Exhibits_Home},

    /**********************
     * app pages
     **********************/
    {name: '/exhibits-home', component: Exhibits_Home},
    {name: '/exhibits-explore', component: Exhibits_Explore},
    {name: '/exhibit/:id', component: Exhibit},
    {name: '/search', component: Search},

    /**********************
     * user content pages
     **********************/
    {name: '/whats-on', component: Whats_On},
    {name: '/events', component: Events},


    /**********************
     * test
     **********************/
    {name: '/test/component/:name', component: Test_Component},
    {name: '/test/view/:name', component: Test_View},
    
    /**********************
     * defaults
     **********************/
    {name: '404', path: '404', component: NotFound}
]

export { routes }