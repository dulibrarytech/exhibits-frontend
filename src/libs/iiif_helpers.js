'use strict'
 
import * as Logger from '../libs/logger.js';
import _ from 'lodash';

export const getImageThumbnailUrl = (manifest) => {
  let thumbnailResource = null;

  // iiif v2
  // if(manifest['@context'] && manifest['@context'].includes("http://iiif.io/api/presentation/2/context.json")) {
  if(manifest.sequences) {
    thumbnailResource = _.get(manifest, ['sequences', 0, 'canvases', 0, 'thumbnail', '@id']);
  }
  // iiif v3
  // if(manifest['@context'] && manifest['@context'].includes("http://iiif.io/api/presentation/3/context.json")) {
  else if(manifest.thumbnail || manifest.items) {   
    thumbnailResource = 
      _.get(manifest, ['thumbnail', 0, 'id']) ||
      _.get(manifest, ['items', 0, 'thumbnail', 0, 'id'])
  }

  return thumbnailResource || null;
}

export const getAudioVideoThumbnailUrl = (manifest) => {
  let thumbnailResource = null;

  // iiif v2
  if(manifest.mediaSequences || manifest.sequences) {
    thumbnailResource = 
      _.get(manifest, ['mediaSequences', 0, 'elements', 0, 'thumbnail']) ||
      _.get(manifest, ['sequences', 0, 'canvases', 0, 'thumbnail']) ||
      _.get(manifest, ['sequences', 0, 'canvases', 0, 'images', 0, 'resource', '@id']) ||
      _.get(manifest, ['sequences', 0, 'canvases', 0, 'images', 0, 'resource', 'id']);
  }
  // iiif v3
  else if(manifest.thumbnail || manifest.items) {   
    thumbnailResource = 
      _.get(manifest, ['thumbnail', 0, 'id']) ||
      _.get(manifest, ['items', 0, 'thumbnail', 0, 'id']) ||
      _.get(manifest, ['items', 0, 'items', 0, 'thumbnail', 0, 'id']);
  }

  return thumbnailResource || null;
}

export const getTextThumbnailUrl = (manifest) => {
  let thumbnailResource = null;

  // iiif v2
  if(manifest.sequences) {
    thumbnailResource = 
      _.get(manifest, ['sequences', 0, 'canvases', 0, 'thumbnail', '@id']) ||
      _.get(manifest, ['sequences', 0, 'canvases', 0, 'thumbnail', 'id']) ||
      _.get(manifest, ['sequences', 0, 'canvases', 0, 'content', 0, 'body', '@id']) ||
      _.get(manifest, ['sequences', 0, 'canvases', 0, 'content', 0, 'body', 'id']);
  }
  // iiif v3
  else if(manifest.thumbnail || manifest.items) {   
    thumbnailResource = 
      _.get(manifest, ['thumbnail', 0, 'id']) ||
      _.get(manifest, ['items', 0, 'thumbnail', 0, 'id']) ||
      _.get(manifest, ['items', 0, 'items', 0, 'thumbnail', 0, 'id']);
  }

  return thumbnailResource || null;
}

export const getImageResourceUrl = (manifest) => {
  let mediaResource = null;

  // iiif v2
  if(manifest.sequences) {
    mediaResource = 
      _.get(manifest, ['sequences', 0, 'canvases', 0, 'images', 0, 'resource', '@id']) ||
      _.get(manifest, ['sequences', 0, 'canvases', 0, 'images', 0, 'resource', 'id']);
  }
  // iiif v3
  else if(manifest.items) {   
    mediaResource = _.get(manifest, ['items', 0, 'items', 0, 'items', 0, 'body', 'id']);
  }

  return mediaResource || null;
}

export const getAudioVideoResourceUrl = (manifest) => {
  let mediaResource = null;

  // iiif v2
  if(manifest.mediaSequences || manifest.sequences) {
    mediaResource = 
      _.get(manifest, ['mediaSequences', 0, 'elements', 0, '@id']) || 
      _.get(manifest, ['mediaSequences', 0, 'elements', 0, 'id']) ||
      _.get(manifest, ['sequences', 0, 'canvases', 0, 'content', 0, 'body', '@id']) ||
      _.get(manifest, ['sequences', 0, 'canvases', 0, 'content', 0, 'body', 'id']);
  }
  // iiif v3
  else if(manifest.items) {   
    mediaResource = 
      _.get(manifest, ['items', 0, 'items', 0, 'items', 0, 'body', 'id']) ||
      _.get(manifest, ['items', 0, 'rendering', 0, 'id']);
  }

  return mediaResource || null;
}

export const getTextResourceUrl = (manifest) => {
  let mediaResource = {};

  if(manifest.sequences) {
    mediaResource = 
      _.get(manifest, ['sequences', 0, 'canvases', 0, 'content', 0, 'body', '@id']) ||
      _.get(manifest, ['sequences', 0, 'canvases', 0, 'content', 0, 'body', 'id']) ||
      _.get(manifest, ['sequences', 0, 'canvases', 0, 'thumbnail', '@id']) ||
      _.get(manifest, ['sequences', 0, 'canvases', 0, 'thumbnail', 'id']);
  }
  // iiif v3
  else if(manifest.items) {   
    mediaResource = 
      _.get(manifest, ['items', 0, 'rendering', 0, 'id']) || 
      _.get(manifest, ['items', 0, 'items', 0, 'items', 0, 'body', 'id']);
  }

  return mediaResource || null;
}