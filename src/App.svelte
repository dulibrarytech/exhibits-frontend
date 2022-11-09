<script>
  import { Router } from 'svelte-router-spa'
  import { routes } from './routes'
  import Header from "./views/partials/Header.svelte";
  import Footer from "./views/partials/Footer.svelte";
	
</script>

<Header />
  <main class="container">
    <Router {routes} />
  </main>
<Footer />

<style>

</style>