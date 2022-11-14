import Exhibits from './views/Exhibits.svelte';
import Exhibit from './views/Exhibit.svelte';
import NotFound from './views/NotFound.svelte';

const routes = [
    {name: '/', component: Exhibits},
    {name: '/exhibits', component: Exhibits},
    {name: '/exhibit/:id', component: Exhibit},
    {name: '/404', component: NotFound}
]

export { routes }