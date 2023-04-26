<!-- Requires bootstrap 5x -->
<script>
    export let sections = null;

    const init = () => {

    }

    function onClickNavigationLink (event) {
		event.preventDefault()
		const link = event.currentTarget
		const anchorId = new URL(link.href).hash.replace('#', '')
		const anchor = document.getElementById(anchorId)
		window.scrollTo({
			top: anchor.offsetTop,
			behavior: 'smooth'
		})
	}

    $: init();
</script>

<div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start">
    {#if sections}
        {#each sections as {id, text}, index}
            <a href="#{id}" on:click={onClickNavigationLink}>{text}</a>
        {/each}
    {/if}
</div>