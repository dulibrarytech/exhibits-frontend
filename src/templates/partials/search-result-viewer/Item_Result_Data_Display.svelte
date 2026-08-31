<script>
	import { onMount } from 'svelte';
	import Item_Link_Display from '../../partials/Item_Link_Display.svelte';

	export let data = {};
	export let links = [];

	import {
		formatStripHtmlTags,
		formatDataValue,
	} from '../../../libs/format';

	const {
		itemId,
		exhibitId = null,
		type = null,
		title = "No title data",
		description = "No description available",
		exhibitTitle = "No title available for exhibit",
	} = data;

	let descriptionTruncated = true;

	const onClickExpandDescription = (event) => {
		document.querySelector(".expand-description").innerText = descriptionTruncated ? "Click to minimize" : "Click to expand";
		descriptionTruncated = !descriptionTruncated;
	}

	const checkDescriptionOverflow = () => {
		const descriptionSection = document.getElementById("description");
		const expandDescriptionButton = document.getElementById("expandDescription");

    if (descriptionSection.scrollHeight > descriptionSection.clientHeight) {
      expandDescriptionButton.style.display = 'block';
    } else {
      expandDescriptionButton.style.display = 'none';
    }
  }

	onMount(() => {
		checkDescriptionOverflow();
	});
</script>

<div class="item-search-result-data data-display">
  <div class="text">

		<h3 use:formatStripHtmlTags>{title}</h3> 

		<div class="metadata">
			{#if type}
				<dl>
					<dt class="metadata-label">Type</dt>
					<dd use:formatDataValue>{type}</dd> <!-- use:formatDataValue -->
				</dl>
			{/if}
		</div>

		<h4>About this Item</h4>
		<div class="description-section">
			<div id="description" class="description {descriptionTruncated ? 'description-truncated' : ''}">
				<p use:formatStripHtmlTags>{description}</p>
			</div>
			<button id="expandDescription" class="expand-description" on:click={onClickExpandDescription}>Click to expand</button>
		</div>
		
	</div>

	<hr>

	<h4>Appears In</h4>
	<div class="exhibit-title">{exhibitTitle}</div>

	<div class="static-links">
		<button class="du-button-1 ui-button-1" on:click={() => {window.open(`/exhibit/${exhibitId}#${itemId}`, '_blank')}}>
			<i class="las la-book-open"></i>
			<span>View in Exhibit</span>
			<i class="las la-arrow-right"></i>
		</button>

		<button class="du-button-1 ui-button-1" on:click={() => {window.open(`/exhibit/${exhibitId}`, '_blank')}}>
			<i class="las la-book-open"></i>
			<span>Explore Exhibit</span>
			<i class="las la-arrow-right"></i>
		</button>
	</div>

	{#if links && links.length > 0}
		<div class="dynamic-links">
			<Item_Link_Display links={links} />
		</div>
	{/if}

</div>

<style>
  h3, h4 {
		text-transform: uppercase;
		font-weight: bolder;
	}

	dl {
		display: inline-flex;
	}

	.exhibit-search-result-data {
		height: 100%;
		overflow-y: auto;
	}

	.text {
		overflow: hidden;
	}

	.metadata {
		margin-top: 20px;
	}

	.metadata dl dd {
		margin-left: 20px;
	}

	.metadata-label::after {
		content: ':';
	}

	.exhibit-title {
		font-weight: bold;
	}

	.description-section {
		margin-bottom: 10px;
	}

	.description {
		max-height: none;
		min-height: 240px;
	}

	.description-truncated {
		text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
	}

	button.expand-description {
		border: none;
    background: initial;
    margin: 10px 0 0 0;
    padding: 0;
    font-size: 0.8rem;
    color: blue;
    text-decoration: underline;
	}

	.static-links {
		margin-top: 30px;
	}

	/* to global.css */
	.du-button-1 {
		background: #7C0A02;
    color: white;
	}

	.ui-button-1 {
		padding: 1em 2em;
    font-size: 1em;
		border-radius: 5px;
		display: flex;
    align-items: center;
		margin: 0 0 10px 0;
	}

	.ui-button-1 > *:not(:last-child) {
		margin-right: 0.6em;

	}

	.ui-button-1 i {
		font-size: 1.65em;
	}
</style>