<script>
    'use strict'

    import { onMount } from 'svelte';

    export let endpoint = null;
    export let params = {};

    let query;
    let placeholder;
    let url;

    const init = () => {
        // set local data fields for endpoint, index, search field array, search type, etc
    }

    const search = () => {
        query = query.replace(/ /g, ',');
        url = `${endpoint}?q=${query}`;

        for(let key in params) {
          url = url.concat(`&${key}=${params[key]}`);
        }

        window.location.replace(url);
    }

    onMount(async () => {
        init(); 
    });
</script>

<form>
    <div class="form-group">
      <div class="search-form">
        <input id="searchbox" type="search" bind:value={query} placeholder={placeholder}/>
        <button type="button" on:click|preventDefault={search}>Search</button>
      </div>
  
      <!-- IF input fields is not null (impl input fields vs per search sel fields. OR remove the user selection from this search box (simple index search - user does not specify fields))-->
      <!-- <div class="radio-group">
        {#if multiFieldSearch === false && searchFields.length > 1}
          {#each searchFields as {fieldName, fieldLabel}, index}
            <div class="form-check">
              <input class="form-check-input" type="radio" name="searchField" value="{fieldName}" data-index={index} bind:group={searchField} on:change={onSelectSearchField} data-label id="search-{fieldName}" checked={searchField==fieldName}>
              <label class="form-check-label" for="search-{fieldName}">
                {fieldLabel}
              </label>
            </div>
          {/each}
        {/if}
      </div> -->
    </div>
  </form>
  
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