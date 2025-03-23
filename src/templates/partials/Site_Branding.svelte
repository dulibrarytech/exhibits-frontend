<svelte:head>
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
</svelte:head>

<script>
    'use strict'
</script>

<div class="site-branding">
    <div class="branding-text">
        <a class="site-title" href="/">University Libraries
            <h1>Exhibits <span class="highlight-text">@ DU</span></h1>
        </a>
    </div>
</div>

<style>
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
        position: relative;
        left: 30px;
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