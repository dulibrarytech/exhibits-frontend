<svelte:head>
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
</svelte:head>

<script>
    
</script>

<div class="site-branding-banner">
    <div class="site-branding container">
        <div class="branding-text">
            <a class="site-title" href="/">
                <p>Exhibits <span class="highlight-text">@ DU</span></p>
            </a>
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

    .branding-text {
        display: table-cell;
        vertical-align: middle;
    }

    a.site-title {
        font-size: 18px;
        font-family: "Montserrat";
        display: block;
        color: #333333;
        text-decoration: none;
    }

    .site-title p {
        font-size: 33px;
        text-transform: uppercase;
        margin-top: 0;
        margin-bottom: 0;
    }

    .highlight-text {
        color: #8b2332;
        border-color: #8b2332;
    }
</style>