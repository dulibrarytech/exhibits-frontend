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

<!-- <div class="navigation">
    {#if sections}
        {#each sections as {id, text}}
            <a href="#{id}" on:click={onClickNavigationLink}>{text}</a>
        {/each}
    {/if}
</div> -->

<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" id="mainNav">
    <div class="container px-4">
        <!-- <a class="navbar-brand" href="#page-top">Start Bootstrap</a> -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ms-auto">
                <!-- <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
                <li class="nav-item"><a class="nav-link" href="#services">Services</a></li>
                <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li> -->
                {#if sections}
                    {#each sections as {id, text}}
                        <!-- <a href="#{id}" on:click={onClickNavigationLink}>{text}</a> -->
                        <li class="nav-item">
                            <a href="#{id}" on:click={onClickNavigationLink}>{text}</a>
                        </li>
                    {/each}
                {/if}
            </ul>
        </div>
    </div>
</nav>

<style>
    /* .navigation {
        height: 50px;
        background: #e5e3e1;
    } */
</style>