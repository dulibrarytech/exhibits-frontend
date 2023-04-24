import App from './App.svelte';

/*
 * import css assets for external libs
 */
import './bootstrap-template_topnav.css';
import './bootstrap-template_sidebar-nav.css';

/*
 * import application css file
 */
import './global.css';

const app = new App({
	target: document.body,
});

export default app;