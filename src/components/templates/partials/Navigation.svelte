<script>
    export let sections = null;

    // const init = () => {
    //     console.log("TEST navigation init(): sections:", sections)
    // }

    // $: {
    //     console.log("INIT")
    //     init();
    // }
</script>

<div class="navigation">
    {#if sections}
        <h5>Navbar</h5>

        {#each sections as section}
            {section}
        {/each}
    {/if}
</div>

<style>
    .navigation {
        height: 50px;
        background: #e5e3e1;
    }
</style>