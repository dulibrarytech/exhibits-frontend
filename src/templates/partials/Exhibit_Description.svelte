<script>
    export let content = "";
</script>

<div class="exhibit-description container">
    {@html content}
</div>

<style>
    .exhibit-description {
        height: 100%;
        padding: 50px 0;
        font-size: 1.2em;
        line-height: 1.45em;
    }

    :global(.exhibit-description p) {
        margin-bottom: 1.9rem;
    }

    /* begin responsive breakpoints: small mobile devices/phones first ^ */
    @media screen and (min-width: 480px) {
        .exhibit-description {
            font-size: 1.0em;
        }
    }

    @media screen and (min-width: 768px) {

    }

    @media screen and (min-width: 992px) {
        .exhibit-description {
            font-size: 1.1em;
        }
    }

    @media screen and (min-width: 1280px) {
        .exhibit-description {
            font-size: 1.2em;
        }
    }
</style>