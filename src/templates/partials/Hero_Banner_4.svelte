<script>
    'use strict'
    /*
     * hero template #2
     *
     * fullwidth hero image
     * fullwidth title section below image
     */
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';

    export let styles = null;
    export let args = {};

    let bannerElement;
    let textElement;

    let {image=null, title="exhibit title", subtitle=null} = args;

    const dispatch = createEventDispatcher();

    onMount(async () => {
        dispatch('mount', {});
        if(styles) Object.assign(bannerElement.style, styles);

        let userStyleSection = document.querySelector("#title > div");
        if(userStyleSection) {
            textElement.classList.remove('padding');
        }
    });
</script>

<div class="banner" bind:this={bannerElement}>

    <div class="row">
        <div class="hero-image col-lg-7 col-md-6 col-sm-12">
            <img src={image} alt={title} title={title} />
        </div>

        <div class="title-text padding col-lg-5 col-md-6 col-sm-12" bind:this={textElement}>
            <div id="title" class="text">{@html title}</div>
            {#if subtitle}<hr><div id="subtitle" class="text">{@html subtitle}</div>{/if}
        </div>
    </div>
</div>

<style>
    .banner {
        position: relative;
    }

    .hero-image {
        position: relative;
        padding: 2.5em;
    }

    .hero-image > img {
        width: 100%;
    }

    .padding {
        padding: 3.5em;
    }

    #title {
        font-size: 2.35em;
    }

    #subtitle {
        font-size: 1.85em;
    }

    @media screen and (min-width: 576px) {
        #title {
            font-size: 2.35em;
        }

        #subtitle {
            font-size: 1.85em;
        }
    }

    @media screen and (min-width: 768px) {
        #title {
            font-size: 1.85em;
        }

        #subtitle {
            font-size: 1.35em;
        }
    }

    @media screen and (min-width: 992px) {
        #title {
            font-size: 2.35em;
        }

        #subtitle {
            font-size: 1.85em;
        }
    }

    @media screen and (min-width: 1280px) {
        #title {
            font-size: 2.85em;
        }

        #subtitle {
            font-size: 2.35em;
        }
    }

    @media screen and (min-width: 1400px) {
        #title {
            font-size: 3.35em;
        }

        #subtitle {
            font-size: 2.85em;
        }
    }
</style>