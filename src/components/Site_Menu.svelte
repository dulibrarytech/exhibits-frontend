<script>
    /* 
     * Requires bootstrap >=5.0
     */
    'use strict'

    import { Menu_Links } from '../config/menu.js';

    export let links = null;

    $: links = Menu_Links;

    const onClickLink = (event) => {
        let url;
        let location = event.target.getAttribute('data-href') || "#";
        let target = event.target.getAttribute('data-target') || "self";

        url = location;

        if(target == "blank") window.open(url, '_blank');
        else window.location.replace(url);
    }
</script>

<!-- collapsing site menu option -->
<!-- <div class="collapse site-menu" id="menu">
    <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        {#each links as link}
            {#if link.open_new_tab}
                <a href class="me-3 py-2 text-dark text-decoration-none" data-href={link.url} data-target="blank" on:click={onClickLink}>{link.label}</a>
            {:else}
                <a href class="me-3 py-2 text-dark text-decoration-none" data-href={link.url} on:click={onClickLink}>{link.label}</a>
            {/if}
        {/each}
    </nav>
</div>
<div class="site-menu-toggle">
    <a data-bs-toggle="collapse" href="#menu" role="button" aria-expanded="false" aria-controls="menu" aria-label="expand site menu" title="Site Menu">
        <i class="bi bi-list"></i>
    </a>
</div> -->
<!-- end collapsing site menu option -->

<nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
    {#each links as link}
        {#if link.open_new_tab}
            <a href class="me-3 py-2 text-dark text-decoration-none" data-href={link.url} data-target="blank" on:click={onClickLink}>{link.label}</a>
        {:else}
            <a href class="me-3 py-2 text-dark text-decoration-none" data-href={link.url} on:click={onClickLink}>{link.label}</a>
        {/if}
    {/each}
</nav>

<style>

</style>