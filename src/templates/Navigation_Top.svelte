<script>
    export let sections = null;

    let sectionHeadings = null;

    const init = () => {
        //sectionHeadings = truncateHeadingText(sections);
        sectionHeadings = sections; // dev
    }

    const truncateHeadingText = (sections) => {
        let headings = [];
        for(let {id, text} of sections) {
            if(text.length > 30) {
                text = text.substring(0, 30).concat('...');
            }
            headings.push({
                text,
                id
            })
        }
        return headings;
    }

    const onClickNavigationLink = (event) => {
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
                {#if sectionHeadings}
                    {#each sectionHeadings as {id, text}}
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
        border-bottom-style: solid;
        border-width: 1px;
        border-color: #c5c3c1;
    }

    .navbar-nav {
        width: 100%;
        margin-top: 5px;
    }

    .navbar-nav a {
        color: #383838;
    }

    .navbar-nav li {
        padding-left: 0rem !important;
        margin-bottom: 5px;
    }

    .navbar-nav a {
        text-decoration: none;
    }

    .navbar-nav a:hover {
        text-decoration: underline;
    }
</style>