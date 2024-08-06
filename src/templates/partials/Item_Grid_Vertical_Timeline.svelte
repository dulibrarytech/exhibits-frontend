<!-- <svelte:head>
    <link rel="stylesheet" href="../assets/styles/timeline.min.css">
</svelte:head> -->

<script>
    /*
     * https://github.com/squarechip/timeline
     *
     * EXAMPLE this is not the curretn VTL template for the Exhibits app
     */
    'use strict'

    import { onMount } from 'svelte';
    import {Timeline} from '../../libs/timeline';
    import Grid_Item_Image_Text from './Grid_Item_Image_Text.svelte';

    export let grid = {};
    export let id = null;

    let timelineSection;
    let items;
    let styles;

    let verticalStartPosition = "left";
    let verticalTrigger = "150px";

    const init = () => {
        items = grid.items || [];
        styles = grid.styles?.item_grid || null;
    }

    const setTheme = (styles) => {
        Object.assign(timelineSection.style, styles)
    }

    $: init();

    const getPositionClass = (item) => {
        let className = '';

        if(item?.layout == 'left') {
            className = 'layout--left';
        }
        else if(item?.layout == 'right') {
            className = 'layout--right';
        }
        
        return className;
    }

    onMount(async () => {
        Timeline.timeline(document.querySelectorAll('.timeline'), {
            verticalStartPosition,
            verticalTrigger
        });

        document.querySelectorAll('.timeline__item.animated').forEach((item) => {
            item.classList.remove('animated');
        });

        document.querySelectorAll('.timeline__item.top-offset').forEach((item) => {
            item.style.marginTop = "80px";
        });

        if(styles) setTheme(styles);
    });
</script>

<div class="vertical-timeline-item-grid" bind:this={timelineSection}>
    <div id={id ?? undefined} class="anchor-offset"></div>

    <div class="timeline">
        <div class="timeline__wrap">
            <div class="timeline__items">
                {#each items as item}
                    <!-- {#if item.is_published} -->
                        <!-- {#if item.year_label} -->
                            <div class="timeline__item top-offset {getPositionClass(item)}"> <!-- 'timeline__item--right', 'timeline__item--left', '' -->
                                {#if item.year_label}
                                    <div class="timeline-label">
                                        <h3>{item.year_label}</h3>
                                    </div>
                                {/if}
                                <div class="timeline__content" id="item-{item.uuid}">
                                    <!-- <Grid_Item_Image_Text {item} on:click-preview={onClickPreview} /> -->
                                    <Grid_Item_Image_Text {item} on:click-item />
                                </div>
                            </div>
                        <!-- {:else}
                            <div class="timeline__item">
                                <div class="timeline__content" id="item-{item.uuid}">
                                    <Grid_Item_Image_Text {item} on:click-preview={onClickPreview} />
                                </div>
                            </div>
                        {/if} -->
                    <!-- {/if} -->
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    /* original template styles */
    .timeline{-webkit-box-sizing:border-box;box-sizing:border-box;position:relative}.timeline *,.timeline :after,.timeline :before{-webkit-box-sizing:inherit;box-sizing:inherit}.timeline:not(.timeline--horizontal):before{background-color:#ddd;bottom:0;content:'';left:50%;margin-left:-2px;position:absolute;top:0;width:4px;z-index:1}.timeline__wrap{overflow:hidden;position:relative;z-index:2}.timeline__item{font-size:16px;font-size:1rem;padding:.625rem 2.5rem .625rem 0;position:relative;width:50%;z-index:2}.timeline__item:after{background-color:#fff;border:4px solid #ddd;border-radius:50%;content:'';height:20px;position:absolute;right:-10px;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);top:50%;width:20px;z-index:1}.timeline__item.animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both;opacity:0}.timeline__item.fadeIn{-webkit-animation-name:fadeIn;animation-name:fadeIn}.timeline__item--left{left:0}.timeline__item--right{left:50%;padding:.625rem 0 .625rem 2.5rem}.timeline__item--right:after{left:-10px}.timeline__item--right .timeline__content:before{border-bottom:10px solid transparent;border-right:12px solid #ccc;border-left:none;border-top:10px solid transparent;left:-12px}.timeline__item--right .timeline__content:after{border-bottom:9px solid transparent;border-right:11px solid #fff;border-left:none;border-top:9px solid transparent;left:-10px}.timeline__content{background-color:#fff;border:1px solid #ccc;border-radius:10px;color:#333;display:block;padding:1.25rem;position:relative}.timeline__content:after,.timeline__content:before{content:'';height:0;position:absolute;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);top:50%;width:0}.timeline__content:before{border-bottom:10px solid transparent;border-left:12px solid #ccc;border-top:10px solid transparent;right:-12px;z-index:1}.timeline__content:after{border-bottom:9px solid transparent;border-left:11px solid #fff;border-top:9px solid transparent;right:-10px;z-index:2}.timeline__content h2{font-size:1.25rem;font-weight:700;margin:0 0 .625rem}.timeline__content p{font-size:.9375rem;line-height:1.5;margin-bottom:10px}.timeline--horizontal{font-size:0;padding:0 3.125rem;overflow:hidden;white-space:nowrap}.timeline--horizontal .timeline-divider{background-color:#ddd;display:block;height:4px;left:40px;position:absolute;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);right:40px;z-index:1}.timeline--horizontal .timeline__items{-webkit-transition:all .8s;-o-transition:all .8s;transition:all .8s;will-change:transform}.timeline--horizontal .timeline__item{display:inline-block;left:0;padding:0 0 2.5rem;position:relative;-webkit-transition:none;-o-transition:none;transition:none;vertical-align:top;white-space:normal}.timeline--horizontal .timeline__item:after{left:50%;right:auto;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);top:100%}.timeline--horizontal .timeline__item .timeline__item__inner{display:table;height:100%;width:100%}.timeline--horizontal .timeline__item .timeline__content__wrap{display:table-cell;margin:0;padding:0;vertical-align:bottom}.timeline--horizontal .timeline__item .timeline__content:before{border-left:12px solid transparent;border-right:12px solid transparent;border-top:12px solid #ccc;left:50%;right:auto;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);top:100%}.timeline--horizontal .timeline__item .timeline__content:after{border-left:10px solid transparent;border-right:10px solid transparent;border-top:10px solid #fff;left:50%;right:auto;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);top:100%}.timeline--horizontal .timeline__item--bottom{padding:2.5rem 0 0}.timeline--horizontal .timeline__item--bottom:after{top:0}.timeline--horizontal .timeline__item--bottom .timeline__content__wrap{vertical-align:top}.timeline--horizontal .timeline__item--bottom .timeline__content:before{border-bottom:12px solid #ccc;border-left:12px solid transparent;border-right:12px solid transparent;border-top:none;bottom:100%;top:auto}.timeline--horizontal .timeline__item--bottom .timeline__content:after{border-bottom:10px solid #fff;border-left:10px solid transparent;border-right:10px solid transparent;border-top:none;bottom:100%;top:auto}.timeline-nav-button{background-color:#fff;border:2px solid #ddd;border-radius:50px;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:none;box-shadow:none;cursor:pointer;display:block;height:40px;outline:0;position:absolute;text-indent:-9999px;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);top:50%;width:40px;z-index:10}.timeline-nav-button:disabled{opacity:.5;pointer-events:none}.timeline-nav-button:before{background-position:center center;background-repeat:no-repeat;content:'';display:block;height:14px;left:50%;position:absolute;-webkit-transform:translateX(-50%) translateY(-50%);-ms-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);top:50%;width:8px}.timeline-nav-button--prev{left:0}.timeline-nav-button--prev:before{background-image:url(../images/arrow-left.svg)}.timeline-nav-button--next{right:0}.timeline-nav-button--next:before{background-image:url(../images/arrow-right.svg)}.timeline--mobile{padding:0}.timeline--mobile:before{left:10px!important;margin:0!important}.timeline--mobile .timeline__item{left:0;padding-left:40px;padding-right:0;width:100%}.timeline--mobile .timeline__item:after{left:2px;margin:0}.timeline--mobile .timeline__item .timeline__content:before{left:-12px;border-bottom:12px solid transparent;border-right:12px solid #ccc;border-left:none;border-top:12px solid transparent}.timeline--mobile .timeline__item .timeline__content:after{left:-10px;border-bottom:10px solid transparent;border-right:10px solid #fff;border-left:none;border-top:10px solid transparent}@-webkit-keyframes fadeIn{0%{opacity:0;top:70px}100%{opacity:1;top:0}}@keyframes fadeIn{0%{opacity:0;top:70px}100%{opacity:1;top:0}}@-webkit-keyframes liftUp{0%{top:0}100%{top:-15px}}@keyframes liftUp{0%{top:0}100%{top:-15px}}

    /* override template styles */
    .vertical-timeline-item-grid {
        padding-top: 45px;
        margin: 0 auto 80px auto;
        width: 90%;
    }

    .timeline {
        padding-top: 80px;
        padding-bottom: 80px;
        margin: 0 auto;
    }

    .timeline__content {
        padding: 0;
    }

    .timeline-label h3 {
        margin-bottom: 0;
        padding: 0.1em;
    }

    .timeline-label {
        position: absolute;
        background: lightgray;
        color: black;
        border-radius: 5px;
        top: -50px;
    }

    :global(.vertical-timeline-item-grid .timeline-item.top-offset) {
        top: 80px;
    }

    :global(.vertical-timeline-item-grid .timeline__item--left .timeline__content:after) {
        border-left: 11px solid lightgray;
    }

    :global(.vertical-timeline-item-grid .timeline__item--right .timeline__content:after) {
        border-right: 11px solid lightgray !important;
    }

    :global(.vertical-timeline-item-grid .timeline .grid-item) {
        border-radius: 10px;
        padding: 45px !important;
    }

    :global(.vertical-timeline-item-grid .vertical-timeline-item-grid .timeline .grid-section) {
        padding: 0;
        margin-bottom: 0px !important;
    }

    :global(.vertical-timeline-item-grid .timeline .item-preview) {
        /* width:65%; */
    }

    :global(.vertical-timeline-item-grid .timeline__item--left .timeline-label) {
        right: -35px;
    }

    :global(.vertical-timeline-item-grid .timeline__item--right .timeline-label) {
        left: -35px;
    }

    @media (min-width: 1400px) {
        .timeline {
            max-width: 85%;
        }
    }
    @media (min-width: 1200px) {
        .timeline {
            max-width: 80%;
        }
    }
    @media (min-width: 992px) {
        .timeline {
            max-width: 75%;
        }
    }
</style>