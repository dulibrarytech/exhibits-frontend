<script>
import { createEventDispatcher } from 'svelte';

export let exhibit = null;

const dispatch = createEventDispatcher();

const onClickLink = (event) => {
    dispatch('click-menu-link', {pageId: event.target.getAttribute('data-page-id') || null})
}

</script>

<div class="exhibit-menu">
    <div class="exhibit-menu-links">
        <a href data-page-id="about-the-curators" on:click|preventDefault={onClickLink} >About the Curators</a>
        <a href data-page-id="download-exhibit" on:click|preventDefault={onClickLink} >Download Exhibit</a>
    </div>
</div>

<style>
    .exhibit-menu {
        background: white;
        font-size: 16px;
    }
    .exhibit-menu-links {
        height: 30px;
        position: relative;
        top: 3px;
        left: 12px;
    }

    .exhibit-menu-links > a {
        color: black;
    }

    .exhibit-menu-links > a:not(:first-child) {
        margin-left: 15px;
    }
</style>