<script>
    export let mediaPadding = true;
    export let mediaWidth = "50";
    export let caption = null;
</script>

<div class="media-only layout {mediaPadding ? 'media-padding' : ''}">

    <div class="content">
        <div class="media width-{mediaWidth}">
            <slot name="media-display" />
            {#if caption}<div class="{mediaPadding ? '' : ''} caption">{caption}</div>{/if}
        </div>
    </div>

</div>

<style>
    .title-heading:has(> div:empty) {
        display: none;
    }

    .media {
        margin: 0 auto;
    }

    .caption {
        margin-left: 0.75rem;
    }

    .layout:not(.media-padding) .media-100 .caption {
        margin-left: 3.5vw;
    }

    .width-25 {width: 100%}
    .width-33 {width: 100%}
    .width-34 {width: 100%}
    .width-50 {width: 100%}
    .width-66 {width: 100%}
    .width-67 {width: 100%}
    .width-75 {width: 100%}
    .width-100 {width: 100%}

    @media screen and (min-width: 900px) {
        .width-25 {width: 25%}
        .width-33 {width: 33%}
        .width-34 {width: 34%}
        .width-50 {width: 50%}
        .width-66 {width: 66%}
        .width-67 {width: 67%}
        .width-75 {width: 75%}
        .width-100 {width: 100%}

        .layout.media-padding .media {
            margin-left: -150px;
            margin-right: -150px;
            width: calc(var(--width) + 300px);
        }
    }
</style>
