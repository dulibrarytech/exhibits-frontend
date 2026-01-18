<script>	
  import Media_Display from '../../components/Media_Display.svelte';
	import {formatStripHtmlTags} from '../../libs/format';

    export let item = {};

	const DEFAULT_ITEM_TEXT = "No description available";

	let itemType;
	let itemData;
	let title;
	let text;
	let date;
	let caption;

	$: init();

	const init = async () => {
		itemType = 	item.item_type || undefined;
		itemData = 	item.data_display || null;
		title = 		item.title || null;
		text = 			item.description || DEFAULT_ITEM_TEXT;
		date = 			item.date || null;
		caption = 	item.caption || null;

		if(date) date = new Date(date).toLocaleDateString();
	}

	const onLoadMedia = (event) => {}

	const onLoadError = (event) => {}
</script>

<div class="item-viewer">
	<div class="row">
		<div class="col-lg-8 col-md-12 col-sm-12 media-display-container">
			<Media_Display {item} args={{viewerType: 'interactive'}} on:load-media={onLoadMedia} on:load-error={onLoadError} />
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
				
				<div class="text-section background-light" tabindex="0">
					<div class="item-text" use:formatStripHtmlTags>{text}</div>
				</div>

				{#if itemData}
					<div class="data-section">
						<ul>
							{#each itemData as {label = null, value = 'unset'}}
								<li>{#if label}{label}:{/if}{@html value}</li>
							{/each}
						</ul>
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
		height: 100%;
		padding-right: 0px;
		position: relative;
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

	.media-display-container {
		height: 50%;
	}

	:global(.data-section li a) {
		text-decoration: underline;
	}

	:global(.item-viewer .media-item) {
		width: 100%;
		height: 100%;
		position: relative;
		background: grey;
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

	:global(.item-viewer .iframe-viewer) {
		height: 100%;
	}

	:global(.item-viewer .iframe-viewer *) {
		height: 100%;
	}

	@media screen and (min-width: 992px) {
		.item-viewer {
			background: darkgray;
		}

		.media-display-container {
			height: 100%;
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