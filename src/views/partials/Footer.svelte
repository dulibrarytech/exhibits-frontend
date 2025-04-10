<footer>
    <div class="container">
        <div class="footer-content row">

            <div class="col-lg-5 col-md-4 col-sm-12 logo-container">
                <div class="logo">
                    <img src="../assets/images/du-logo3.png" alt="University of Denver University Libraries logo" />
                </div>
            </div>

            <div class="col-lg-4 col-md-4 col-sm-12">
                <div class="text address">
                    <p>University Libraries</p>
                    <p>Anderson Academic Commons</p>
                    <p>2150 East Evans Avenue</p>
                    <p>Denver, CO 80208</p>
                </div>
                
            </div>

            <div class="col-lg-3 col-md-4 col-sm-12">
                <div class="links">
                    <a href="https://library.du.edu/collections-library-materials/exhibits" title="Link to About Us">About Us</a>
                    <a href="mailto:Madison.Sussmann@du.edu" title="Link to Contact Us">Contact</a>
                    <a href="#" title="Link to Report a Problem">Report a Problem</a>
                </div>
            </div>

        </div>
    </div>
</footer>

<style>
    footer {
        background-color: #7C0A02;
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
        width: 70%;
    }

    .links > a {
        display: block;
        color: white;
    }

    @media screen and (min-width: 768px) {
        .footer-content > div {
            margin-bottom: 0;
        }

        .logo img {
            width: 85%;
        }
    }

    @media screen and (min-width: 768px) and (max-width: 992px) {
        .container, .container-md, .container-sm {
            max-width: 925px;
        }
    }

    @media screen and (min-width: 992px) {
        .logo img {
            width: 70%;
        }
    }
</style>
