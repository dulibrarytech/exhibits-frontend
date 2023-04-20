<script>
    export let sections = null;

    const init = () => {
        // for(let section of sections) {
        //     //section.hover = 
        //     if(section.text.length > 30) {
        //         section.text = text.substring(0, 30).concat('...');
        //     }
        // }
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

<nav class="navbar navbar-expand-lg navbar-light sticky-top" id="mainNav">
    <div class="container">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="nav navbar-nav ms-auto">
                {#if sections}
                    {#each sections as {id, text}}
                        <li class="px-4" title={text}>
                            <a href="#{id}" on:click={onClickNavigationLink}>{text}</a>
                        </li>
                    {/each}
                {/if}
            </ul>
        </div>
    </div>
</nav>

<style>
    .navbar {
        background: #e5e3e1;
        min-height: 4.2em;
    }

    .navbar-nav {
        width: 100%
    }

    .navbar-nav a {
        color: #383838;
    }

    .navbar-nav li {
        padding-left: 0rem !important;
    }

    .navbar-nav a {
        text-decoration: none;
    }

    .navbar-nav a:hover {
        text-decoration: underline;
    }
</style>