<script>
    /*
     * template downloaded from: https://www.bootdey.com/snippets/view/Search-users-page-result
     */
    import Item_Preview from '../../components/Media_Item_Preview.svelte';
    import Exhibit_Preview from '../../components/Exhibit_Preview.svelte';
    import Repository_Item from '../../components/Repository_Item.svelte';
    import { ENTITY_TYPE, SEARCH_TYPE } from '../../config/global-constants';
    import { formatSearchResultValue } from '../../libs/format';

    export let result = {};
    export let terms = [];
    export let index = null;
    export let searchType = null;

    let title;
    let date;
    let caption;
    let description;
    let itemType;
    let link;
    let type;
    let parentExhibitId;
    let isRepoItem;

    let previewImageElement;

    var truncateDescription;

    const MAX_DESCRIPTION_TEXT_LENGTH = 800;

    $: {
        title = result.title || "Untitled Item";
        date = result.date || null;
        caption = result.caption || null;
        description = result.description || result.text || null;
        itemType = result.item_type || null;
        link = result.link || null;
        type = result.type || ENTITY_TYPE.ITEM;
        isRepoItem = result.is_repo_item || false;

        if(!searchType) searchType = SEARCH_TYPE.SEARCH_ALL;
        if(description) truncateDescription = description.length > MAX_DESCRIPTION_TEXT_LENGTH;

        parentExhibitId = (searchType == SEARCH_TYPE.SEARCH_ALL) ? result.is_member_of_exhibit : null;
    }

    const onPreviewImageLoad = (event) => {
        previewImageElement.style.visibility = "visible";
    }
</script>

<section class="search-result-item">
    <div class="image-link" bind:this={previewImageElement}>
        {#if type == ENTITY_TYPE.EXHIBIT}
            <Exhibit_Preview exhibit={result} link={result.link} width="200" height="200" on:image-loaded={onPreviewImageLoad} />  

        {:else}
            {#if isRepoItem}
                <Repository_Item id={null} item={result} args={{showPreview:true, link: (result.link || false), overlay: false}} template={Item_Preview} on:image-loaded={onPreviewImageLoad} on:click-item on:mount-template-item />
            {:else}
                <Item_Preview item={result} width="200" args={{link: (result.link || false), isInteractive: false, overlay: false}} on:image-loaded={onPreviewImageLoad} />
            {/if}
        {/if}
    </div>

    <div class="search-result-item-body">
        <div class="row">
            <!-- left side section -->
            <!-- <div class="col-sm-9"> -->

            <!-- fullwidth, no left side section -->
            <div class="col-sm-12">
                <p>{index+1}.</p>
                <h4 class="search-result-item-heading title"><a href={link} use:formatSearchResultValue={{terms}}>{title}</a></h4>
                <!-- <hr> -->

                {#if date}
                    <p class="info">{date}</p>
                {/if}

                {#if itemType}
                    <p class="info">{itemType}</p>
                <!-- {/if} -->

                {:else if type}
                    <p class="info">{type}</p>
                {/if}

                {#if caption}
                    <p class="info"><span use:formatSearchResultValue={{terms}}>{caption}</span></p>
                {/if}

                {#if description}
                    <p class="description">
                        {#if truncateDescription}
                            <span use:formatSearchResultValue={{terms}}>{description.substr(0, MAX_DESCRIPTION_TEXT_LENGTH).concat('...')}</span>
                            <br><a class="expand-text-link" href on:click|preventDefault={() => truncateDescription = false}>Show more</a>
                        {:else}
                            <span use:formatSearchResultValue={{terms}}>{description}</span>
                        {/if}
                    </p>
                {/if}

                <!-- {#if parentExhibitId}
                    <span>Exhibit:</span> <a href="/exhibit/{parentExhibitId}" class="exhibit-link" use:formatSearchResultValue={{result, terms}}></a>
                    <br><br>
                {/if} -->
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

    .search-result-item .image-link {
        max-height: unset;
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

    .search-result-item-heading {
        margin-bottom: 1rem;
    }

    .image-link {
        visibility: hidden;
    }

    .search-result-item .info {
        margin-top: 2px;
        font-size: 12px;
        color: #999
    }

    .search-result-item .description {
        font-size: 13px
    }

    .search-result-item-heading {
        font-weight: 400
    }

    .search-result-item-heading>a {
        color: #555
    }

    a.expand-text-link {
        text-decoration: underline;
    }

    @media (min-width:768px) {
        .search-result-item-body {
            margin-left: 200px
        }

        .search-result-item .image-link {
            display: inline-block;
            margin: -20px 0 -20px -20px;
            float: left;
            width: 200px;
            max-height: 200px;
        }
    }
</style>