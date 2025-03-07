<script>
  import { Router } from 'svelte-router-spa';
  import { routes } from './routes';
  import { links } from './menu';

  import Header from "./views/partials/Header.svelte";
  import Footer from "./views/partials/Footer.svelte";
  import Site_Menu from "./components/Site_Menu.svelte";
</script>

<Header />
<main class="container-1700">
  <Site_Menu {links} />
  <Router {routes} />
</main>
<Footer />

<style>
  main {
    min-height: calc(100vh - 200px); /* top header height => 50px, footer height => 150px */
    padding: 78px 0px;
  }
</style>