<script>	
  /*
	 * item viewer template - viewer on left, with sidebar on right for text and link lists, or metadata
	 */
	import { Settings } from '../../../config/settings';
	import Exhibit_Preview from '../../../components/Exhibit_Preview.svelte';
  import Media_Item_Preview from '../../../components/Media_Item_Preview.svelte';
	import Exhibit_Result_Data_Display from './Exhibit_Result_Data_Display.svelte';
	import Item_Result_Data_Display from './Item_Result_Data_Display.svelte';

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
		console.log("test: init search results viewer")
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
			<!-- result preview (media item preview) -->
			<div class="result-preview viewer-section">
				{#if entityType == ENTITY_TYPE.ITEM}
					<Media_Item_Preview {item} args={{isInteractive: false, ...args}} on:load-media on:load-error on:image-loaded />
					<!-- <IIIF_Item {item} template={Media_Item_Preview} args={{isInteractive: false, ...args}} on:image-loaded on:load-error /> -->
				{:else if entityType == ENTITY_TYPE.EXHIBIT}
					<Exhibit_Preview exhibit={item} args={{overlay: false, isThumbnail: false, isInteractive: false}} on:image-loaded on:load-error />
				{/if}
			</div>

		</div>

		<div class="col-lg-4 col-md-12 col-sm-12 text-display-container">
			<!-- result data (metadata, links) -->
			<div class="result-data">
				{#if entityType == ENTITY_TYPE.ITEM}
					<Item_Result_Data_Display data={_displayData} links={_displayLinks} />
				{:else if entityType == ENTITY_TYPE.EXHIBIT}
					<Exhibit_Result_Data_Display data={_displayData} links={_displayLinks} />
				{/if}
			</div>
		</div>
	</div>

	<!-- result advance buttons (previous/next) and current/total results display -->
	<div class="row controls">
		<div class="result-index-select-buttons">
			
			<button id="previousButton" class="ui-button-1 ui-button-1" on:click={onClickPreviousItem} >
				<i class="las la-arrow-left"></i>
				<span>Previous result</span>
			</button>

			<div>N of N results</div>

			<button id="nextButton" class="ui-button-1 ui-button-1" on:click={onClickNextItem} >
				<span>Next result</span>
				<i class="las la-arrow-right"></i>
			</button>

		</div>
	</div>

</div>

<style>
	.viewer {
		background: #F4F2EC;
		height: calc(100% - 75px);
	}

	.controls {
		height: 75px;
		background: var(--theme-dialog-frame-color);
	}

	.search-result-viewer {
		height: 100%;
		background: white;
		overflow: hidden;
		font-size: 1rem;
	}

	.viewer-section {
		padding: 20px 20px 20px 20px;
	}

	:global(.search-result-viewer .data-display h3) {
		font-size: 1.3rem
	}

	:global(.search-result-viewer .data-display h4) {
		font-size: 1.1rem
	}

  .media-display-container {
		position: relative;
		background: white;
		height: 50%;
		background: #928E91;
		display: flex;
    flex-direction: column;
	}

	.text-display-container {
		padding-left: 0px;
		height: 48%;
	}

	.result-index-select-buttons {
		display: flex;
    justify-content: space-between;
		align-items: center;
		margin-top: 20px;
	}

	.result-preview {
		height: 100%;
		display: flex;
    align-items: start;
	}

	:global(.search-result-viewer .item-preview-wrapper) {
		height: 100%;
    overflow: hidden;
	}

	.result-data {
		padding: 20px;
		height: 100%;
		overflow: auto;
	}

	.title {
		font-size: 1.5em;
		font-weight: bold;
	}

	.date {
		font-size: 0.9em;
	}

	.ui-button-1 {
		padding: 1em 2em;
    font-size: 1em;
		border-radius: 5px;
		display: flex;
    align-items: center;
		margin: 0 0 10px 0;
		column-gap: 20px;
	}

	.ui-button-1 i {
		font-size: 1.65em;
		position: relative;
    top: 1px;
		font-weight: bold;
	}

	@media screen and (min-width: 992px) {
		.search-result-viewer {
			background: darkgray;
		}

		.viewer-section {
			padding: 20px 20px 20px 20px;
		}

		.media-display-container {
			height: 100%;
			padding-right: 0;
		}

		.text-display-container {
			height: 100%;
		}
  }
</style>