<!-- Requires bootstrap 5x -->
<script>
    'use strict'

    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    import * as Logger from '../libs/logger.js';

    export let sections = null;
    export let styles = null;

    let sectionHeadings = null;
    let navigationElement;

    const dispatch = createEventDispatcher();

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
        
        if(anchorId) dispatch('click-nav-link', {anchorId});
        else Logger.module().info("Invalid or missing 'data-anchor' property:", event.currentTarget);
	}

    const setTheme = (styles) => {
        let menuStyles = styles || {};
        Object.assign(navigationElement.style, menuStyles)
    }

    onMount(async () => {
        if(styles) setTheme(styles);
    });
</script>

<div id="sidebar-nav" class="nav-link list-group border-0 rounded-0 text-sm-start" bind:this={navigationElement}>
    {#if sections}
        {#each sectionHeadings as {uuid, text, subheadings = null}}
            <div class="menuitem">
                <!-- <a class="main-menu-link" href data-anchor={uuid} on:click|preventDefault={onClickNavigationLink}>{text}</a> -->
                <button class="main-menu-link" href data-anchor={uuid} on:click|preventDefault={onClickNavigationLink}>{text}</button>

                {#if subheadings.length > 0}

                    <ul class="dropdown-nav">
                        {#each subheadings as {uuid, text}}
                            <li>
                                <!-- <a class="dropdown-link" href data-anchor={uuid} on:click|preventDefault={onClickNavigationLink}>{text}</a> -->
                                <button class="dropdown-link" href data-anchor={uuid} on:click|preventDefault={onClickNavigationLink}>{text}</button>
                            </li>
                        {/each}
                    </ul>
                
                {/if}

            </div>
        {/each}
    {/if}
</div>

<style>

    #sidebar-nav li {
        padding-left: 0rem !important;
        margin-bottom: 5px;
    }

    #sidebar-nav li:not(:last-child) {
        margin-right: 5px;
    }

    #sidebar-nav button {
        font-weight: bold;
        font-size: 18px;

        padding: 8px 26px;
        text-decoration: none;
        background-color: inherit;
        height: 100%;
        width: 100%;
        text-align: left;

        border-width: 2px;
        border-top-color: transparent;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
    }

    #sidebar-nav button:focus {
        border-top-color: #252525;
        border-bottom-color: #252525;
        border-left-color: #252525;
        border-right-color: #252525;
    }

    #sidebar-nav button:hover {
        text-decoration: underline;
    }

    .dropdown-nav {
        padding: 15px;
        display: none;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        background-color: inherit;
    }

    .dropdown-nav li {
        background-color: inherit;
        list-style-type: none;
        border-bottom-style: solid;
        border-bottom-color: gray;
        border-bottom-width: 1px;
    }

    button.main-menu-link {
        display: block;
        background-image: linear-gradient(rgb(0 0 0/15%) 0 0);
        border-radius: 3px;
        margin-bottom: 7px;
    }

    button.main-menu-link:hover {
        background-image: linear-gradient(rgb(0 0 0/25%) 0 0);
        text-decoration: none;
    }

    button.dropdown-link:hover {
        background-image: linear-gradient(rgb(0 0 0/15%) 0 0);
        text-decoration: none;
    }

    button.dropdown-link {
        display: block;
    }

    #sidebar-nav >div:hover .dropdown-nav {
        display: block;
    }

    #sidebar-nav >div:focus-within .dropdown-nav {
        display: block;
    }

    #sidebar-nav .menuitem {
        background-color: inherit;
    }
</style>