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

<ul class="nav navbar-nav ms-auto">
    {#if sectionHeadings}
        {#each sectionHeadings as {id, text}}
            <li class="px-1" title={text}>
                <a href="#{id}" on:click={onClickNavigationLink}>{text}</a>
            </li>
        {/each}
    {/if}
</ul>

<style>
    .navbar-nav {
        width: 100%;
        margin-top: 5px;
    }

    .navbar-nav a {
        color: #383838;
        padding: 3px;
    }

    .navbar-nav li {
        padding-left: 0rem !important;
        margin-bottom: 5px;
    }

    .navbar-nav li:not(:last-child)::after {
        content: '|';
        font-weight: bold;
    }

    .navbar-nav a {
        text-decoration: none;
    }

    .navbar-nav a:hover {
        text-decoration: underline;
    }
</style>