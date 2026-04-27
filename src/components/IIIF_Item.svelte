<script>
  import * as IIIF from '../libs/iiif_helpers';
  import * as Logger from '../libs/logger.js';
  
  import {
    ITEM_TYPE
  } from '../config/global-constants';

  export let item; 
  export let template;
  export let args;

  const VIEWER_METADATA = { // TODO move to settings? (data layer)
    title: "title"
  }

  let { 
    type = null, 
    metadata = {} 
  
  } = args;

  let _manifest = null; 
  let _viewerMetadata = {};

  $: {
    init();
  }

  const init = () => {
    console.log("test: init iiif item", item)

    if(item.manifest && typeof item.manifest == 'string') {
      _manifest = JSON.parse(item.manifest);

      item.media = getManifestResourceUrl(_manifest) || "";
      item.thumbnail = getManifestThumbnailUrl(_manifest) || "";

      item.is_iiif_item = true;

      /* Add metadata fields to viewer metadata display NOT YET IMPL. */
      for(let field in VIEWER_METADATA) {
        if(metadata[ VIEWER_METADATA[field] ]) _viewerMetadata[ field ] = metadata[ VIEWER_METADATA[field] ];
      }
    }
    else {
      Logger.module().error(`Item IIIF manifest is missing, or is not of expected format (expected JSON string). Item: ${item.uuid}`);
    }
  }

  const getManifestResourceUrl = (manifest) => {
    const itemType = item[ Settings.exhibitItemDataFields.ITEM_TYPE ] || "undefined";

    let mediaResource;
    if(itemType == ITEM_TYPE.IMAGE || itemType == ITEM_TYPE.LARGE_IMAGE) {
      mediaResource = IIIF.getImageResourceUrl(manifest);
    }
    else if(itemType == ITEM_TYPE.AUDIO || itemType == ITEM_TYPE.VIDEO) {
      mediaResource = IIIF.getAudioVideoResourceUrl(manifest);
    }
    else if(itemType == ITEM_TYPE.PDF) {
      mediaResource = IIIF.getTextResourceUrl(manifest);
    }

    return mediaResource['@id'] || mediaResource.id || null;
  }

  const getManifestThumbnailUrl = (manifest) => {
    const itemType = item[ Settings.exhibitItemDataFields.ITEM_TYPE ] || "undefined";

    let thumbnailResource;
    if(itemType == ITEM_TYPE.IMAGE || itemType == ITEM_TYPE.LARGE_IMAGE) {
      thumbnailResource = IIIF.getImageThumbnailUrl(manifest);
    }
    else if(itemType == ITEM_TYPE.AUDIO || itemType == ITEM_TYPE.VIDEO) {
      thumbnailResource = IIIF.getAudioVideoThumbnailUrl(manifest);
    }
    else if(itemType == ITEM_TYPE.PDF) {
      thumbnailResource = IIIF.getTextThumbnailUrl(manifest);
    }

    return thumbnailResource['@id'] || thumbnailResource.id || null;
  }       
</script>

<div class="iiif-item">
  <!-- verify boolean for content state -->
  <svelte:component this={template} {item} {args} on:click-item on:mount-template-item on:load-error />
</div>