import Home from './views/Home.svelte';
import Exhibit from './views/Exhibit.svelte';
import Test_Component from './test/Test_Component.svelte';
import Test_View from './test/Test_View.svelte';
import NotFound from './views/NotFound.svelte';

const routes = [
    /**********************
     * root
     **********************/
    {name: '/', component: Home}, // TODO add redirect to /exhibits

    /**********************
     * exhibit
     **********************/
    {name: '/exhibit', component: Home},
    {name: '/exhibit/:id', component: Exhibit},

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