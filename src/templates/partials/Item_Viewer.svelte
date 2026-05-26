<script>	
  import Media_Display from '../../components/Media_Display.svelte';
	import Item_Link_Display from './Item_Link_Display.svelte';

	import {
		formatStripHtmlTags
	} from '../../libs/format';

	import {
    VIEWER_TYPE, 
  } from '../../config/global-constants';

  export let item = {};
	export let args = {};

	// feature flags
	const USE_IIIF_VIEWER = false;

	// module settings
	const DEFAULT_ITEM_TEXT = "No description available";

	const {
		title: 				title = null,
		description: 	text = DEFAULT_ITEM_TEXT,
		caption: 			caption = null,
		links: 				linkList = null,
		is_iiif_item: isIIIFItem = false,
	} = item;

	let {
		date = null,	
	} = item;

	$: init();

	const init = async () => {

		// format date 
		if(date) date = new Date(date).toLocaleDateString();

		// set viewer type for media display
		if(USE_IIIF_VIEWER && isIIIFItem) {
			args.viewerType = VIEWER_TYPE.IIIF;
		}
		else {
			args.viewerType = VIEWER_TYPE.INTERACTIVE;
		}
	}

	const onLoadMedia = (event) => {}

	const onLoadError = (event) => {}
</script>

<div class="item-viewer">
	<div class="row">
		<div class="col-lg-8 col-md-12 col-sm-12 media-display-container">
			<Media_Display {item} {args} on:load-media={onLoadMedia} on:load-error={onLoadError} />
		</div>

		<div class="col-lg-4 col-md-12 col-sm-12 text-display-container">

			<div class="text">
				{#if title}
					<hr style="margin-top: 0px">
					<div class="title" use:formatStripHtmlTags>{title}</div>
					<hr>
					<br>
				{/if}

				{#if caption}
					<div class="caption" use:formatStripHtmlTags>{caption}</div>
					<br>
					<hr>
				{/if}
				
				{#if text}
					<div class="text-section background-light" tabindex="0">
						<div class="item-text" use:formatStripHtmlTags>{text}</div>
					</div>
				{/if}

				{#if linkList}
					<div class="data-section">
						<Item_Link_Display data={linkList} />
					</div>
				{/if}
			</div>
			
		</div>
	</div>
</div>

<style>
	.title {
		font-size: 1.5em;
		font-weight: bold;
	}

	.date {
		font-size: 0.9em;
	}

	.item-viewer {
		height: 100%;
		background: white;
		overflow: hidden;
	}

	.item-viewer > .row {
		height: 100%;
		background: #F4F2EC;
	}

	.item-viewer .text {
		background: #F4F2EC;
		padding: 30px 15px 30px 30px;
	}

  .media-display-container {
		padding-right: 0px;
		position: relative;
		background: white;
		height: 50vh;
	}

	.text-display-container {
		padding-left: 0;
		height: 48%;
		margin-top: 2%;
		overflow-y: scroll;
	}

    .text {
		position: relative;
	}

	.text-section {
		height: unset;
		max-height: 60%;
		margin-bottom: 50px;
	} 

	.text-section.background-light {
		background-color: hsl(45, 27%, 100%);
		padding: 10px;
		border-radius: 7px;
	}

	.data-section {
		display: inline-grid;
		margin-bottom: 50px;
		position: relative;
		bottom: unset;
	}

	.data-section ul {
		padding-left: 0;
		margin-bottom: 0;
	}

	.data-section li {
		list-style-type: none;
		margin-bottom: 4px;
	}

	:global(.data-section li a) {
		text-decoration: underline;
	}

	:global(.item-viewer .media-item) {
		width: 100%;
		height: 100%;
		position: relative;
		background: white;;
	}

	:global(.item-viewer .media-item .caption) {
		display: none;
	}

	:global(.item-viewer .openseadragon-container) {
		height: 100%;
		padding: 0px !important;
		overflow: hidden;
		background: white !important;
	}

	:global(.item-viewer .openseadragon) {
		width: unset;
	}

	:global(.item-viewer .text-item) {
		max-height: 70%;
	}

	:global(.item-viewer .text .text-item .text-content) {
		padding-right: 15px;
	}

	:global(.item-viewer .audio-player) {
		background: #616161;
		color: white;
		height: 100%;
	}

	:global(.item-viewer .audio-player .audio) {
		position: absolute;
		bottom: 15px;
	}

	:global(.item-viewer .video-player) {
		height: 100%;
		color: white;
		padding: 0 30px;
	}

	:global(.item-viewer .video-player .video) {
		height: 100%;
	}

	:global(.item-viewer .video-player .video *) {
		height: 95%;
	}

	:global(.item-viewer .pdf-viewer) {
		height: 100%;
	}

	:global(.item-viewer .pdf-viewer *) {
		height: 100%;
	}

	:global(.item-viewer .iframe-wrapper) {
		height: 75vh;
	}

	:global(.item-viewer .iframe-wrapper *) {
		height: 100%;
	}

	@media screen and (min-width: 992px) {
		.item-viewer {
			background: darkgray;
		}

		.media-display-container {
			height: 100vh;
		}

		.text-display-container {
			height: 100%;
		}

		.text {
			height: 100%;
			overflow-y: scroll;
		}

		.text-section {
			height: unset;
			overflow-y: scroll; 
		}

		.data-section {
			margin-top: 0;
			margin-top: 50px;
		}
    }
</style>