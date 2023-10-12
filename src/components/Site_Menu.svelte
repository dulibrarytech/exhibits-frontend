<script>
    /* 
     * Requires bootstrap >=5.0
     */
    'use strict'

    import { Menu_Links } from '../config/menu.js';

    let links = null;

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

<div class="site-menu-toggle">
    <a data-bs-toggle="collapse" href="#menu" role="button" aria-expanded="false" aria-controls="menu">
        <i class="bi bi-list"></i>
    </a>
</div>

<div class="collapse site-menu" id="menu">
    <div class="site-menu-links card card-body">
        {#each links as link}
            {#if link.open_new_tab}
                <a href data-href={link.media} data-target="blank" on:click={onClickLink}>{link.label}</a>
            {:else}
                <a href data-href={link.media} on:click={onClickLink}>{link.label}</a>
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
        color: #313131;
    }

    .site-menu a:not(:first-child) {
        margin-left: 20px;
    }

    .site-menu-links {
        background: inherit;
    }
</style>