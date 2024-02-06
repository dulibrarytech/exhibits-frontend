<script>
    /*
     * template downloaded from: https://www.bootdey.com/snippets/view/Search-users-page-result
     */
    import Item_Preview from '../../components/Media_Item_Preview.svelte';
    import Exhibit_Preview from '../../components/Exhibit_Preview.svelte';
    import { ENTITY_TYPE } from '../../config/global-constants';
    import { formatSearchResultValue } from '../../libs/format';

    export let result = {};
    export let terms = [];

    let title;
    let date;
    let description;
    let itemType;
    let link;
    let exhibit;
    let type;

    var truncateDescription = false;

    const MAX_DESCRIPTION_TEXT_LENGTH = 800;

    $: {
        title = result.title || "Untitled Item";
        date = result.date || null;
        description = result.description || result.text || null;
        itemType = result.item_type || null;
        link = result.link || null;
        exhibit = result.is_member_of_exhibit || null;
        type = result.type || ENTITY_TYPE.ITEM

        if(description.length > MAX_DESCRIPTION_TEXT_LENGTH) {
            truncateDescription = true;
            description = description.substr(0, MAX_DESCRIPTION_TEXT_LENGTH).concat('...');
        }
    }

    const expandText = () => {
        truncateDescription = false;
        description = result.description || result.text || null;
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
                <h4 class="search-result-item-heading title"><a href={link} use:formatSearchResultValue>{@html title}</a></h4>
                <hr>

                <p class="info">{date || "n.d."}</p>

                {#if type}
                    <p class="info">{itemType}</p>
                {/if}

                {#if description}
                    <p class="description">
                        <span use:formatSearchResultValue>{@html description}</span>
                        {#if truncateDescription}<br><a class="expand-text-link" href on:click|preventDefault={expandText}>Show more</a>{/if}
                    </p>
                {/if}

                {#if exhibit}
                    <span>Exhibit:</span> <a href="/exhibit/{exhibit}" class="exhibit-link" use:formatSearchResultValue={{result, terms}}></a>
                    <br><br>
                {/if}
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

    a.expand-text-link {
        text-decoration: underline;
    }
</style>