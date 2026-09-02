<script>
    /*
     * template downloaded from: https://www.bootdey.com/snippets/view/Search-users-page-result
     */
    import {createEventDispatcher} from 'svelte';
    import Item_Preview from '../../components/Media_Item_Preview.svelte';
    import Exhibit_Preview from '../../components/Exhibit_Preview.svelte';
    import { ENTITY_TYPE, SEARCH_TYPE } from '../../config/global-constants';
    import { formatSearchResultValue } from '../../libs/format';

    export let result = {};
    export let terms = [];
    export let index = null;
    export let searchType = null;

    const dispatch = createEventDispatcher();

    // item data fields
    let title;
    let date;
    let caption;
    let description;
    let itemType;
    let link;
    let type;
    let isStudentCurated;
    let parentExhibitId;

    // module variables
    let truncateDescription;

    // element handles
    let previewImageElement;

    // feature flags
    const USE_CAPTION_FOR_TITLE = true;

    // module settings
    const MAX_DESCRIPTION_TEXT_LENGTH = 300;
    const DEFAULT_TITLE = "Untitled";

    $: {
        title = result.title || result.media_name || null;
        date = result.date || null;
        caption = result.caption || null;
        description = result.description || result.text || null;
        itemType = result.item_type || null;
        link = result.link || null;
        type = result.type || ENTITY_TYPE.ITEM;

        isStudentCurated = result.is_student_curated || false;
        parentExhibitId = (searchType == SEARCH_TYPE.SEARCH_ALL) ? result.is_member_of_exhibit : null;

        if(!searchType) searchType = SEARCH_TYPE.SEARCH_ALL;
        if(description) truncateDescription = description.length > MAX_DESCRIPTION_TEXT_LENGTH;
    }

    const onPreviewImageLoad = (event) => {
        previewImageElement.style.visibility = "visible";
        // hide spinner
    }

    const onClickResultLink = (event) => {
        dispatch('click-result', {resultIndex: index});
    }
</script>

<section class="search-result-item">
    <div class="image-link" bind:this={previewImageElement}>
        {#if type == ENTITY_TYPE.EXHIBIT}
            <Exhibit_Preview exhibit={result} link={result.link} width="200" height="200" on:image-loaded={onPreviewImageLoad} />  
        {:else}
            <Item_Preview 
                item={result} 
                width="200" 
                args={{
                    isThumbnail: true,
                    link: (result.link || false), 
                    isInteractive: false,
                }} 
                on:image-loaded={onPreviewImageLoad} />
        {/if}
    </div>

    <div class="search-result-item-body">
        <div class="row">
            <!-- left side section -->
            <!-- <div class="col-sm-9"> -->

            <!-- fullwidth results list, no left side section -->
            <div class="col-sm-12">
                <div class="entity-type">
                    {#if type == ENTITY_TYPE.EXHIBIT}
                       <span>Exhibit</span>
                    {:else if type == ENTITY_TYPE.ITEM}
                       <span>Media</span>
                    {/if}
                </div>

               <h3 class="search-result-item-heading title">
                    <a 
                        href="#" 
                        on:click={onClickResultLink}
                        use:formatSearchResultValue={{terms}}
                    >
                        {title || (USE_CAPTION_FOR_TITLE && caption ? caption : false) || DEFAULT_TITLE}
                    </a>
                </h3>

                {#if type == ENTITY_TYPE.EXHIBIT && isStudentCurated}
                    <div class="curated-type">
                        <i class="bi bi-mortarboard-fill"></i><span>Student Curated</span>
                    </div>
                {/if}

                {#if description}
                    <p class="description">
                        {#if truncateDescription}
                            <span use:formatSearchResultValue={{terms}}>{description.substr(0, MAX_DESCRIPTION_TEXT_LENGTH).concat('...')}</span>
                        {:else}
                            <span use:formatSearchResultValue={{terms}}>{description}</span>
                        {/if}

                        {#if truncateDescription}
                            <a class="expand-text-link" href on:click|preventDefault={() => truncateDescription = false}>Show more</a>
                        {/if}
                    </p>
                {/if}

                <!-- {#if parentExhibitId}
                    <span>Exhibit:</span> <a href="/exhibit/{parentExhibitId}" class="exhibit-link" use:formatSearchResultValue={{result, terms}}></a>
                    <br><br>
                {/if} -->
            </div>
            <!-- end left side section -->

            <!-- right side section -->
            <!-- <div class="col-sm-3 text-align-center">
                <p class="value3 mt-sm">$9, 700</p>
                <p class="fs-mini text-muted">PER WEEK</p><a class="btn btn-primary btn-info btn-sm" href="#">Learn More</a>
            </div> -->
            <!-- end right side section -->
        </div>
    </div>
</section>

<style>
    .search-result-item {
        padding: 20px;
        background-color: #fff;
        border-radius: 4px;
        display: flex;
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
        border-bottom-left-radius: 4px;
        max-height: unset;
        margin-bottom: 1.8rem;
    }

    .search-result-item-heading {
        margin-bottom: 0.8rem;
        font-weight: 400
    }

    .search-result-item-heading > a {
        color: #555;
    }

    .entity-type {
        margin-bottom: 15px;
    }

    .entity-type span {
        background: #e5e5e5;
        padding: 5px;
        border-radius: 3px;
        font-size: 0.9rem;
    }

    .curated-type {
        margin-bottom: 0.7rem;
    }

    .curated-type i {
        color: #BA0C2F;
        margin-right: 0.7rem;
        position: relative;
        top: 1px;
    }

    .curated-type span {
        color: #757575;
        text-transform: uppercase;
        font-size: 0.9rem;
    }

    .description-truncated {
		text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
		max-height: 240px;
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
        margin-top: 0.5rem;
        font-size: 0.85rem;
    }

    a.expand-text-link {
        text-decoration: underline;
        font-size: 0.85rem;
    }

    @media (min-width:768px) {
        .search-result-item .image-link {
            margin: -20px 20px -20px -20px;
            float: left;
            max-width: 165px;
            min-width: 165px;
            max-height: 200px;
            margin-bottom: 0;
        }
    }
</style>