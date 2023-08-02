<script>
    'use strict'

    import { onMount } from 'svelte';
    import jQuery from 'jquery';

    jQuery.noConflict(true)

    console.log("jQuery:", jQuery('.site-link'))

    jQuery('#testid').hide()

    onMount(() => {
		//window.jQuery = jQuery;

        //console.log("window jQuery:", jQuery)

        //siteSticky();
	});
</script>

<div class="main-menu" id="testid">
    <a href="#"><i class="bi bi-list"></i></a>
</div>

<style>
    .main-menu {
        position: absolute;
        right: 9px;
        top: -3px;
        z-index: 10;
    }

    .main-menu i {
        font-size: 2.2em;
        color: white;
    }
</style>