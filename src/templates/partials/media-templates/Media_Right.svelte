<script>
    export let wrapText = true;
    export let mediaPadding = true;
    export let mediaWidth = "50";
    export let caption = null;
</script>

<div class="media-right layout {mediaPadding ? 'container media-padding' : ''}">

    {#if wrapText}

        <!-- floating media in text section -->
        <div class="content wrap-text">
            {#if mediaPadding}<div class="title-heading"><slot name="title" /></div>{/if}
            <div class="media width-{mediaWidth}">
                <slot name="media-display" />
                {#if caption}<div class="{mediaPadding ? '' : 'container-wide'} caption">{caption}</div>{/if}
            </div>

            <div class="text {mediaPadding ? '' : 'container-wide'}">
                {#if !mediaPadding}<div class="title-heading"><slot name="title" /></div>{/if}
                <slot name="text-display" />
            </div>
        </div>

    {:else}

        <!-- flexbox -->
        <div class="content">
            {#if mediaPadding}<div class="title-heading"><slot name="title" /></div>{/if}
            <div class="flex">
                <div class="text"> <!-- flex: 1 --> <!-- temp remove .container-wide -->
                    {#if !mediaPadding}<div class="title-heading"><slot name="title" /></div>{/if}
                    <slot name="text-display" />
                </div>

                <div class="media width-{mediaWidth} flex-{mediaWidth}"> <!-- flex-50 -->
                    <slot name="media-display" />
                    {#if caption}<div class="{mediaPadding ? '' : 'container'} caption">{caption}</div>{/if}
                </div>
            </div>
        </div>
        
    {/if}
</div>

<style>
    .flex {
        display: flex;
        flex-wrap: wrap-reverse;
        row-gap: 3.5rem;
    }

    .container-wide {
        /* extends .container Bootstrap v5.1.3 */
        width: 100%;
        padding-right: var(--bs-gutter-x,.75rem);
        padding-left: var(--bs-gutter-x,.75rem);
        margin-right: auto;
        margin-left: auto;
    }

    .title-heading:has(> div:empty) {
        display: none;
    }

    .width-25 {width: 100%}
    .width-33 {width: 100%}
    .width-34 {width: 100%}
    .width-50 {width: 100%}
    .width-66 {width: 100%}
    .width-67 {width: 100%}
    .width-75 {width: 100%}
    .width-100 {width: 100%}

    .flex-25 {flex: 0 0 100%}
    .flex-33 {flex: 0 0 100%}
    .flex-34 {flex: 0 0 100%}
    .flex-50 {flex: 0 0 100%}
    .flex-66 {flex: 0 0 100%}
    .flex-67 {flex: 0 0 100%}
    .flex-75 {flex: 0 0 100%}
    .flex-100 {flex: 0 0 100%}

    .content.wrap-text .media {
        float: none;
        box-sizing: border-box;
        padding-left: 0;
        padding-bottom: 0;
        margin-bottom: 3.65rem; 
    }

    .layout.media-padding .caption {
        padding-left: 0.75rem;
    }

    .layout.media-padding .content:not(.wrap-text) .text {
        padding-right: 0;
    }

    .content .flex .text {
        flex: 1;
    }

    .layout:not(.media-padding) .content:not(.wrap-text) .text {
        margin-left: 3.5vw;
        margin-right: 3.5vw;
    }

    .media-right:has(> .wrap-text) {
        display: flex;
        flex-direction: column;
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
        .flex {
            flex-wrap: wrap;
        }

        .width-25 {width: 25%}
        .width-33 {width: 33%}
        .width-34 {width: 34%}
        .width-50 {width: 50%}
        .width-66 {width: 66%}
        .width-67 {width: 67%}
        .width-75 {width: 75%}
        .width-100 {width: 100%}

        .flex-25 {flex: 0 0 25%}
        .flex-33 {flex: 0 0 33%}
        .flex-34 {flex: 0 0 34%}
        .flex-50 {flex: 0 0 50%}
        .flex-66 {flex: 0 0 66%}
        .flex-67 {flex: 0 0 67%}
        .flex-75 {flex: 0 0 75%}
        .flex-100 {flex: 0 0 100%}

        .container-wide {
            max-width: 93vw;
        }

        .content.wrap-text .media {
            float: right;
            box-sizing: content-box;
            padding-left: 40px;
            padding-bottom: 25px;
            margin-bottom: 0; 
        }

        .layout.media-padding .content:not(.wrap-text) .text {
            padding-right: 3.5rem;
        }

        .layout:not(.media-padding) .content:not(.wrap-text) .text {
            margin-left: 3.5vw;
            margin-right: 3.5vw;
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