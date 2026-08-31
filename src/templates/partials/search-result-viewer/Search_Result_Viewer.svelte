<script>	
  /*
	 * item viewer template - viewer on left, with sidebar on right for text and link lists, or metadata
	 */
	import { Settings } from '../../../config/settings';
	import Exhibit_Preview from '../../../components/Exhibit_Preview.svelte';
  import Media_Item_Preview from '../../../components/Media_Item_Preview.svelte';
	// import IIIF_Item from '../../../components/IIIF_Item.svelte';
	import Exhibit_Result_Data_Display from './Exhibit_Result_Data_Display.svelte';
	import Item_Result_Data_Display from './Item_Result_Data_Display.svelte';

	import {
		formatStripHtmlTags
	} from '../../../libs/format';

	import { 
    getDisplayLinks 
  } from '../../../libs/exhibits_data_helpers';

	import { 
    ENTITY_TYPE, 
	} from '../../../config/global-constants';

  export let item = {}; // the result
	export let args = {};

	const {
			searchResultDisplayLinks,
			searchResultDisplayLinksRepositoryItem
  } = Settings.links;

	// module settings
	const DEFAULT_ITEM_DESCRIPTION = "No description available";

	const {
		type:									entityType = ENTITY_TYPE.ITEM,
		media_iiif: 					mediaIIIF = null,
	} = item;

	const {
		totalResults,
		resultIndex,
	} = args;

	let _displayData;
	let _displayLinks;

	$: init();

	const init = async () => {
		_displayData = getDisplayData(entityType);
		_displayLinks = getDisplayLinkList(entityType);
	}

	/**
	 * getDisplayData - builds the display data object for the result display template
	 * 
	 * @param {string} entityType - ["exhibit" | "item"]
	 * @returns {object} data - the object containing the view data 
	 */
	const getDisplayData = (entityType) => {
		let data = {};

		if(entityType == ENTITY_TYPE.ITEM) {

			const {
				uuid:									itemId,
				is_member_of_exhibit:	exhibitId,
				item_type:						itemType,
		    title: 								title = null,
				media_name:						mediaName = null,
				description: 					description = null,
				caption: 							caption = null,
				parent_exhibit_title: parentExhibitTitle = null,
		    date:         				resultDate = null,
			} = item;
			
			data = {
				type:					itemType || null,
				title: 				mediaName || title || null,	
				description:	description || caption || DEFAULT_ITEM_DESCRIPTION,
				exhibitTitle:	parentExhibitTitle || null,
				exhibitId:		exhibitId,
				itemId:				itemId,
			}
		}

		else if(entityType == ENTITY_TYPE.EXHIBIT) {

			const {
				uuid:									exhibitId,
		    title: 								title = null,
				media_name:						mediaName = null,
				description: 					description = null,
				is_student_curated:		isStudentCurated = null,
			} = item;

			data = {
				title: 				title || mediaName || null,	
				description:	description || DEFAULT_ITEM_DESCRIPTION,
				exhibitId:		exhibitId,
				isStudentCurated: isStudentCurated || 0,
			}
		}

		return data;
	}

	/**
	 * getDisplayLinkList - creates a link for each link defined in settings
	 * 
	 * @param {string} entityType - ["exhibit" | "item"]
	 * @returns {array} links - array of view data objects to render the link display
	 */
	const getDisplayLinkList = (entityType) => {
		let links = [];

		if(entityType == ENTITY_TYPE.ITEM) {
			const {
				repository_data:			repositoryData = null,	
			} = item;

			links = getDisplayLinks(item, searchResultDisplayLinks);
			if(repositoryData) {
        links = links.concat( getDisplayLinks(repositoryData, searchResultDisplayLinksRepositoryItem) );
      }
		}

		else if(entityType == ENTITY_TYPE.EXHIBIT) {}

		return links;
	}

	// called on 'image-loaded', both MIP and EP
	const onLoadMedia = (event) => {}

	// called on 'load-error', both MIP and EP
	const onLoadError = (event) => {}

	// update any displays here
	// dispatch event for Search to catch
	const onClickPreviousItem = (event) => {} 

	// update any displays here
	// dispatch event for Search to catch
	const onClickNextItem = (event) => {}
</script>

<div class="search-result-viewer">

	<!-- preview, sidebar content -->
	<div class="row viewer">
		<div class="col-lg-8 col-md-12 col-sm-12 media-display-container">

			<div class="result-preview">
				{#if entityType == ENTITY_TYPE.ITEM}
					<Media_Item_Preview {item} args={{isInteractive: false, ...args}} on:load-media on:load-error on:image-loaded />
					<!-- <IIIF_Item {item} template={Media_Item_Preview} args={{isInteractive: false, ...args}} on:image-loaded on:load-error /> -->
				{:else if entityType == ENTITY_TYPE.EXHIBIT}
					<Exhibit_Preview exhibit={item} args={{overlay: false, isThumbnail: false, isInteractive: false}} on:image-loaded on:load-error />
				{/if}
			</div>

		</div>

		<div class="col-lg-4 col-md-12 col-sm-12 text-display-container">
			
			<div class="result-data">
				{#if entityType == ENTITY_TYPE.ITEM}
					<Item_Result_Data_Display data={_displayData} links={_displayLinks} />
				{:else if entityType == ENTITY_TYPE.EXHIBIT}
					<Exhibit_Result_Data_Display data={_displayData} links={_displayLinks} />
				{/if}
			</div>

		</div>
	</div>

	<!-- result advance buttons -->
	<div class="row controls">
		<div class="col-lg-12 col-md-12 col-sm-12 result-index-select-buttons">
			previous/next buttons
		</div>
	</div>

</div>

<style>
	.viewer {
		height: calc(100% - 75px);
	}

	.controls {
		height: 75px;
	}

	.search-result-viewer {
		height: 100%;
		background: white;
		overflow: hidden;
		font-size: 1rem;
	}

	:global(.search-result-viewer .data-display h3) {
		font-size: 1.3rem
	}

	:global(.search-result-viewer .data-display h4) {
		font-size: 1.1rem
	}

	.search-result-viewer > .row {
		background: #F4F2EC;
	}

  .media-display-container {
		padding: 0px;
		position: relative;
		background: white;
		height: 50%;
		background: #928E91;
	}

	.text-display-container {
		padding-left: 0px;
		height: 48%;
		margin-top: 2%;
		overflow-y: scroll;
	}

	.result-index-select-buttons {
		background: var(--theme-dialog-frame-color);
		padding: 15px;
	}

	.result-preview {
		height: 100%;
		overflow: hidden;
		display: flex;
    align-items: start;
	}

	.result-data {
		padding: 0 30px;
		height: 100%;
	}

	.title {
		font-size: 1.5em;
		font-weight: bold;
	}

	.date {
		font-size: 0.9em;
	}

	@media screen and (min-width: 992px) {
		.search-result-viewer {
			background: darkgray;
		}

		.media-display-container {
			height: 100%;
			padding: 20px 20px 20px 30px;
		}

		.text-display-container {
			height: 100%;
		}
  }
</style>