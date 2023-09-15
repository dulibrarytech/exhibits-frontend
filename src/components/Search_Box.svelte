<script>
    'use strict'

    import { onMount } from 'svelte';

    export let endpoint = null;
    export let params = {};
    export let placeholder = "";

    let query;
    let url;

    const init = () => {
        // set local data fields for endpoint, index, search field array, search type, etc
    }

    const search = () => {
        let queryValue = query.replace(/ /g, ',').toLowerCase().trim();
        url = `${endpoint}?q=${queryValue}`;

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