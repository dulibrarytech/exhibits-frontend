<script>
	import Item_Link_Display from '../../partials/Item_Link_Display.svelte';

	export let data = {};
	export let links = [];

	import {
		formatStripHtmlTags
	} from '../../../libs/format';

	// item data
	let _exhibitId;
	let _title;
	let _description;
	let _isStudentCurated;

	$: {
		let {
			exhibitId,
			title = "No title data",
			description = "No description available",
			isStudentCurated = false,
		} = data;

		_exhibitId = exhibitId;
		_title = title;
		_description = description;
		_isStudentCurated = isStudentCurated;
	}
</script>

<div class="exhibit-search-result-data data-display">

  <div class="text">
		<h3 class="title-truncated" use:formatStripHtmlTags={_title}>{_title}</h3>

		<div class="metadata">
			<dl>
				<dt class="metadata-label">Type</dt>
				<dd>{_isStudentCurated ? 'Student Curated Exhibit' : 'University Libraries Exhibit'}</dd>
			</dl>
		</div>

		<h4>About this Item</h4>
		<div class="description-section">
			<div id="description" class="description description-truncated">
				<p use:formatStripHtmlTags={_description}>{_description}</p>
			</div>
		</div>
	</div>

	<hr>

	<div class="static-links">
		<button class="ui-button-1 du-button-1" on:click={() => {window.open(`/exhibit/${_exhibitId}`, '_blank')}}>
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

	.title-truncated {
		text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
	}

	.description-section {
		margin-bottom: 10px;
	}

	.description {
		max-height: none;
	}

	.description-truncated {
		text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 6;
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
</style>