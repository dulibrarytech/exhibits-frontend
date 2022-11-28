<script>
  import { Router } from 'svelte-router-spa'
  import { routes } from './routes'
  import { testRoutes } from './test/routes'
  import Header from "./views/partials/Header.svelte";
  import Footer from "./views/partials/Footer.svelte";
	
</script>

<Header />
  <main class="container">
    <Router {routes} />

    <!-- <Router {testRoutes} /> -->
  </main>
<Footer />

<style>

</style>