<script>
    import Site_Menu from '../../components/Site_Menu.svelte';
</script>

<header class="du-header">
    <div class="d-flex flex-column flex-md-row align-items-center p-3 border-bottom box-shadow-bottom">
        <a class="d-flex align-items-center text-dark text-decoration-none" href="https://library.du.edu" title="University Libraries" target="_blank" aria-label="university of denver libraries home page">
            <img class="header-branding" src="../assets/images/du-libraries-logo.png" alt="University of Denver Logo" />
        </a>

        <Site_Menu />
    </div>
</header>

<style>
    .border-bottom {
        border-bottom: 2px solid #dee2e6 !important;
    }

    .box-shadow-bottom {
        box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05);
    }

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

    .header-branding {
        height: 50px;
    }
</style>
