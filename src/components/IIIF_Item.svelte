<script>
  import { Settings } from '../config/settings';
  import * as IIIF from '../libs/iiif_helpers';
  import * as Logger from '../libs/logger.js';
  
  import {
    ITEM_TYPE
  } from '../config/global-constants';

  export let item; 
  export let template;
  export let args;

  let { 
    type = null, 
    metadata = {} 
  
  } = args;

  let _manifest = null; 
  $: {
    if(item.media_iiif) init();
  }

  const init = () => {
    item.is_iiif_item = true;

    const {
      manifest: manifestJSON = null,
      image_url: imageUrl = null,

    } = item.media_iiif;

    const {
      thumbnail_url: thumbnailUrl = null,

    } = item.thumbnail_iiif || {};

    if(manifestJSON) {
      try {
        _manifest = JSON.parse(manifestJSON);
        item.media = getManifestResourceUrl(_manifest) || item.media;
        item.thumbnail = thumbnailUrl || getManifestThumbnailUrl(_manifest) || item.thumbnail;

      } catch (error) {
        Logger.module().error("Error parsing IIIF manifest data: " + error);
      }
    }
    else {
      Logger.module().info(`IIIF manifest not found. Item: ${item.uuid}.`);

      if(imageUrl) item.media = imageUrl;
      else Logger.module().info(`IIIF image url not found. Using existing media url for item ${item.uuid}.`);

      if(thumbnailUrl) item.thumbnail = thumbnailUrl;
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

    return mediaResource || null;
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

    return thumbnailResource || null;
  }       
</script>

<div class="iiif-item">
  <!-- verify boolean for content state -->
  <svelte:component this={template} {item} {args} on:click-item on:mount-template-item on:load-error />
</div>

<style>
  .iiif-item {
    height: 100%;
  }
</style>