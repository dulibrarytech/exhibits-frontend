<script>
    import Copyright_Banner from '../../templates/partials/Copyright_Banner.svelte';
</script>

<footer>
    <div class="container">
        <div class="footer-content row">

            <div class="col-lg-3 col-md-4 col-sm-12 logo-container">
                <div class="logo">
                    <a href="https://library.du.edu" title="Link to university libraries website" target="_blank"><img src="/assets/images/du-univ-libraries.png" alt="University of Denver University Libraries logo" /></a>
                </div>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-12">
                <div class="text address">
                    <p>University Libraries</p>
                    <p>Anderson Academic Commons</p>
                    <p>2150 East Evans Avenue</p>
                    <p>Denver, CO 80208</p>
                </div>
                
            </div>

            <div class="col-lg-3 col-md-3 col-sm-12">
                <p>Explore More:</p>
                <div class="links">
                    <a href="https://specialcollections.du.edu" target="_blank">Digital Collections</a>
                    <a href="https://duarchives.coalliance.org/" target="_blank">Archives Finding Aids</a>
                </div>
            </div>

            <div class="col-lg-3 col-md-2 col-sm-12">
                <div class="links">
                    <a href="https://library.du.edu/collections-library-materials/exhibits" title="Link to About Us" target="_blank">About Us</a>
                    <a href="mailto:Madison.Sussmann@du.edu" title="Link to Contact Us">Contact</a>
                </div>
            </div>

        </div>
    </div>

    <Copyright_Banner />
</footer>

<style>
    footer {
        background-color: #375060;
        font-size: 0.8em;
    }

    footer > .container {
        height: 100%;
        padding: 25px;
    }

    .footer-content {
        height: 100%;
        padding: 2em 0;
        color: white;
    }

    .footer-content > div {
        margin-bottom: 50px;
    }

    .text.address p {
        margin: 0;
    }

    .logo-container {
        display: table;
    }

    .logo {
        display: table-cell;
        vertical-align: middle;
    }

    .logo img {
        width: 90%;
    }

    .links > a {
        display: block;
        color: white;
    }

    @media screen and (min-width: 768px) {
        .footer-content > div {
            margin-bottom: 0;
        }

        /* .logo img {
            width: 85%;
        } */
    }

    @media screen and (min-width: 768px) and (max-width: 992px) {
        .container, .container-md, .container-sm {
            max-width: 925px;
        }
    }

    @media screen and (min-width: 992px) {
        /* .logo img {
            width: 60%;
        } */
    }
</style>
