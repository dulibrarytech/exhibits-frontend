<script>
	import { onMount } from 'svelte';
	import Item_Link_Display from '../../partials/Item_Link_Display.svelte';

	export let data = {};
	export let links = [];

	import {
		formatStripHtmlTags
	} from '../../../libs/format';

	const {
		exhibitId,
		title = "No title data",
		description = "No description available",
		isStudentCurated = false,
	} = data;

	let _descriptionTruncated = true;
	let _descriptionSection;
	let _expandDescriptionButton;

	const onClickExpandDescription = (event) => {
		_expandDescriptionButton.innerText = _descriptionTruncated ? "Click to minimize" : "Click to expand";
		_descriptionTruncated = !_descriptionTruncated;
	}

	const checkDescriptionOverflow = () => {
    if (_descriptionSection.scrollHeight > _descriptionSection.clientHeight) {
      _expandDescriptionButton.style.display = 'block';
    } else {
      _expandDescriptionButton.style.display = 'none';
    }
  }

	onMount(() => {
		checkDescriptionOverflow();

		// kludge: the instant onMount() callback occurs, the 'descriptionSection' scroll/client height is still returning 0 value. after timeout, the correct values are returned
		setTimeout(() => {
			checkDescriptionOverflow();
		}, 50)
	});
</script>

<div class="exhibit-search-result-data data-display">
  <div class="text">

		<h3 use:formatStripHtmlTags>{title}</h3>

		<div class="metadata">
			<dl>
				<dt class="metadata-label">Type</dt>
				<dd>{isStudentCurated ? 'Student Curated Exhibit' : 'University Libraries Exhibit'}</dd>
			</dl>
		</div>

		<h4>About this Item</h4>
		<div class="description-section">
			<div id="description" class="description {_descriptionTruncated ? 'description-truncated' : ''}" bind:this={_descriptionSection}>
				<p use:formatStripHtmlTags>{description}</p>
			</div>
			<button id="expandDescription" class="expand-description" on:click={onClickExpandDescription} bind:this={_expandDescriptionButton}>Click to expand</button>
		</div>
		
	</div>

	<hr>

	<div class="static-links">
		<button class="du-button-1-red ui-button-1" on:click={() => {window.open(`/exhibit/${exhibitId}`, '_blank')}}>
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

	.description-section {
		margin-bottom: 10px;
	}

	.description {
		max-height: none;
		/* min-height: 240px; */
	}

	.description-truncated {
		text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
    overflow: hidden;
		max-height: 240px;
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
	.du-button-1-red {
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