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

<!-- collapsing menu option -->
<div class="collapse site-menu" id="menu">
    <div class="site-menu-links card card-body">
        {#each links as link}
            {#if link.open_new_tab}
                <a href data-href={link.url} data-target="blank" on:click={onClickLink}>{link.label}</a>
            {:else}
                <a href data-href={link.url} on:click={onClickLink}>{link.label}</a>
            {/if}
        {/each}
    </div>
</div>
<div class="site-menu-toggle">
    <a data-bs-toggle="collapse" href="#menu" role="button" aria-expanded="false" aria-controls="menu" aria-label="expand site menu" title="Site Menu">
        <i class="bi bi-list"></i>
    </a>
</div>
<!-- end collapsing menu option -->

<!-- fixed open menu option --> 
<!-- <div class="site-menu" id="menu"> 
    <div class="site-menu-links card card-body">
        {#each links as link}
            {#if link.open_new_tab}
                <a href data-href={link.url} data-target="blank" on:click={onClickLink}>{link.label}</a>
            {:else}
                <a href data-href={link.url} on:click={onClickLink}>{link.label}</a>
            {/if}
        {/each}
    </div>
</div> -->
<!-- end fixed open menu option --> 

<style>
    .site-menu {
        /* background: rgb(229, 227, 225); */
        background: #f5f3f1;
        position: relative;
        top: 78px;
    }

    .site-menu-toggle {
        position: absolute;
        right: 11px;
        top: 78px;
        z-index: 10;
    }

    .site-menu-toggle i {
        font-size: 36px;
        /* color: white; */
        color: #18171e;
    }

    .site-menu .card {
        border: none;
        border-radius: unset;
        flex-direction: row;
    }

    .site-menu .card-body {
        padding: 1rem 1.65rem;
    }

    .site-menu a {
        color: #313131;
    }

    .site-menu a:not(:first-child) {
        margin-left: 20px;
    }

    .site-menu-links {
        background: inherit;
    }
</style>