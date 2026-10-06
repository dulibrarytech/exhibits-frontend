<script>
    /* 
     * Requires bootstrap >=5.0
     */
    'use strict'

    import { navigateTo } from 'svelte-router-spa';
    import { Menu_Links } from '../config/menu.js';

    export let links = null;

    $: links = Menu_Links;

    const onClickLink = (event) => {
        let url;
        let location = event.target.getAttribute('data-href') || "#";
        let target = event.target.getAttribute('data-target') || "self";

        url = location;

        if(target == "blank") window.open(url, '_blank');
        else navigateTo(url);
    }
</script>

<nav class="site-menu d-inline-flex ms-md-auto">
    {#each links as link}
        {#if link.open_new_tab}
            <a href class="ms-3 pt-1 text-dark text-decoration-none" data-href={link.url} data-target="blank" on:click={onClickLink}>{link.label}</a>
        {:else}
            <a href class="ms-3 pt-1 text-dark text-decoration-none" data-href={link.url} on:click={onClickLink}>{link.label}</a>
        {/if}
    {/each}
</nav>

<style>
    .site-menu {
        font-weight: bold;
        margin-top: 20px;
    }

    @media screen and (min-width: 768px) {
        .site-menu {
            margin-top: 2px;
        }
    }
</style>