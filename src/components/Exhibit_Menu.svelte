<script>
    import { createEventDispatcher } from 'svelte';
    import Search_Box from './Search_Box.svelte';
    
    export let exhibitId = null;
    
    const dispatch = createEventDispatcher();
    
    const onClickLink = (event) => {
        dispatch('click-menu-link', {pageId: event.target.getAttribute('data-page-id') || null})
    }
    
    </script>
    
    <div class="exhibit-menu box-shadow-bottom">

        <div class="container">

            <div class="d-flex flex-column flex-md-row align-items-center py-2">
                <nav class="d-flex align-items-center text-dark text-decoration-none">
                    <!-- <a href="/exhibits" class="me-3 py-2 text-dark text-decoration-none">Home</a> -->
                    <a href class="me-3 py-2 text-dark text-decoration-none" data-page-id="about-the-curators" on:click|preventDefault={onClickLink} >About the Curators</a>
                    <a href class="me-3 py-2 text-dark text-decoration-none" data-page-id="download-exhibit" on:click|preventDefault={onClickLink} >Download Exhibit</a>
                </nav>
            
                <div class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                    <Search_Box endpoint="/search" fields={['title', 'description']} placeholder="Search in this exhibit" params={{exhibitId}}/>
                </div>
            </div>
        </div>

    </div>
    
    <style>
        .container {
            padding: 0;
        }

        .exhibit-menu {
            background: #e5e3e1;
        }
    </style>