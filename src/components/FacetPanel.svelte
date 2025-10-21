<script>
    'use strict'

    import { createEventDispatcher } from 'svelte';
    import { formatFacetField, formatFacetValue } from '../libs/format';

    export let limitOptions = [];
    export let facetValues = {};

    let limitOptionsDisplay = [];

    const dispatch = createEventDispatcher();

    const init = () => {
        let option = {};
        for(let key in facetValues) {
            option = limitOptions.find((option) => {
                return option.field == key
            })

            if(option) limitOptionsDisplay.push(option);
        }
    }

    const onClickFacet = (event) => {
        let field = event.target.getAttribute('data-facet-field');
        let value = event.target.getAttribute('data-facet-value');
        let label = event.target.getAttribute('data-facet-label');

        dispatch('click-facet', {field, value, label});
    }

    init();
</script>

<div class="facet-panel">
    <h4>Filter Results</h4>

    <div class="facets">
        {#each limitOptionsDisplay as {field, values, label=null}}

            <h6 use:formatFacetField >{field}</h6>
            <ul data-facet-field-label={label} class="nav nav-pills nav-stacked search-result-categories mt">
                {#each values as {value, count, label=null}}
                    {#if facetValues[field].includes(value) || facetValues[field] == "*"}
                        <li><a href on:click|preventDefault={onClickFacet} data-facet-field={field} data-facet-value={value} data-facet-label={label}><span use:formatFacetValue={field} style="pointer-events:none">{label || value}</span><span class="badge">{count}</span></a></li>
                    {/if}
                {/each}
            </ul>

        {/each}
    </div>
</div>

<style>
    .nav {
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
        margin-bottom: 30px;
    }

    .nav-stacked>li {
        float: none;
    }

    .nav>li {
        position: relative;
        display: block;
    }

    .nav-pills>li>a {
        border-radius: 4px;
    }

    .nav>li>a {
        position: relative;
        display: block;
        padding: 5px 15px;
    }

    .nav>li>a:hover {
        text-decoration: none;
        cursor: pointer;
    }

    .facets {
        background-color: #e5e3e1;
        padding: 15px;
        font-size: 1rem;
    }

    .facets > ul li {
        width: 284px;
    }

    .facets h6 {
        margin-top: 0.5rem;
    }

    .search-result-categories>li>a {
        color: #858381;
        font-weight: 400
    }

    .search-result-categories>li>a:hover {
        background-color: #c5c3c1;
        color: #555
    }

    .search-result-categories>li>a>.badge {
        float: right;
    }

    .nav-pills>li>a>.badge {
        margin-left: 3px;
        margin-top: 3px;
    }

    .badge {
        display: inline-block;
        min-width: 10px;
        padding: 3px 7px;
        font-size: 12px;
        font-weight: 700;
        line-height: 1;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        background-color: #777;
        border-radius: 10px;
    }

    .search-result-categories>li>a>.glyphicon {
        margin-right: 5px;
    }

    .search-result-categories>li>a>.badge {
        float: right;
    }
</style>