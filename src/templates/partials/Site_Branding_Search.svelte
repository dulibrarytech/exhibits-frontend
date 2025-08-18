<svelte:head>
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
</svelte:head>

<script>
    import { Settings } from '../../config/settings.js';
    import Search_Box from '../../components/Search_Box.svelte';

    export let args = {};

    let _searchFields = Object.keys(Settings.searchFieldsExhibitItem);
</script>

<div class="site-branding-banner">
    <div class="container d-flex flex-column flex-md-row align-items-left py-2 site-branding">

        <div class="d-flex align-items-center site-title-link">
            <a href="/" class="me-3 py-2">
                <p>Exhibits <span class="highlight-text">@ DU</span></p>
            </a>
        </div>
    
        <div class="d-inline-flex mt-2 mt-md-0 ms-md-auto search-form">
            <Search_Box endpoint="/search" fields={_searchFields} placeholder="Search exhibits"/>
        </div>
        
    </div>
</div>

<style>
    .site-branding-banner {
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: #e5e3e1;
    }
    
    .site-branding {
        height: 100px;
        width: 100%;
        display: table;
    }

    .site-title-link {
        display: table-cell;
        vertical-align: middle;
        position: relative;
        left: -2px;
    }

    .site-title-link a {
        width: fit-content;
        font-size: 18px;
        font-family: "Montserrat";
        display: block;
        color: #333333;
        text-decoration: none;
    }

    .site-title-link p {
        font-size: 33px;
        text-transform: uppercase;
        margin-top: 0;
        margin-bottom: 0;
    }

    .highlight-text {
        color: #BA0C2F;
        border-color: #BA0C2F;
    }

    .search-form {
        width: unset;
    }

    @media screen and (min-width: 992px) {
        .search-form {
            width: 400px;
        }
    }
</style>