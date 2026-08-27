<script>
  import { sanitizeHtmlString } from "../../libs/data_helpers";

  export let links = {};
  
  for (const [key, value] of Object.entries(links)) {
    console.log("test A: key/value:", key, value)
    if(typeof value === "string") {
      links[key] = sanitizeHtmlString(value);
    }
  }
</script>

<div class="item-link-display">
  <ul>
    {#each links as {label = null, linkTo = '#', linkText = ""}}
      <li>
        {#if label}<strong>{label}:</strong>{/if} 
        {#if linkText}<a href="{linkTo}" target="_blank">{linkText}</a>{/if}
      </li>
    {/each}
  </ul>
</div>

<style>
  .item-link-display ul {
    list-style-type: none;
    padding: 0;
  }

  .item-link-display ul li {
    margin-bottom: 0.5em;
  }
</style>