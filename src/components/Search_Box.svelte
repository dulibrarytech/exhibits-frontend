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
      //let fieldString = Object.keys(fields).toString();
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

  form.form-inline {
    width: 300px;
    float: right;
  }

  .container {
    max-width: unset;
  }
</style>