<script>
	import Item_Link_Display from '../../partials/Item_Link_Display.svelte';

	export let data = {};
	export let links = [];

	import {
		formatStripHtmlTags,
		formatItemDataValue,
	} from '../../../libs/format';

	// item data
	let _itemId;
	let _exhibitId;
	let _itemType;
	let _title;
	let _description;
	let _exhibitTitle;

	$: {
		let {
			itemId,
			exhibitId = null,
			type = null,
			title = "No title data",
			description = "No description available",
			exhibitTitle = "No title available for exhibit",
		} = data;

		_itemId = itemId;
		_exhibitId = exhibitId;
		_itemType = type;
		_title = title;
		_description = description;
		_exhibitTitle = exhibitTitle;
	}
</script>

<div class="item-search-result-data data-display">

  <div class="text">
		<h3 class="title-truncated" use:formatStripHtmlTags={_title}>{_title}</h3> 

		<div class="metadata">
			{#if _itemType}
				<dl>
					<dt class="metadata-label">Type</dt>
					<dd use:formatItemDataValue={_itemType}>{_itemType}</dd> 
				</dl>
			{/if}
		</div>

		<h4>About this Item</h4>
		<div class="description-section">
			<div id="description" class="description description-truncated">
				<p use:formatStripHtmlTags={_description}>{_description}</p>
			</div>
		</div>
	</div>

	<hr>

	<h4>Appears In</h4>
	<div class="exhibit-title" use:formatStripHtmlTags={_exhibitTitle}>{_exhibitTitle}</div>

	<div class="static-links">
		<button class="ui-button-1 du-button-1" on:click={() => {window.open(`/exhibit/${_exhibitId}#${_itemId}`, '_blank')}}>
			<i class="las la-book-open"></i>
			<span>View in Exhibit</span>
			<i class="las la-arrow-right"></i>
		</button>

		<button class="ui-button-1" on:click={() => {window.open(`/exhibit/${_exhibitId}`, '_blank')}}>
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

	.title-truncated {
		text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
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
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
	}

	.static-links {
		margin-top: 30px;
	}
</style>