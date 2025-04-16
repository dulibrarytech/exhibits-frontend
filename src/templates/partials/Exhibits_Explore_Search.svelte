<script>
    import FacetLabels from '../../components/FacetLabels.svelte';
    import Search_Box from '../../components/Search_Box.svelte';
    import Filter_Select_Menu from '../../components/Filter_Select_Menu.svelte';

    export let searchData = {};
    export let filters = [];
    export let filterOptions = {};

    const FIELD_LABEL = "Category"

    let _selectOptions = {};

    let {
        endpoint,
        queryParam,
        params,
        fields,
        buttonText,
        placeholder

    } = searchData;

    let _filterLabels = [];

    const init = () => {

        // get the data for the filter select dropdowns
        for(let key in filterOptions) {
            if(filterOptions[key].type == "field") {
                if(!_selectOptions[FIELD_LABEL]) _selectOptions[FIELD_LABEL] = [];
                _selectOptions[FIELD_LABEL].push(filterOptions[key])
            }
        }

        // get the data for the active filter labels (breadcrumbs)
        let field, value;
        for(let filter of filters) {
            field = Object.keys(filter)[0],
            value = Object.values(filter)[0]

            _filterLabels.push({
                field,
                value: value == "1" ? null : value
            })
        }
    }

    init();
</script>

<div class="exhibits-search">

    <div class="search-controls">
        {#if Object.keys(_selectOptions).length > 0}
            <div class="filter-select-wrapper">
                <Filter_Select_Menu options={_selectOptions} state={filters} on:click-filter-option />
            </div>
        {/if}

        <div class="searchbox-wrapper">
            <Search_Box {endpoint} {queryParam} {params} {fields} {buttonText} {placeholder} on:submit-search/>
        </div>
    </div>

    {#if filters.length > 0}
        <div class="search-filter-labels">
            <div class="filter-labels">
                <FacetLabels facets={_filterLabels} on:remove-facet />
            </div>
        </div>
    {/if}
    
</div>

<style>
    .search-controls {
        position: relative;
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        row-gap: 10px;
    }

    .filter-select-wrapper {
        float: left;
        width: 100%;
    }

    .searchbox-wrapper {
        float: right;
        width: 100%;
    }

    .search-filter-labels {
        margin-top: 20px;
    }

    @media screen and (min-width: 768px) {
        .search-controls {
            flex-direction: row;
        }

        .filter-select-wrapper {
            width: 20%;
        }

        .searchbox-wrapper {
            /* use this rule if filter selection dropdown is displayed */
            /* width: 80%; */
        }
    }
</style>