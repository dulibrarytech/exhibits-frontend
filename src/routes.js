import Exhibits from './views/Exhibits.svelte';
import Exhibit from './views/Exhibit.svelte';
import Test_Component from './test/Test_Component.svelte';
import Test_View from './test/Test_View.svelte';
import NotFound from './views/NotFound.svelte';

const routes = [
    {name: '/', component: Exhibits}, // TODO add redirect to /exhibits
    {name: '/exhibits', component: Exhibits},
    {name: '/exhibit/:id', component: Exhibit},

    {name: '/test/component/:name', component: Test_Component},
    {name: '/test/view/:name', component: Test_View},
    
    {name: '/404', component: NotFound}
]

export { routes }