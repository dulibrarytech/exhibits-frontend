<svelte:head>
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
</svelte:head>

<script>
    
</script>

<div class="site-branding-section">
    <div class="site-branding container">
        <div class="branding-text">
            <a class="site-title" href="/">University Libraries
                <h1>Exhibits <span class="highlight-text">@ DU</span></h1>
            </a>
        </div>
    </div>
</div>

<style>
    .site-branding-section {
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: #e5e3e1;
    }

    .site-branding {
        height: 100px;
        width: 100%;
        display: table;
        padding: 0;
    }

    .branding-text {
        display: table-cell;
        vertical-align: middle;
        /* padding: 0 30px; */
    }

    a.site-title {
        font-size: 18px;
        font-family: "Montserrat";
        display: block;
        color: #333333;
        text-decoration: none;
    }

    .site-title h1 {
        font-size: 27px;
        text-transform: uppercase;
    }

    .highlight-text {
        color: #8b2332;
        border-color: #8b2332;
    }
</style>