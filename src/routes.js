import Exhibits from './views/Exhibits.svelte';
import Exhibit from './views/Exhibit.svelte';
import Test_Component from './test/Test_Component.svelte';
import NotFound from './views/NotFound.svelte';

const routes = [
    {name: '/', component: Exhibits}, // TODO add redirect to /exhibits
    {name: '/exhibits', component: Exhibits},
    {name: '/exhibit/:id', component: Exhibit},

    {name: '/test/component/:componentName', component: Test_Component},
    
    {name: '/404', component: NotFound}
]

export { routes }