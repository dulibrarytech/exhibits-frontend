<svelte:window on:resize={updateTextMargin} />

<script>
    import { onMount } from 'svelte';

    export let wrapText = true;
    export let mediaPadding = true;
    export let mediaWidth = "50";
    export let caption = null;

    let containerPadding;
    let textContainer;
    let textMargin;

    const updateTextMargin = () => {
        if(wrapText == false) {
            textMargin = window.getComputedStyle(containerPadding).getPropertyValue("margin-left");
            textContainer.style.marginLeft = textMargin;
        }
    }

    onMount(() => {
        updateTextMargin();
    });
</script>

<div class="media-right layout {mediaPadding ? 'media-padding' : ''}">

    {#if wrapText}
        <!-- floating media in text section -->
        <div class="content wrap-text">
            <div class="media width-{mediaWidth}">
                <slot name="media-display" />
                {#if caption}<div class="caption">{caption}</div>{/if}
            </div>

            <div class="text">
                <slot name="text-display" />
            </div>
        </div>

    {:else}
        <!-- flexbox -->
        <div class="content">
            <div bind:this={containerPadding}></div>

            <div class="flex">
                <div class="text" bind:this={textContainer}>
                    <slot name="text-display" />
                </div>

                <div class="media width-{mediaWidth} flex-{mediaWidth}">
                    <slot name="media-display" />
                    {#if caption}<div class="caption">{caption}</div>{/if}
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

    @media screen and (min-width: 901px) {
        .flex {
            flex-wrap: wrap;
        }

        .width-25 {width: 25%; --width: 25%;}
        .width-33 {width: 33%; --width: 33%;}
        .width-34 {width: 34%; --width: 34%;}
        .width-50 {width: 50%; --width: 50%;}
        .width-66 {width: 66%; --width: 66%;}
        .width-67 {width: 67%; --width: 67%;}
        .width-75 {width: 75%; --width: 75%;}
        .width-100 {width: 100%; --width: 100%;}

        .flex-25 {flex: 0 0 25%}
        .flex-33 {flex: 0 0 33%}
        .flex-34 {flex: 0 0 34%}
        .flex-50 {flex: 0 0 50%}
        .flex-66 {flex: 0 0 66%}
        .flex-67 {flex: 0 0 67%}
        .flex-75 {flex: 0 0 75%}
        .flex-100 {flex: 0 0 100%}

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

        .layout:not(.media-padding) .text {
            width: unset;
        }

        .layout:not(.media-padding) .caption {
            padding-right: 50px;
            padding-left: 0.75rem;
        }

        .media-right.media-padding .media {
            margin-right: -150px;
            width: calc(var(--width) + 150px);
        }
    }
</style>
