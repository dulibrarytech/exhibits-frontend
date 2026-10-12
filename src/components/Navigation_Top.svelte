<script>
    'use strict'

    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    import * as Logger from '../libs/logger.js';

    export let sections = null;
    export let styles = null;

    let _sectionHeadings = null;
    let _navigationElement;

    const dispatch = createEventDispatcher();

    $: init();

    const init = () => {
        _sectionHeadings = sections;
    }

    const onClickNavigationLink = (event) => {
        let link = event.currentTarget;
        let anchorId = link.getAttribute('data-anchor') || null;
        if(anchorId) dispatch('click-nav-link', {anchorId});
        else Logger.module().info("Invalid or missing 'data-anchor' property:", event.currentTarget);
	}

    const setTheme = (styles) => {
      const {
        fontFamily = '',
        color = '', 
        backgroundColor = '',
      } = styles;

      Object.assign(_navigationElement.style, {fontFamily, color, backgroundColor});
    }

    onMount(async () => {
      if(styles && Object.keys(styles).length > 0) setTheme(styles);
    });
</script>

<nav class="exhibit-navigation navbar navbar-expand-lg navbar-light" bind:this={_navigationElement}>
   <div class="container-large outer-container">
    
    <!-- mobile menu toggle -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- main menu section -->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        {#if _sectionHeadings}

            <ul class="nav nav-link navbar-nav me-auto mb-2 mb-lg-0">
                {#each _sectionHeadings as {uuid, text, subheadings = null}, index}

                    {#if subheadings.length > 0}
                        <!-- add sub -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href id="navbarDropdown-{index}" role="button" data-bs-toggle="dropdown" aria-expanded="false">{text}</a>

                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown-{index}">
                                {#each subheadings as {uuid, text}, index}
                                    <li>
                                        <a href class="dropdown-item" data-anchor={uuid} on:click|preventDefault={onClickNavigationLink}>{text}</a>
                                    </li>

                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                {/each}
                            </ul>
                        </li>

                    {:else}
                        <!-- no sub -->
                        <li class="nav-item">
                            <a href class="nav-link" data-anchor={uuid} on:click|preventDefault={onClickNavigationLink}>{text}</a>
                        </li>
                    {/if}

                {/each}
            </ul>

        {/if}
    </div>
    <!-- END main menu section -->

  </div>
</nav>

<style>
    .container-large {
        @media screen and (max-width: 900px) {
            max-width: calc(100vw - 70px);
        }
    }

    .exhibit-navigation {
        background-color: var(--theme-site-navigation-background-color);
        color: var(--theme-site-navigation-font-color);
        font-family: var(--theme-site-navigation-font-family);
        font-size: var(--theme-site-navigation-font-size);
    }

    button.navbar-toggler {
        margin: 0.5em 0;
    }

    a, a:visited, .nav-link, .nav-link:visited, .nav-link:hover, .nav-link:focus {
        color: inherit;
    }

    a.nav-link {
        position: relative;
    }

    a.nav-link:focus, a.nav-link:focus-visible {
        z-index: 1;
    }

    a.nav-link:hover + .dropdown-menu,
    .dropdown-menu:hover {
        display: block;
    }

    .dropdown-menu a {
        color: inherit;
    }

    button.navbar-toggler {
        border-width: 2px;
    }

    div.outer-container, div.collapse, ul.nav, li.nav-item, ul.dropdown-menu {
        background-color: inherit;
        color: inherit;
        font-family: inherit;
    }

    .dropdown-item:focus, .dropdown-item:hover {
        background-color: unset;
    }

    @media (min-width: 992px) {
        .navbar-expand-lg .navbar-nav {
            flex-direction: row;
            column-gap: 1.2vw;
            row-gap: 11px;
        }
    }
</style>