<script>
    export let mediaPadding = true;
    export let mediaWidth = "50";
    export let caption = null;
</script>

<div class="media-bottom layout {mediaPadding ? 'media-padding' : ''}">

    <div class="content">
        {#if mediaPadding}<div class="title-heading"><slot name="title" /></div>{/if}

        <div class="text">
            {#if !mediaPadding}<div class="title-heading"><slot name="title" /></div>{/if}
            <slot name="text-display" />
        </div>

        <div class="media width-{mediaWidth}">
            <slot name="media-display" />
            {#if caption}<div class="caption">{caption}</div>{/if}
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
    }
</style>
