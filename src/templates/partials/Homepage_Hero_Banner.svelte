<script>
    import Search_Box from '../../components/Search_Box.svelte';

    export let data = {};

    let {
        endpoint,
        queryParam,
        params,
        fields,
        buttonText,
        placeholder

    } = data;
</script>

<div class="homepage-hero-banner">
    <div class="container">
        <div class="content">
            <h1>Online Exhibits</h1>

            <div class="search-form">
                <Search_Box {endpoint} {queryParam} {params} {fields} {buttonText} {placeholder} />
            </div>
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
        color: white;
        font-family: "Libre Baskerville";
        letter-spacing: 0.055em;
        font-size: xx-large;
    }

    .search-form {
        width: 300px;
    }

    @media screen and (min-width: 768px) {
        .content {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    }

    @media screen and (min-width: 992px) {
        .search-form {
            width: 400px;
        }
    }
</style>