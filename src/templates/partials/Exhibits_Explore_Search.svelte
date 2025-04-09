<script>
    import FacetLabels from '../../components/FacetLabels.svelte';
    import Search_Box from '../../components/Search_Box.svelte';
    import Filter_Select_Menu from '../../components/Filter_Select_Menu.svelte';

    export let searchData = {};
    export let filters = [];
    export let filterOptions = {};

    const FIELD_LABEL = "Category"

    let _selectOptions = {
        [FIELD_LABEL]: []
    };

    let {
        endpoint,
        queryParam,
        params,
        fields,
        placeholder

    } = searchData;

    let _filterLabels = [];

    const init = () => {

        for(let key in filters) {
            if(filters[key].type == "field") {
                _selectOptions[FIELD_LABEL].push(filters[key])
            }
        }

        for(let filter of filters) {
            _filterLabels.push({
                field: Object.keys(filter)[0],
                value: Object.values(filter)[0]
            })
        }
    }

    init();
</script>

<div class="exhibits-search">

    <div class="filter-select-wrapper">
        <Filter_Select_Menu options={_selectOptions} state={filters} on:click-filter-option />
    </div>

    <div class="searchbox-wrapper">
        <Search_Box {endpoint} {queryParam} {params} {fields} {placeholder} on:submit-search/>
    </div>

    {#if filters.length > 0}
        <div class="filter-labels">
            <FacetLabels facets={_filterLabels} />
        </div>
    {/if}
    
</div>

<style>
    .exhibits-search {
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

    .filter-labels {

    }

    @media screen and (min-width: 768px) {
        .exhibits-search {
            flex-direction: row;
        }

        .filter-select-wrapper {
            width: 20%;
        }

        .searchbox-wrapper {
            width: 80%;
        }
    }
</style>