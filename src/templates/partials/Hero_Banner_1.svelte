<script>
    'use strict'
    /*
     * Hero_Banner_1 
     * hero template
     *
     * fullwidth hero image
     * title and subtitle overlay
     * fullwidth descriptive text section 
     */
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';

    export let args = {};

    let {image=null, title="exhibit title", subtitle=null, description=null} = args;

    const dispatch = createEventDispatcher();

    onMount(async () => {
        dispatch('mount', {});
    });
</script>

<!-- <div class="banner-1"> -->
    <header class="banner">
        <img src={image} alt={title}/>
        <div class="title-text">
            <div id="title" class="overlay-text text">{title}</div>
            <hr>
            {#if subtitle}<div id="subtitle" class="overlay-text text">{subtitle}</div>{/if}
        </div>
        
    </header>

    {#if description}
        <section class="introduction">
            <div class="container px-4">
                <div class="row gx-4 justify-content-center">
                    <div class="col-lg-8">
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </section>
    {/if}
<!-- </div> -->

<style>
    header {
        padding: 0;
    }

    hr {
        height: 6px;
    }

    .banner {
        position: relative;
    }

    .title-text {
        position: absolute;
        top: 0;
        padding: 45px;
    }

    .overlay-text {
        
    }

    #title {
        font-size: 4.2em;
    }

    #subtitle {
        font-size: 1.8em;
    }
</style>