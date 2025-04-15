<script>
  import { Router } from 'svelte-router-spa';
  import { routes } from './routes';

  import Header from "./views/partials/Header.svelte";
  import Footer from "./views/partials/Footer.svelte";
</script>

<main class="container-1700">
  <Header />

  <!-- render page -->
  <Router {routes} />
  
  <Footer />
</main>

<style>

  main {
    min-height: calc(100vh - 249px); 
  }
</style>