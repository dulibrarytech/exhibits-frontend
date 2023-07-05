<script>
    'use strict'
    /*
     * Hero_Banner_2
     * hero template
     *
     * fullwidth hero image
     * fullwidth title and descriptive text section 
     */
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';

    export let args = {};

    let {image=null, title="exhibit title", subtitle=null, description=null} = args;

    const dispatch = createEventDispatcher();

    onMount(async () => {
        dispatch('mount', {});
        
        document.querySelector('.hero-image').style.backgroundImage = `url("${image}")`;
    });
</script>

<div class="banner">
    <section class="hero-image"></section>
    
    <section class="hero-text">
        <div class="container">
            {#if description}
                <div class="description-text">
                    <div class="row">
                        <div class="col-lg-12">
                            <p>{@html description}</p>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </section>
</div>

<style>
    header {
        padding: 0;
    }

    .banner {
        position: relative;
        height: 50%
    }

    .hero-image {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        min-height: 700px;
    }

    .hero-text {
        /* text-align: center; */
        color: white;
        /* padding: 3.75em 0; */
        padding-top: 50px;
        padding-bottom: 50px;
    }

    .description-text {
        margin-top: 2.25em;
        margin-bottom: 2.25em;
    }
</style>