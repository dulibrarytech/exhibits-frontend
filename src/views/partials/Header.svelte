<script>
    import { Settings } from '../../config/settings.js';
    import Search_Box from '../../components/Search_Box.svelte';

    let searchFields = Object.keys(Settings.searchFields);
</script>

<header class="du-header">
    <nav class="navbar navbar-expand-md fixed-top border-bottom" style="background-color: white">
        <div class="container-fluid">

            <div class="header-menu">
                <a class="navbar-brand header-logo" href="https://library.du.edu" title="University Libraries" target="_blank" aria-label="university of denver libraries home page">
                    <img src="../assets/images/du-libraries-logo.png" alt="University of Denver Logo" />
                </a>

                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active site-link">
                      <a class="nav-link" href="/exhibits" title="Exhibits Home Page" aria-label="return to exhibits home page">{Settings.appTitle}</a>
                    </li>
                </ul>
            </div>
    
            <div class="exhibits-search">
                <Search_Box endpoint="/search" fields={searchFields} placeholder="Search exhibits"/>
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

    .shadow-bottom:after {
        position: absolute;
        width: 100%;
        display: block;
        height: 3.0rem;
        content: "";
        background: linear-gradient(to bottom, #b5b7ba 0%, rgba(181, 183, 186, 0) 32%);
        pointer-events: none;
        transition: height 0.5sease;
    }

    .border-bottom {
        border-bottom: 2px solid #dee2e6 !important;
    }

    .header-logo img {
        height: 50px;
    }

    .site-link a {
        position: relative;
        top: 11px;
    }

    .header-menu {
        display: inline-flex;
        position: relative;
        left: 0;
        top: 0;
    }
</style>
