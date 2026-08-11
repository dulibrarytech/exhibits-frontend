<script>
  import { Router } from 'svelte-router-spa';
  import { routes } from './routes';
  import { Settings } from './config/settings';

  import Header from "./views/partials/Header.svelte";
  import Footer from "./views/partials/Footer.svelte";

  const {
    DEFAULT_FONT_COLOR,
    DEFAULT_FONT_SIZE,
    DEFAULT_FONT_FAMILY,
    DEFAULT_BACKGROUND_COLOR,
    DEFAULT_CAPTION_FONT_FAMILY,
    DEFAULT_CAPTION_FONT_SIZE,
    DEFAULT_NAVIGATION_FONT_FAMILY,
    DEFAULT_NAVIGATION_FONT_SIZE,
  } = Settings.siteDefaultTheme;

</script>

<style>
  .site-wrapper {
    min-height: calc(100vh - 249px); 
    color: var(--theme-site-font-color);
    font-size: var(--theme-site-font-size);
    font-family: var(--theme-site-font-family);
    background-color: var(--theme-site-background-color);
  }
</style>

 <div class="site-wrapper"
    style="
      --theme-site-font-color: {DEFAULT_FONT_COLOR}; 
      --theme-site-background-color: {DEFAULT_BACKGROUND_COLOR}; 
      --theme-site-font-size: {DEFAULT_FONT_SIZE};
      --theme-site-font-family: {DEFAULT_FONT_FAMILY};
      --theme-site-caption-font-family: {DEFAULT_CAPTION_FONT_FAMILY};
      --theme-site-caption-font-size: {DEFAULT_CAPTION_FONT_SIZE};
      --theme-site-navigation-font-family: {DEFAULT_NAVIGATION_FONT_FAMILY};
      --theme-site-navigation-font-size: {DEFAULT_NAVIGATION_FONT_SIZE};
    ">

  <Header />
  <main>
    <Router {routes} />
  </main>
  <Footer />
  
 </div>