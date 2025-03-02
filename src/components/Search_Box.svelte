<script>
    'use strict'

    import { onMount } from 'svelte';
    import { removeStopwords } from 'stopword';

    export let endpoint = null;
    export let params = {}; // params to append to querystring
    export let fields = [];
    export let placeholder = "";

    let query;
    let url;

    const DEFAULT_SEARCH_FIELD = "title";

    const init = () => {
      if(fields.length == 0) fields.push(DEFAULT_SEARCH_FIELD);
    }

    const search = () => {
      // parse out the terms enclosed in quotes, include in the query as a phrase
      let quotedTerms = query.match(/"([^"]*)"/gi);
      if(quotedTerms) {
        quotedTerms.forEach(terms => {
          // convert the terms enclosed in quotes from "term1 term2" to term1+term2 url format
            let termPhrase = terms.replace(/"/g, '').replace(/\s/g, '+');
            query = query.replace(terms, termPhrase)
        });
      }

      // remove stop words
      let queryTokens = query.split(/[ ]{1,}/g)
      queryTokens = removeStopwords(queryTokens);

      // create the querystring
      let queryString = queryTokens.toString();
      url = endpoint.concat(`?q=${queryString}`);

      // append the search fields
      let fieldString = fields.toString();
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

    onMount(async () => {
      init(); 
    });
</script>

<div class="search-box">
  <form class="form-inline" action="/search" accept-charset="UTF-8" method="get">
    <div class="input-group flex-fill">
      <input class="form-control" id="searchbox" title="Search" type="search" bind:value={query} {placeholder} aria-label={placeholder}>
      <div class="input-group-append">
        <button type="button" title="Submit Search" on:click|preventDefault={search} class="btn btn-secondary button" data-disable-with="Search">Search</button>
      </div> 
    </div>
  </form>
</div>

<svelte:window on:keydown={onKeyPress} />

<style>
  form.form-inline {
    width: 100%;
  }

  .search-box {
    margin: 0 auto;
    width: 300px;
  }

  .search-box input,
  .search-box button {
    margin: 0;
  }

  @media screen and (min-width: 768px) {
    /* start of landscape/large tablet styles */
    .search-box {
      margin: initial;
      width: 100%;
    }
  }
</style>