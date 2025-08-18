<script>
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    
    const onClickLink = (event) => {
        dispatch('click-menu-link', {pageId: event.target.getAttribute('data-page-id') || null})
    }
    
</script>

<div class="exhibit-menu box-shadow-bottom">

    <div class="container">
        <div class="d-flex flex-column flex-md-row align-items-left py-2">
            <nav class="d-flex align-items-center text-dark text-decoration-underline">
                <a href class="me-3 py-2 text-dark text-decoration-underline" data-page-id="about-the-curators" on:click|preventDefault={onClickLink} >About the Curators</a>
                <!-- <a href class="me-3 py-2 text-dark text-decoration-underline" data-page-id="download-exhibit" on:click|preventDefault={onClickLink} >Download Exhibit</a> -->
            </nav>
        </div>
    </div>

</div>

<style>
    .exhibit-menu {
        background: #e5e3e1;
    }

    :global(.search-box) {
        margin-bottom: 10px;
    }

    @media screen and (min-width: 768px) {
        :global(.search-box) {
            margin-bottom: initial;
        }
    }
</style>