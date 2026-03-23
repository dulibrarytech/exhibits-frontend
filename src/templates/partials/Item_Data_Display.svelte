<script>
  import { sanitizeHtmlString } from "../../libs/data_helpers";

  export let data = {};
  
  for (const [key, value] of Object.entries(data)) {
    if(typeof value === "string") {
      data[key] = sanitizeHtmlString(value);
    }
  }
</script>

<div class="item-data-display">
  <ul>
    {#each data as {label = null, linkTo = '#', linkText = ""}}
      <li>
        {#if label}<strong>{label}:</strong>{/if} 
        {#if linkText}<a href="{linkTo}" target="_blank">{linkText}</a>{/if}
      </li>
    {/each}
  </ul>
</div>

<style>
  .item-data-display ul {
    list-style-type: none;
    padding: 0;
  }

  .item-data-display ul li {
    margin-bottom: 0.5em;
  }
</style>