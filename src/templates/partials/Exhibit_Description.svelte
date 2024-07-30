<script>
    export let content = "";
</script>

<div class="exhibit-description">
    {@html content}
</div>

<style>
    .exhibit-description {
        height: 100%;
        padding: 50px 15px;
        font-size: 1.2em;
        line-height: 1.45em;
    }

    :global(.exhibit-description p) {
        margin-bottom: 1.9rem;
    }

    /* begin responsive breakpoints: small mobile devices/phones first ^ */
    @media screen and (min-width: 480px) {
        .exhibit-description {
            padding: 50px 25px;
            font-size: 1.0em;
        }
    }

    @media screen and (min-width: 768px) {
        .exhibit-description {
            padding: 50px 50px;
        }
    }

    @media screen and (min-width: 992px) {
        .exhibit-description {
            font-size: 1.1em;
            padding: 50px 75px;
        }
    }

    @media screen and (min-width: 1280px) {
        .exhibit-description {
            font-size: 1.2em;
            padding: 50px 115px;
        }
    }
</style>