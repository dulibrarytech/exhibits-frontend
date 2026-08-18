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

    const onClickToggleButton = (event) => {
        let button = event.target.parentElement;

        if(button.getAttribute('aria-expanded') == "false") {
            button.setAttribute('title', 'Expand navigation menu');
            button.setAttribute('aria-label', 'Expand navigation menu');
        }
        else {
            button.setAttribute('title', 'Collapse navigation menu');
            button.setAttribute('aria-label', 'Collapse navigation menu');
        }
    }

    const setTheme = (styles) => {
        Object.assign(_navigationElement.style, styles);
    }

    onMount(async () => {
        if(styles && Object.keys(styles).length > 0) setTheme(styles);
    });
</script>

<nav class="exhibit-navigation navbar navbar-expand-lg navbar-light" id="mainNav" bind:this={_navigationElement}>
    <div class="container-large outer-container">
        <button 
            class="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarResponsive" 
            aria-controls="navbarResponsive" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
            on:click|preventDefault={onClickToggleButton}>

            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse show" id="navbarResponsive">
            <ul class="nav nav-link navbar-nav ms-auto">
                {#if _sectionHeadings}
                    {#each _sectionHeadings as {uuid, text, subheadings = null}, index}
                        <li class="px-1">
                            <a href class="main-menu-link" data-anchor={uuid} on:click|preventDefault={onClickNavigationLink}>{text}</a>

                            {#if subheadings.length > 0}
                                <ul class="dropdown-nav">
                                    {#each subheadings as {uuid, text}, index}
                                        <li>
                                            <a href class="dropdown-link" data-anchor={uuid} on:click|preventDefault={onClickNavigationLink}>{text}</a>
                                        </li>
                                    {/each}
                                </ul>
                            {/if}
                        </li>
                    {/each}
                {/if}
            </ul>
        </div>
    </div>
</nav>

<style>
    /* default styles */
    .exhibit-navigation {
        background-color: unset;
        color: inherit;
        font-family: var(--theme-site-navigation-font-family);
        font-size: var(--theme-site-navigation-font-size);
    }

    ul.nav {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    .nav-link {
        color: inherit;
    }
    
    .exhibit-navigation > div, .collapse, ul.nav, ul.nav > li, .dropdown-nav {
        background-color: inherit;
    }

    .navbar {
        min-height: 4.2em;
        border-bottom-style: solid;
        border-width: 1px;
        border-color: #c5c3c1;
        background-color: #ffffff;
        padding-top: 0;
        padding-bottom: 0;
    }

    .navbar .container-large {
        display: flex;
        flex-wrap: inherit;
        align-items: center;
        justify-content: space-between;
    }

    .navbar .outer-container {
        padding: 1em;
    }

    .navbar-expand-lg .navbar-nav {
        row-gap: 9px;
        column-gap: 31px;
    }

    .navbar-expand-lg .navbar-toggler {
        display: block;
    }

    button.navbar-toggler {
        margin: 0 1.5em 0 0;
        border-width: 2px;
    }

    button.navbar-toggler:focus {
        box-shadow: none;
        outline: auto;
    }

    ul.navbar-nav {
        width: 100%;
        margin-top: 1em;
    }

    ul.navbar-nav a {
        height: 100%;
        margin-bottom: 0;
        width: 100%;
        color: inherit;
    }

    :global(ul.navbar-nav a.main-menu-link.active) {
        text-decoration: underline;
    }

    ul.navbar-nav a.dropdown-link {
        padding: 8px 0;
    }

    .dropdown-nav {
        position: absolute;
        padding: 15px;
        display: none;
        min-width: 160px;
        box-shadow: 0px 8px 8px -1px rgba(80, 80, 80, 0.2);
        z-index: 1;
    }

    .dropdown-nav li {
        list-style-type: none;
        border-bottom-style: solid;
        border-bottom-color: gray;
        border-bottom-width: 1px;
    }

    a.dropdown-link {
        display: block;
    }

    .navbar-nav > li:hover .dropdown-nav {
        display: block;
    }

    .collapse {
        flex-basis: 100%;
        flex-grow: 1;
    }

    .navbar-light .navbar-toggler.collapsed .navbar-toggler-icon {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
    }

    .navbar-light .navbar-toggler .navbar-toggler-icon  {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath stroke='rgba%280, 0, 0, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='0.5' fill='rgb(96,96,96)' d='M4.795 3.912l-.883.883.147.146L7.117 8 4.06 11.059l-.147.146.883.883.146-.147L8 8.883l3.059 3.058.146.147.883-.883-.147-.146L8.883 8l3.058-3.059.147-.146-.883-.883-.146.147L8 7.117 4.941 4.06z'/%3e%3c/svg%3e");
    }

    @media (min-width: 992px) {
        .navbar-expand-lg .navbar-toggler {
            display: none;
        }

        .navbar {
            min-height: unset;
        }

        ul.navbar-nav {
            margin-top: 0;
        }
    }
</style>
