<script>
    export let mediaPadding = true;
    export let mediaWidth = "50";
    export let caption = null;
</script>

<div class="media-bottoms layout {mediaPadding ? 'container media-padding' : ''}">

    <div class="content">
        {#if mediaPadding}<div class="title-heading"><slot name="title" /></div>{/if}

        <div class="text {mediaPadding ? '' : 'container-wide'}">
            {#if !mediaPadding}<div class="title-heading"><slot name="title" /></div>{/if}
            <slot name="text-display" />
        </div>

        <div class="media width-{mediaWidth}">
            <slot name="media-display" />
            {#if caption}<div class="{mediaPadding ? '' : ''} caption">{caption}</div>{/if}
        </div>
    </div>

</div>

<style>
    .container-wide {
        /* extends .container Bootstrap v5.1.3 */
        width: 100%;
        padding-right: var(--bs-gutter-x,.75rem);
        padding-left: var(--bs-gutter-x,.75rem);
        margin-right: auto;
        margin-left: auto;
    }

    .text {
        margin-bottom: 3.65rem;
    }

    .layout.media-padding .caption {
        margin-left: 0.75rem;
    }

    .layout:not(.media-padding) .caption {
        margin-left: 3.5vw;
        padding-left: 0.75rem;
    }

    @media screen and (min-width: 576px) {
        .container-wide {
            max-width: 640px;
        }
    }

    @media screen and (min-width: 768px) {
        .container-wide {
            max-width: 93vw;
        }
    }

    @media screen and (min-width: 992px) {
        .container-wide {
            max-width: 93vw;
        }
    }

    @media screen and (min-width: 1200px) {
        .container-wide {
            max-width: 93vw;
        }
    }

    @media screen and (min-width: 1400px) {
        .container-wide {
            max-width: 93vw;
        }
    }
</style>