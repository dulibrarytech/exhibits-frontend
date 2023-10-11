<script>
    export let sections = null;

    let sectionHeadings = null;

    const init = () => {
        //sectionHeadings = truncateHeadingText(sections);
        sectionHeadings = sections;
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

<ul class="nav nav-link navbar-nav ms-auto">
    {#if sectionHeadings}
        {#each sectionHeadings as {id, text, subheadings = null}}
            <li class="px-1" title={text}>
                <a class="main-menu-link" href="#{id}" on:click={onClickNavigationLink}>{text}</a>
            

                {#if subheadings.length > 0}

                    <div class="dropdown-nav">
                        {#each subheadings as {id, text}}
                            <a class="dropdown-link" href="#{id}" on:click={onClickNavigationLink}>{text}</a>
                        {/each}
                    </div>
                
                {/if}
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
        color: #505050;
        padding: 8px;
        font-size: 18px;
        font-weight: bold;
    }

    .navbar-nav li {
        padding-left: 0rem !important;
        margin-bottom: 5px;
    }

    .navbar-nav li:not(:last-child) {
        margin-right: 5px;
    }

    .navbar-nav a {
        text-decoration: none;
    }

    .navbar-nav a:hover {
        text-decoration: underline;
    }

    .dropdown-nav {
        position: absolute;
        background: #e5e3e1;
        padding: 15px;
        display: none;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    a.main-menu-link {
        display: block;
    }

    a.dropdown-link {
        display: block;
    }

    /* .nav > li:hover .dropdown-nav {
        display: block;
    } */

    /* .nav > li:hover {
        background: red
    } */

    .navbar-nav > li:hover .dropdown-nav {
        display: block;
    }
</style>