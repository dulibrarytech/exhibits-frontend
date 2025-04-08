<script>
    import Search_Box from '../../components/Search_Box.svelte';
    import Filter_Select_Menu from '../../components/Filter_Select_Menu.svelte';

    export let searchData = {};
    export let filterData = {};
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

    const init = () => {
        getSelectOptions(filterOptions);
    }

    const getSelectOptions = (filters) => {
        for(let key in filters) {
            if(filters[key].type == "field") {
                _selectOptions[FIELD_LABEL].push(filters[key])
            }
        }
    }

    init();
</script>

<div class="exhibits-search">

    <div class="filter-select-wrapper">
        <Filter_Select_Menu options={_selectOptions} state={filterData} on:click-filter-option />
    </div>

    <div class="searchbox-wrapper">
        <Search_Box {endpoint} {queryParam} {params} {fields} {placeholder} on:submit-search/>
    </div>

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