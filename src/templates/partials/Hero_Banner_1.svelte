<script>
    /*
     * Hero Banner 1 template
     *
     * Fullwidth hero image with title and subtitle overlay
     * Fullwidth descriptive text section
     * Vertical alignment
     */
    'use strict'

    export let args = {};

    let {image=null, title="exhibit title", subtitle=null, description=null} = args;
</script>

<div class="banner-1"> <!-- TODO min height -->
    <div class="banner container">
        <img src={image} alt={title}/>
        <div id="title">{title}</div>
        {#if subtitle}
            <div id="subtitle">{subtitle}</div>
        {/if}
    </div>

    {#if description}
        <div class="introduction">
            {description}
        </div>
    {/if}
</div>

<style>

</style>