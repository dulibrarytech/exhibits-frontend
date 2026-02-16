<svelte:head>
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
</svelte:head>

<script>
    export let args = {};
</script>

<div class="site-branding-banner">
    <div class="site-branding container">
        <div class="site-title-link">
            <a href="/">
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
        min-height: 100px;
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
</style>