<script>
    'use strict'

    import { onMount } from 'svelte';

    export let exhibit = {};

    let titleTextElement;

    let exhibitPath = null;
    let thumbnail = null;
    let title;
    let subtitle;
    let styles;

    $: {
        exhibitPath = `/exhibit/${exhibit.uuid}`;
        thumbnail = exhibit.thumbnail_image || "/notfound";
        title = exhibit.title || "";
        subtitle = exhibit.subtitle || "";
        styles = exhibit.styles.hero || {};
    }

    const setTheme = () => {
        let {image = {}} = styles;

        /* Set the title text color to match the color of the exhibit hero image text */
        if(image.color) {
            titleTextElement.style.color = image.color;
        }
    }

    onMount(async () => {
        setTheme(); 
    });
</script>

<div class="exhibit-preview">
    {#if exhibitPath}
        <a href="{exhibitPath}" bind:this={titleTextElement}>
            <div class="exhibit-thumbnail">
                <img src="{thumbnail}" alt={title} title="{title}"/>

                <!-- <div class="title">
                    {title}
                    {#if subtitle}<hr>{subtitle}{/if}
                </div> -->
            </div>
        </a>
    {/if}
</div>

<style>
    .exhibit-preview a {
        text-decoration: none;
        font-size: 1.4em;
    }

    .exhibit-preview a,
    .exhibit-preview a:visited {
        /* color: inherit; */
        color: white;
    }

    .exhibit-thumbnail {
        position: relative;
    }

    .exhibit-thumbnail > img {
        width: 100%;
        height: 100%;
        position: relative;
        border-radius: 5px;
    }

    .title {
        position: absolute;
        bottom: 0;
        z-index: 10;
        padding: 20px;
    }

    .title hr {
        height: 2px;
    }
</style>