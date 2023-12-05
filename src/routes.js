import Home from './views/Home.svelte';
import Exhibit from './views/Exhibit.svelte';
import Search from './views/Search.svelte';
import Whats_On from './views/Whats_On.svelte';
import Events from './views/Events.svelte';
import Student_Curated from './views/Student_Curated.svelte';

import Test_Component from './test/Test_Component.svelte';
import Test_View from './test/Test_View.svelte';

import NotFound from './views/NotFound.svelte';

import Home_2 from './views/Home_2.svelte';
import Home_3 from './views/Home_3.svelte';

const routes = [
    /**********************
     * root
     **********************/
    {name: '/', component: Home_3},
    {name: '/exhibits', component: Home_3},

    // Test Home pages //
    {name: '/home2', component: Home_2},
    {name: '/home3', component: Home},

    /**********************
     * app pages
     **********************/
    {name: '/exhibit/:id', component: Exhibit},
    {name: '/search', component: Search},

    /**********************
     * user content pages
     **********************/
    {name: '/whats-on', component: Whats_On},
    {name: '/events', component: Events},
    {name: '/student-curated', component: Student_Curated},


    /**********************
     * test
     **********************/
    {name: '/test/component/:name', component: Test_Component},
    {name: '/test/view/:name', component: Test_View},
    
    /**********************
     * defaults
     **********************/
    {name: '/404', component: NotFound}
]

export { routes }