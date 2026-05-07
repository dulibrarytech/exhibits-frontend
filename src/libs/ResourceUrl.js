'use strict'

/*
 * ResourceUrl
 * Resource access class
 *
 * Functions to retrieve local resource uris (for accessing resources in local storage directly or via local iiif server)
 */

import { Configuration } from '../config/config';
import { Settings } from '../config/settings';
import * as Logger from './logger.js';
import axios from 'axios';

const VERIFY_IMAGE_WIDTH_ON_RESIZE = true; 

export default class ResourceUrl {

    constructor(exhibitId = null, iiifVersion = "2") {
      this.exhibitId                = exhibitId;
      this.iiifVersion              = iiifVersion;
      this.resourceLocation         = Configuration.resourceLocation;
      this.iiifImageServerUrl       = Configuration.iiifImageServerUrl;
      this.publicImageLocation      = Settings.imageAssetsPath;
      this.itemPlaceholderImages    = Settings.placeholderImage;
      this.exhibitPlaceholderImage  = Settings.exhibitDefaultImage;
    }

    getFileUrl(filename="null") {
      let folder = this.exhibitId ? `${this.exhibitId}/` : "";
      return `${this.resourceLocation}/${folder}${filename}`;
    }

    getItemPlaceholderImageUrl(itemType = null) {
      let url;

      if(!itemType) url = `${this.publicImageLocation}/${this.itemPlaceholderImages['DEFAULT']}`;
      else url = `${this.publicImageLocation}/${this.itemPlaceholderImages[itemType]}`;
      return url;
    }

    getExhibitPlaceholderImageUrl() {
      return `${this.publicImageLocation}/${this.exhibitPlaceholderImage}`;
    }

    getIIIFServiceUrl(filename="null") {
      filename = this.exhibitId ? `${this.exhibitId}__${filename}` : filename;
      return `${this.iiifImageServerUrl}/iiif/2/${filename}`;
    }

    // TODO: getIIIFImageUrl(filename, scale, size)
    async getIIIFImageUrl(filename="null", width=null, height=null, dimensions=null) {
      let url = null;

      // TODO: replace w/h params with "scale" ["min", "max"] and "size" [sizes index] so it always uses a IIIf specified available size for the image (the width test will not be required)
      if(VERIFY_IMAGE_WIDTH_ON_RESIZE && width) {
          try {
              let imageWidth = (await axios.get(this.getIIIFServiceUrl(filename))).data.width;
              if(imageWidth < width) width = imageWidth;
          }
          catch(error) {
              Logger.module().error(`Could not get iiif data for image, file: ${filename} Message: ${error.message}`);
          }
      }
      
      if(!dimensions) {
        dimensions = "full"; // if this.iiifVersion == "3" use "max"
      }
      
      if(width || height) {
        dimensions = `${width || ""},${height || ""}`;
      }
      
      filename = this.exhibitId ? `${this.exhibitId}__${filename}` : filename;
      url = `${this.iiifImageServerUrl}/iiif/2/${filename}/full/${dimensions}/0/default.jpg`;

      return url;
    }

    getAudioPreviewImageUrl(item = {}, width, height) {
      return item.thumbnail || null;
    }

    getVideoPreviewImageUrl(item = {}, width, height) {
      return item.thumbnail || null;
    }

    async getPdfPreviewImageUrl(filename="null", width=null, height=null, page=null) {
      let url = `${ (await this.getIIIFImageUrl(filename, width))}${page ? `?page=${page}` : "" }`;
      return url;
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

      if (!width) width = "";
      if (!height) height = "";
      if (!offsetX) offsetX = "0";
      if (!offsetY) offsetY = "0";

      filename = this.exhibitId ? `${this.exhibitId}__${filename}` : filename;

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
      filename = this.exhibitId ? `${this.exhibitId}__${filename}` : filename;
      return `${this.iiifImageServerUrl}/iiif/2/${filename}/info.json`;
    }
  }