<script>
    'use strict'
    /*
     * hero template #1
     *
     * fullwidth hero image, no title 
     */
    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';

    export let args = {};

    let {image = null, title="exhibit title", description = null} = args;

    const dispatch = createEventDispatcher();

    onMount(async () => {
        dispatch('mount', {});
    });
</script>

<div class="banner">
    <img src={image} alt={title} title={title} />
</div>

<style>
    .banner {
        position: relative;
    }
</style>