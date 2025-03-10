<script>
    import Search_Box from '../../components/Search_Box.svelte';
    import { Settings } from '../../config/settings.js';

    let searchFields = Object.keys(Settings.searchFields);
</script>

<header class="du-header">
    <nav class="navbar navbar-expand-md fixed-top border-bottom" style="background-color: white">
        <div class="container-fluid">

            <div class="header-items">
                <a class="navbar-brand header-logo" href="https://library.du.edu" title="University Libraries" target="_blank" aria-label="university of denver libraries home page">
                    <img src="../assets/images/du-libraries-logo.png" alt="University of Denver Logo" />
                </a>
    
                <!-- Exhibits app link -->
                <!-- <div class="header-links">
                    <a class="nav-link" href="/exhibits" title="Exhibits Home Page" aria-label="return to exhibits home page">{Settings.appTitle}</a>
                </div> -->
            </div>

            <div id="header-search-box" class="exhibits-search-wrapper">
                <div class="exhibits-search">
                    <Search_Box endpoint="/search" fields={searchFields} placeholder="Search exhibits"/>
                </div>
            </div>
            
        </div>
    </nav>
</header>

<style>
    .du-header {
        background: #FFFFFF;
        font-family: "BreveSans", sans-serif;
    }

    .du-header a {
        color: #18171e;
        font-weight: bold;
    }

    .du-header a:hover {
        text-decoration: none;
    }

    .exhibits-search-wrapper {
        width: 400px;
    }

    .border-bottom {
        border-bottom: 2px solid #dee2e6 !important;
    }

    .header-logo img {
        height: 50px;
    }

    .site-link a {
        position: relative;
        top: 6px;
        left: 11px;
    }

    .header-items {
        display: inline-flex;
        position: relative;
        left: 0;
        top: 0;
    }

    .header-links {
        position: relative;
        top: 11px;
    }
</style>
