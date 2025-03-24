<script>
    'use strict'

    // this might be a template

    import { onMount } from 'svelte';
    import { Settings } from '../config/settings.js';

    export let exhibit;

    let heroElement;

    onMount(async () => {
        //heroElement.style.background = "url('/assets/images/AAC-exhibits.jpg')";
    })
</script>

<div class="homepage-hero" bind:this={heroElement}>
    <div class="container">
        <div class="row">

            <!-- highlight exhibit title, description -->
            <div class="col-sm-12 col-md-6">

            </div>

            <!-- highlight exhibit preview -->
            <div class="col-sm-12 col-md-6">

            </div>

        </div>
    </div>
</div>

<style>
    .homepage-hero {
        height: 400px;
        background-color: lightgrey;
    }
</style>