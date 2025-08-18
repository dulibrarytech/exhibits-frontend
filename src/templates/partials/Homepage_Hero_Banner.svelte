<script>

</script>

<div class="homepage-hero-banner">
    <div class="container">
        <div class="content">
            <h1>Online Exhibits</h1>
        </div>
    </div>
</div>

<style>
    .homepage-hero-banner {
        height: 177px;
        background-image: url("/assets/images/homepage-banner.png");
        background-size: cover;
        filter: brightness(95%);
    }

    .homepage-hero-banner > .container {
        height: 100%;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: left;
        height: 100%;
        row-gap: 25px;
    }

    .content > h1 {
        margin-bottom: 0;
        color: white;
        font-family: "Libre Baskerville";
        letter-spacing: 0.04em;
        font-size: 40px;
        font-weight: bold;
        text-shadow: 0px 2px 4px #4a4a4a;
    }

    :global(.homepage-hero-banner .search-box input),
    :global(.homepage-hero-banner .search-box button) {
        height: 100%;
    }

    :global(.homepage-hero-banner .input-group) {
        height: 100%;
    }

    @media screen and (min-width: 768px) {
        .content {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>