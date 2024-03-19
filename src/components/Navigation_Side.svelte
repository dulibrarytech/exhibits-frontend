<!-- Requires bootstrap 5x -->
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

    function onClickNavigationLink (event) {
		event.preventDefault()
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
        Object.assign(navigationElement.style, menuStyles)
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

<div id="sidebar-nav" class="nav-link list-group border-0 rounded-0 text-sm-start" bind:this={navigationElement}>
    {#if sections}
        {#each sections as {id, text}, index}
            <a href="#{id}" on:click={onClickNavigationLink}>{text}</a>
        {/each}
    {/if}
</div>

<style>
    #sidebar-nav a {
        font-weight: bold;
        font-size: 1.2em;
    }
</style>