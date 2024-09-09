<script>
    export let content = "";
</script>

<div class="exhibit-description">
    {@html content}
</div>

<style>
    .exhibit-description {
        height: 100%;
        font-size: 1.0em;
        line-height: 1.45em;
        padding: 1.5em 1.5em;
    }

    :global(.exhibit-description p) {
        margin-bottom: 1.9rem;
    }

    :global(.exhibit-description p:last-child) {
        margin-bottom: 0;
    }

    /* begin responsive breakpoints: small mobile devices/phones first ^ */
    @media screen and (min-width: 480px) {
        .exhibit-description {
            font-size: 1.0em;
            padding: 2.5em 3.5em;
        }
    }

    @media screen and (min-width: 768px) {
        .exhibit-description {
            font-size: 1.1em;
            padding: 3.5em 4.5em;
        }
    }

    @media screen and (min-width: 992px) {
        .exhibit-description {
            font-size: 1.15em;
            padding: 3.5em 5.5em;
        }
    }

    @media screen and (min-width: 1280px) {
        .exhibit-description {
            font-size: 1.2em;
            padding: 3.5em 6.5em;
        }
    }
</style>