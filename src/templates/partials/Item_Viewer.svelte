<script>	
    import Media_Display from '../../components/Media_Display.svelte';
	import Text_Display from '../../components/Text_Display.svelte';

	import {stripHtmlTags} from '../../libs/data_helpers';

    export let item = {};

	let itemType;
	let title;
	let date;

	$: init();

	const init = async () => {
		itemType = item.item_type || undefined;
		title = item.title || null;
		date = item.date || null;

		if(item.text) item.text = stripHtmlTags(item.text);
		else item.text = item.caption || title || "No description available";
	}
</script>

<div class="item-viewer">
	<div class="row">
		<div class="col-lg-8 col-md-9 col-sm-12 media-display-container">
			<Media_Display {item} args={{viewerType: 'interactive'}}/>
		</div>

		<div class="col-lg-4 col-md-3 col-sm-12 text-display-container">
			<div class="text">

				{#if title}<hr><div class="title">{title}</div><hr><br>{/if}

				{#if date}<div class="date">{date}</div><br>{/if}
				
				<!-- <Text_Display item={data} {title} /> -->
				<div class="text-section">
					<Text_Display {item} />
				</div>

				<div class="link-section">
					<!-- if repo item, add bib number -->
					<a href="#">bib number link</a>

					<!-- if repo item, add link to ddu/object -->
					<a href="#">ddu object link</a>

					<!-- if repo item, add link to ddu/collection-->
					<a href="#">ddu collection link</a>
				</div>
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
	}

	.item-viewer > .row {
		height: 100%;
	}

	.item-viewer .text {
		background: #F4F2EC;
		padding: 30px 15px 30px 30px;
	}

    .media-display-container {
		height: 100%;
		padding-right: 0px;
	}

	.text-display-container {
		height: 100%;
		padding-left: 0px;
	}

    .text {
		height: 100%;
	}

	.link-section {
		margin-top: 20px;
		display: inline-grid;
	}

	:global(.item-viewer .media-item) {
		width: 100%;
		height: 100%;

		position: relative;
		/* padding: 30px; */
		background: grey;
	}

	:global(.item-viewer .media-item .caption) {
		color: white;
	}

	:global(.item-viewer .openseadragon-container) {
		height: 100%;
		padding: 0px !important;
		overflow: hidden;
		background: white !important;
	}

	:global(.item-viewer .openseadragon) {
		width: unset;
		height: 100% !important;
	}

	:global(.item-viewer .text-item) {
		max-height: 100%;
    	overflow-y: scroll;
	}

	:global(.item-viewer .text .text-item .text-content) {
		padding-right: 15px;
	}

	:global(.item-viewer .audio-player) {
		background: #616161;
		color: white;
		height: 100%;
		padding: 0 30px;
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
</style>