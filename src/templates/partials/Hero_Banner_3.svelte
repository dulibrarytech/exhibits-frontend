<script>
    'use strict'
    /*
     * hero template #3
     *
     * fullwidth hero image
     * fullwidth description section, no title text
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
        {#if description}
            <div class="description-text">
                <p>{@html description}</p>
            </div>
        {/if}
    </section>
</div>

<style>
    .banner {
        position: relative;
        height: 50%
    }

    .hero-image {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        min-height: 800px;
    }

    .hero-text {
        color: white;
    }
</style>