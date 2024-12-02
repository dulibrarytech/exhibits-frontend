'use strict'

/*
 * Create uris to local file storage locations
 */

import { Configuration } from '../config/config';
import { Settings } from '../config/settings';
import { Kaltura } from './kaltura';

export default class ResourceUrl {

    constructor(exhibitId = null) {
      this.exhibitId = exhibitId;
      this.exhibitFolderDelimiter = "__";

      this.resourceLocation = Configuration.resourceLocation;
      this.iiifImageServerUrl = Configuration.iiifImageServerUrl;
      this.itemPlaceholderImages = Settings.placeholderImage;
      this.exhibitPlaceholderImage = Settings.exhibitDefaultImage;
    }

    getFileUrl(filename="null") {
      let folder = this.exhibitId ? `${this.exhibitId}/` : "";
      return `${this.resourceLocation}/${folder}${filename}`;
    }

    getItemPlaceholderImageUrl(itemType = "") {
      return `${this.resourceLocation}/${this.itemPlaceholderImages[itemType]}`;
    }

    getExhibitPlaceholderImageUrl() {
      return `${this.resourceLocation}/${this.exhibitPlaceholderImage}`;
    }

    getIIIFImageUrl(filename="null", width=null, height=null) {
      let dimensions = "full";
      if(width || height) {
          dimensions = `${width || ""},${height || ""}`;
      }

      filename = this.exhibitId ? `${this.exhibitId}${this.exhibitFolderDelimiter}${filename}` : filename;
      return `${this.iiifImageServerUrl}/iiif/2/${filename}/full/${dimensions}/0/default.jpg`;
    }

    getAudioPreviewImageUrl(item = {}, width, height) {
      let url = null;
      let {kaltura_id = null} = item;

      if(kaltura_id) {
          url = Kaltura.getThumbnailUrl(kaltura_id);
      }

      return url;
    }

    getVideoPreviewImageUrl(item = {}, width, height) {
      let url = null;
      let {kaltura_id = null} = item;

      if(kaltura_id) {
          url = Kaltura.getThumbnailUrl(kaltura_id);
      }

      return url;
    }

    getPdfPreviewImageUrl(filename="null", width=null, height=null) {
      return this.getIIIFImageUrl(filename, width, height);
    }

    getImageDerivativeUrl = (filename="null", args) => {
      let url;

      let {
          type="resize", 
          width="", 
          height="",
          offsetX="0",
          offsetY="0"

      } = args;

      filename = this.exhibitId ? `${this.exhibitId}${this.exhibitFolderDelimiter}${filename}` : filename;

      switch(type) {
          case 'resize':
              url = `${this.iiifImageServerUrl}/iiif/2/${filename}/full/${width},${height}/0/default.jpg`;
              break;

          case 'crop':
              url = `${this.iiifImageServerUrl}/iiif/2/${filename}/${offsetX},${offsetY},${width},${height}/max/0/default.jpg`
      }
      return url;
    }

    getImageTileSourceUrl (filename="null") {
      filename = this.exhibitId ? `${this.exhibitId}${this.exhibitFolderDelimiter}${filename}` : filename;
      return `${this.iiifImageServerUrl}/iiif/2/${filename}/info.json`;
    }
  }