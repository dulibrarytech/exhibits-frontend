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

		if(item.text) item.text = stripHtmlTags(data.text);
		else item.text = item.caption || title || "No description available";
	}
</script>

<div class="modal-item-viewer">
	<div class="row">
		<div class="col-lg-8 col-md-9 col-sm-12 media-display-container">
			<Media_Display {item} args={{viewerType: 'interactive'}}/>
		</div>

		<div class="col-lg-4 col-md-3 col-sm-12 text-display-container">
			<div class="text">
				<hr>
				<!-- if title, title -->title
				<hr>
				<br>
				<!-- if date, date -->date
				
				<!-- <Text_Display item={data} {title} /> -->
				<Text_Display {item} />

				<br>
				<!-- if repo item, add bib number -->bib

				<!-- if repo item, add link to ddu/object -->

				<!-- if repo item, add link to ddu/collection-->
			</div>
		</div>
	</div>
</div>

<style>
	.modal-item-viewer {
		height: 100%;
	}

	.modal-item-viewer > .row {
		height: 100%;
	}

	.modal-item-viewer .text {
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

	:global(.modal-item-viewer .media-item) {
		width: 100%;
		height: 100%;

		position: relative;
		/* padding: 30px; */
		background: grey;
	}

	:global(.modal-item-viewer .media-item .caption) {
		color: white;
	}

	:global(.modal-item-viewer .openseadragon-container) {
		height: 100%;
		padding: 0px !important;
		overflow: hidden;
		background: white !important;
	}

	:global(.modal-item-viewer .openseadragon) {
		width: unset;
		height: 100% !important;
	}

	:global(.modal-item-viewer .text-item) {
		max-height: 100%;
    	overflow-y: scroll;
	}

	:global(.modal-item-viewer .text .text-item .text-content) {
		padding-right: 15px;
	}

	:global(.modal-item-viewer .audio-player) {
		background: #616161;
		color: white;
		height: 100%;
		padding: 0 30px;
	}

	:global(.modal-item-viewer .audio-player .audio) {
		position: absolute;
		bottom: 15px;
	}

	:global(.modal-item-viewer .video-player) {
		height: 100%;
		color: white;
		padding: 0 30px;
	}

	:global(.modal-item-viewer .video-player .video) {
		height: 100%;
	}

	:global(.modal-item-viewer .video-player .video *) {
		height: 95%;
	}

	:global(.modal-item-viewer .pdf-viewer) {
		height: 100%;
	}

	:global(.modal-item-viewer .pdf-viewer *) {
		height: 100%;
	}

	:global(.modal-item-viewer .iframe-viewer) {
		height: 100%;
	}

	:global(.modal-item-viewer .iframe-viewer *) {
		height: 100%;
	}
</style>