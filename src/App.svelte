<script>
  import { Router } from 'svelte-router-spa';
  import { routes } from './routes';

  import Header from "./views/partials/Header.svelte";
  import Footer from "./views/partials/Footer.svelte";
</script>

<Header />
<main class="container-1700">
  <Router {routes} />
</main>
<Footer />

<style>
  main {
    min-height: calc(100vh - 200px); /* top header height => 50px, footer height => 150px */
    padding: 78px 0px;
  }
</style>