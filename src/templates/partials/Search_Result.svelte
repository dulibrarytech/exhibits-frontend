<script>
    /*
     * template downloaded from: https://www.bootdey.com/snippets/view/Search-users-page-result
     */
    import Item_Preview from '../../components/Media_Item_Preview.svelte';
    import Exhibit_Preview from '../../components/Exhibit_Preview.svelte';
    import { ENTITY_TYPE, EXHIBIT_TEMPLATE } from '../../config/global-constants';
    import { stripHtmlTags } from '../../libs/data_helpers';

    export let result = {};
    export let terms = [];

    let link;
    let type;
    let title;
    let description; 
    let date;

    $: {
        link = result.link || null;
        type = result.type || ENTITY_TYPE.ITEM
        title = result.title || "No Title";
        description = result.description || result.text || null;
        date = result.date || null;

        format();
    }

    const format = () => {
        if(title) {
            title = stripHtmlTags(title);
            title = highlightTerms(terms, title);
        }

        if(description) {
            description = stripHtmlTags(description);
            description = highlightTerms(terms, description);
        }
    }

    /* adds the html markup for the search term highlighting to each term in the display text */
    const highlightTerms = (terms, text) => {
        let pattern, matches;
         
        terms.forEach((term) => {
            pattern = new RegExp(`${term}`, "gi");
            matches = text.match(pattern);

            if(matches) {
                let highlightedText = "";
                
                matches.forEach((matchText) => {
                    highlightedText = `<span class="text-highlight">${matchText}</span>`;
                    text = text.replace(matchText, highlightedText);
                });
            }
        });

        return text;
    }

</script>

<section class="search-result-item">
    <a class="image-link" href={link}>
        {#if type == ENTITY_TYPE.EXHIBIT}
            <Exhibit_Preview exhibit={result} width="200" height="200" />
        {:else}
            <Item_Preview item={result} width="200" />
        {/if}
    </a>

    <div class="search-result-item-body">
        <div class="row">
            <!-- left side section -->
            <!-- <div class="col-sm-9"> -->

            <!-- fullwidth, no left side section -->
            <div class="col-sm-12">
                <h4 class="search-result-item-heading title"><a href={link}>{@html title}</a></h4>
                <hr>
                {#if date}<p class="info">{date}</p>{/if} <!-- update class when this field is determined -->
                {#if description}<p class="description">{@html description}</p>{/if}
            </div>

            <!-- right side content -->
            <!-- <div class="col-sm-3 text-align-center">
                <p class="value3 mt-sm">$9, 700</p>
                <p class="fs-mini text-muted">PER WEEK</p><a class="btn btn-primary btn-info btn-sm" href="#">Learn More</a>
            </div> -->
        </div>
    </div>
</section>

<style>
    .search-result-item {
        padding: 20px;
        background-color: #fff;
        border-radius: 4px;
    }

    .search-result-item:after,
    .search-result-item:before {
        content: " ";
        display: table
    }

    .search-result-item:after {
        clear: both
    }

    .search-result-item .image-link {
        display: block;
        overflow: hidden;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px
    }

    @media (min-width:768px) {
        .search-result-item .image-link {
            display: inline-block;
            margin: -20px 0 -20px -20px;
            float: left;
            width: 200px
        }
    }

    @media (max-width:767px) {
        .search-result-item .image-link {
            max-height: 200px
        }
    }

    .search-result-item .image {
        max-width: 100%
    }

    .search-result-item .info {
        margin-top: 2px;
        font-size: 12px;
        color: #999
    }

    .search-result-item .description {
        font-size: 13px
    }

    @media (min-width:768px) {
        .search-result-item-body {
            margin-left: 200px
        }
    }

    .search-result-item-heading {
        font-weight: 400
    }

    .search-result-item-heading>a {
        color: #555
    }

    @media (min-width:768px) {
        .search-result-item-heading {
            margin: 0
        }
    }
</style>