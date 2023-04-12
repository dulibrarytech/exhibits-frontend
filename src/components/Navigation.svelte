<script>
    export let sections = null;

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
</script>

<div class="navigation">
    {#if sections}
        {#each sections as {id, text}}
            <a href="#{id}" on:click={onClickNavigationLink}>{text}</a>
        {/each}
    {/if}
</div>

<style>
    .navigation {
        height: 50px;
        background: #e5e3e1;
    }
</style>