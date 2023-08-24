<script>
    /* 
     * Requires bootstrap >=5.0
     */
    'use strict'

    import { onMount } from 'svelte';
    //import jQuery from 'jquery';
    import { Menu_Links } from '../config/menu.js';

    let links = null;

    //jQuery.noConflict(true)

    //console.log("jQuery:", jQuery('.site-link'))

    //jQuery('#testid').hide()

    $: links = Menu_Links;

    onMount(() => {
		//window.jQuery = jQuery;

        //console.log("window jQuery:", jQuery)

        //siteSticky();
        
        // iterate Menu, adding links to links[]
        // OR links = Menu_Links
	});
</script>

<div class="site-menu-toggle">
    <a data-bs-toggle="collapse" href="#menu" role="button" aria-expanded="false" aria-controls="menu">
        <i class="bi bi-list"></i>
    </a>
</div>

<div class="collapse site-menu" id="menu">
    <div class="site-menu-links card card-body">
        {#each links as link}
            {#if link.open_new_tab}
                <a href={link.url} target="_blank">{link.label}</a>
            {:else}
                <a href={link.url}>{link.label}</a>
            {/if}
        {/each}
    </div>
</div>

<style>
    .site-menu-toggle {
        position: absolute;
        right: 9px;
        top: -3px;
        z-index: 10;
    }

    .site-menu-toggle i {
        font-size: 2.2em;
        color: white;
    }

    .site-menu {
        background: rgb(229, 227, 225);
    }

    .site-menu .card {
        border: none;
        border-radius: unset;
        flex-direction: row;
    }

    .site-menu a {
        color: #616161;
    }

    .site-menu a:not(:first-child) {
        margin-left: 20px;
    }

    .site-menu-links {
        background: inherit;
    }
</style>