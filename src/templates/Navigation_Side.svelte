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
<!-- 
            {#if index === 0}
                <li class="active sidebar-item" title={text}>
                    <a href="#{id}" on:click={onClickNavigationLink}>{text}</a>
                </li>
            {:else}
                <li class="sidebar-item" title={text}>
                    <a href="#{id}" on:click={onClickNavigationLink}>{text}</a>
                </li>
            {/if} -->
            <a href="#{id}" on:click={onClickNavigationLink}>{text}</a>

            <!-- <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start min-vh-100">
                <a href="#" class="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i class="bi bi-bootstrap"></i> <span>Item</span> </a>
                <a href="#" class="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i class="bi bi-film"></i> <span>Item</span></a>
                <a href="#" class="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i class="bi bi-heart"></i> <span>Item</span></a>
                <a href="#" class="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i class="bi bi-bricks"></i> <span>Item</span></a>
                <a href="#" class="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i class="bi bi-clock"></i> <span>Item</span></a>
                <a href="#" class="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i class="bi bi-archive"></i> <span>Item</span></a>
                <a href="#" class="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i class="bi bi-gear"></i> <span>Item</span></a>
                <a href="#" class="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i class="bi bi-calendar"></i> <span>Item</span></a>
                <a href="#" class="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i class="bi bi-envelope"></i> <span>Item</span></a>
            </div> -->

        {/each}
    {/if}
</div>