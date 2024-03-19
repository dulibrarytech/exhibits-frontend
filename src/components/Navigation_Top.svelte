<script>
    'use strict'

    import { onMount } from 'svelte';

    export let sections = null;
    export let styles = null;

    let sectionHeadings = null;
    let navigationElement;

    $: init();

    const init = () => {
        sectionHeadings = sections;
    }

    const truncateHeadingText = (sections) => {
        let headings = [];
        for(let {id, text} of sections) {
            if(text.length > 30) {
                text = text.substring(0, 30).concat('...');
            }
            headings.push({
                text,
                id
            })
        }
        return headings;
    }

    const onClickNavigationLink = (event) => {
		let link = event.currentTarget;
        let anchorId = link.getAttribute('data-anchor') || null;
        if(anchorId) clickNavigationLink(anchorId);
        else console.log("Invalid anchor id:", event.currentTarget);
	}

    const clickNavigationLink = (anchorId) => {
        let anchor = document.getElementById(anchorId);
		window.scrollTo({
			top: anchor.offsetTop,
			behavior: 'smooth'
		});
    }

    const setTheme = (styles) => {
        let menuStyles = styles.menu || {};
        Object.assign(navigationElement.style, menuStyles);
    }

    onMount(async () => {
        if(styles) setTheme(styles);

        let hash = location.hash?.replace('#', '') || false;
        if(hash) {
            setTimeout(() => {
                clickNavigationLink(hash)
            }, 1000)
        }
    });
</script>

<nav class="exhibit-navigation navbar navbar-expand-lg navbar-light sticky-top" id="mainNav" bind:this={navigationElement}>
    <div class="container outer-container">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarResponsive">

            <ul class="nav nav-link navbar-nav ms-auto">
                {#if sectionHeadings}
                    {#each sectionHeadings as {id, text, subheadings = null}}
                        <li class="px-1" title={text}>
                            <!-- <a class="main-menu-link" href="#{id}" on:click|preventDefault={onClickNavigationLink}>{text}</a> -->
                            <a class="main-menu-link" href data-anchor={id} on:click|preventDefault={onClickNavigationLink}>{text}</a>
                        

                            {#if subheadings.length > 0}

                                <ul class="dropdown-nav">
                                    {#each subheadings as {id, text}}
                                        <!-- <li><a class="dropdown-link" href="#{id}" on:click|preventDefault={onClickNavigationLink}>{text}</a></li> -->
                                        <li><a class="dropdown-link" href data-anchor={id} on:click|preventDefault={onClickNavigationLink}>{text}</a></li>
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
    .nav-link, .nav-link a {
        color: inherit;
    }
    
    .exhibit-navigation > div, .navbar-collapse, ul.nav, ul.nav > li, .dropdown-nav {
        background-color: inherit;
    }

    .navbar {
        background: #e5e3e1;
        min-height: 4.2em;
        border-bottom-style: solid;
        border-width: 1px;
        border-color: #c5c3c1;
    }

    .navbar > .container {
        max-width: 100%;
    }

    .navbar-expand-lg .navbar-nav {
        gap: 15px;
    }

    button.navbar-toggler {
        margin: 0;
    }

    button.navbar-toggler:focus {
        box-shadow: none;
    }

    .navbar-nav {
        width: 100%;
        margin-top: 5px;
    }

    .navbar-nav a {
        /* color: #505050; */
        padding: 8px 26px;
        font-size: 1.2em;
        font-weight: bold;
    }

    .navbar-nav li {
        padding-left: 0rem !important;
        margin-bottom: 5px;
    }

    .navbar-nav li:not(:last-child) {
        margin-right: 5px;
    }

    .navbar-nav a {
        text-decoration: none;
    }

    .navbar-nav a:hover {
        text-decoration: underline;
    }

    .dropdown-nav {
        position: absolute;
        padding: 15px;
        display: none;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    .dropdown-nav li {
        list-style-type: none;
        border-bottom-style: solid;
        border-bottom-color: gray;
        border-bottom-width: 1px;
    }

    a.main-menu-link {
        display: block;
        background-image: linear-gradient(rgb(0 0 0/15%) 0 0);
        border-radius: 3px;
    }

    a.main-menu-link:hover {
        background-image: linear-gradient(rgb(0 0 0/25%) 0 0);
        text-decoration: none;
    }

    a.dropdown-link:hover {
        background-image: linear-gradient(rgb(0 0 0/15%) 0 0);
        text-decoration: none;
    }

    a.dropdown-link {
        display: block;
    }

    .navbar-nav > li:hover .dropdown-nav {
        display: block;
    }
</style>