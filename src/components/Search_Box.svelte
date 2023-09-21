<script>
    'use strict'

    import { onMount } from 'svelte';

    export let endpoint = null;
    export let params = {}; // params to append to querystring
    export let fields = [];
    export let placeholder = "";

    let query;
    let url;
    let selectedField;

    const DEFAULT_SEARCH_FIELD = "title";

    const init = () => {
        if(fields.length == 0) fields.push(DEFAULT_SEARCH_FIELD);
    }

    const search = () => {
        url = `${endpoint}`;

        // append the query value from the search box
        let queryString = query.replace(/ /g, ',').toLowerCase().trim();
        url = url.concat(`?q=${queryString}`);

        // append the search fields
        let fieldString = Object.keys(fields).toString(); // test for selected field in dropdown. If present, assign this to fieldString. else, get array keys
        if(fieldString.length > 0) url = url.concat(`&fields=${fieldString}`);

        // append all parameters
        for(let key in params) {
          url = url.concat(`&${key}=${params[key]}`);
        }

        window.location.replace(url);
    }

    const onKeyPress = (event) => {
        // execute search if the search input box is active and the enter key is pressed
        if(document.activeElement.getAttribute('id') == "searchbox" &&
           event.keyCode == 13) {

            event.preventDefault();
            search();
        }
    }

    const onSelectSearchField = () => {};

    const onSelectSearchTermBoolean = () => {};

    onMount(async () => {
        init(); 
    });
</script>

<div class="container">
  <div class="row">
    <div class="col-md-12">
      <form class="form-inline" action="/search" accept-charset="UTF-8" method="get">
        <div class="input-group flex-fill">
          <input class="form-control" id="searchbox" type="search" bind:value={query} {placeholder} aria-label={placeholder}>
          <div class="input-group-append">
            <button type="button" on:click|preventDefault={search} class="btn btn-secondary button" data-disable-with="Search">Search</button>
          </div> 
        </div>
      </form>
    </div>
  </div>
</div>

<svelte:window on:keydown={onKeyPress} />

<style>
  .radio-group {
    display: inline-flex;
  }

  .radio-group .form-check:not(:first-child) {
    margin-left: 2em;
  }

  .form-group {
    border-style: solid;
    border-width: 1px;
    border-color: #e5e3e1;
    border-radius: 3px;
  }

  .search-form >* {
      margin: 0 0 0 0;
  }
</style>