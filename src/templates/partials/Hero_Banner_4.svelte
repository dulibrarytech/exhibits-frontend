<script>
    'use strict'
    /*
     * hero template #2
     *
     * fullwidth hero image
     * fullwidth title section below image
     */
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { convertPxValuesToEm } from '../../libs/data_helpers';
    import { Settings } from '../../config/settings';

    export let styles = null;
    export let args = {};

    const dispatch = createEventDispatcher();

    const BASE_TITLE_FONT_SIZE = 74;
    const BASE_SUBTITLE_FONT_SIZE = 68;
    const DEFAULT_IMAGE_ALT_TEXT = Settings.exhibitHeroImageAltText;

    let bannerElement;

    let {image=null, title="exhibit title", subtitle=null, titleText = ""} = args;

    const init = () => {
        title = convertPxValuesToEm(title, BASE_TITLE_FONT_SIZE);
        if(subtitle) subtitle = convertPxValuesToEm(subtitle, BASE_SUBTITLE_FONT_SIZE);
        if(!image) console.log("Hero image null path");
     }

    onMount(async () => {
        dispatch('mount', {});
        if(styles) Object.assign(bannerElement.style, styles);
    });

    init();
</script>

<div class="banner" bind:this={bannerElement}>
    <h1 style="display: none;">{titleText}</h1>

    <div class="row">
        {#if image}
            <div class="hero-image col-xl-6 col-lg-6 col-md-5 col-sm-12">
                <img src={image} alt={DEFAULT_IMAGE_ALT_TEXT} />
            </div>
        {/if}

        <div class="title-text col-xl-6 col-lg-6 col-md-7 col-sm-12">
            <div id="title" class="text">
                {@html title}
            </div>
            {#if subtitle}
                <div id="subtitle" class="text">
                    {@html subtitle}
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .banner {
        position: relative;
    }

    .hero-image {
        position: relative;
        padding: 44px;

        /* padding-top: 44px;
        padding-bottom: 44px;  */
    }

    .hero-image > img {
        width: 100%;
    }

    .padding {
        padding: 3.5em;
    }

    .text {
        margin: 0.1em;
        padding-right: 30px;
    }

    .title-text {
        text-align: center;
        font-weight: bold;
        align-content: center;
        margin-bottom: 50px;
    }

    #title {
        font-size: 74px;
    }

    #subtitle {
        font-size: 28px;
    }

    @media screen and (min-width: 576px) {
        #title {
            font-size: 82px;
        }

        #subtitle {
            font-size: 30px;
        }
    }

    @media screen and (min-width: 768px) {
        .hero-image {
            /* padding: 11px; */
        }

        #title {
            font-size: 60px;
        }

        .title-text {
            margin-bottom: 20px;
        }

        #subtitle {
            font-size: 20px;
        }
    }

    @media screen and (min-width: 992px) {
        .hero-image {
            /* padding: 33px; */
        }

        #title {
            font-size: 87px;
        }

        #subtitle {
            font-size: 28px;
        }
    }

    @media screen and (min-width: 1280px) {
        .hero-image {
            /* padding: 44px; */
        }

        #title {
            font-size: 102px;
        }

        #subtitle {
            font-size: 38px;
        }
    }

    @media screen and (min-width: 1400px) {
        #title {
            font-size: 112px;
        }

        #subtitle {
            font-size: 48px;
        }
    }
</style>