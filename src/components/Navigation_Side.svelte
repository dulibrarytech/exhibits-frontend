<script>
    export let sections = null;

    const init = () => {

    }

    $: init();
</script>

<!-- Sidebar -->
<ul class="sidebar-nav nav-pills nav-stacked" id="menu">

    {#if sections}
        {#each sections as {id, text}, index}

            {#if index === 0}
                <li class="active" title={text}>
                    <a href="#{id}">{text}</a>
                </li>
            {:else}
                <li title={text}>
                    <a href="#{id}">{text}</a>
                </li>
            {/if}
            
        {/each}
    {/if}
</ul>

<style>

</style>