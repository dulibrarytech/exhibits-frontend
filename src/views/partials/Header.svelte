<script>
    import { Settings } from '../../config/settings.js';
    import Search_Box from '../../components/Search_Box.svelte';

    let searchFields = Object.keys(Settings.searchFields);
</script>

<header class="du-header w-100 header-logo-wrapper shadow-bottom">
<!-- <header class="du-header w-100 header-logo-wrapper border-bottom"> -->
    <span class="header-logo">
        <a href="https://library.du.edu" title="University Libraries" target="_blank" aria-label="university of denver libraries home page">
            <img src="../assets/images/du-libraries-logo.png" alt="University of Denver Logo" />
        </a>
    </span>

    <span class="site-link">
        <a href="/exhibits" title="Exhibits Home Page" aria-label="return to exhibits home page">Exhibits @ DU</a>
    </span>

    <!-- <div class="exhibits-search">
        <Search_Box endpoint="/search" fields={searchFields} placeholder="Search exhibits"/>
    </div> -->
</header>

<style>
    .du-header {
        height: 52px;
        background: #FFFFFF;
        font-family: BreveSans, sans-serif;
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

    .du-header .header-logo {
        position: relative;
        left: 0;
        top: 0;
    }

    .du-header .site-link {
        position: relative;
        left: 40px;
        top: calc(50% - 23px);
    }

    .du-header .site-link a {
        color: #18171e;
        font-weight: bold;
    }

    .du-header .site-link a:hover {
        text-decoration: none;
    }
</style>
