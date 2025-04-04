<script>
  import { Router } from 'svelte-router-spa';
  import { routes } from './routes';

  import Header from "./views/partials/Header.svelte";
  import Footer from "./views/partials/Footer.svelte";
  // import Site_Branding from './templates/partials/Site_Branding.svelte';
</script>

<Header />
<main class="container-1700">
  <!-- <Site_Branding /> -->

  <!-- render page -->
  <Router {routes} />
</main>
<Footer />

<style>
  main {
    min-height: calc(100vh - 249px); /* top header height => 50px, footer height => 150px */
  }
</style>