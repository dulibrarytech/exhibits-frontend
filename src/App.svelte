<script>
  import { Router } from 'svelte-router-spa';
  import { routes } from './routes';

  import Header from "./views/partials/Header.svelte";
  import Footer from "./views/partials/Footer.svelte";
  // import Site_Branding from './templates/partials/Site_Branding.svelte';
</script>

<main class="container-1700">
  <Header />
  <!-- <Site_Branding /> -->

  <!-- render page -->
  <Router {routes} />
  <Footer />
</main>

<style>
  @font-face {
        font-family: "Breve Sans Text";
        src: url('../assets/fonts/BreveSansTextLight.otf') format("truetype");
  }

  main {
    font-family: "Breve Sans Text";
    min-height: calc(100vh - 249px); 
  }
</style>