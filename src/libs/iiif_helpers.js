'use strict'
 
import * as Logger from '../libs/logger.js';

export const getImageThumbnailUrl = (manifest) => {
  let url = null;

  try {
    // iiif v2
    if(manifest.sequences) {
      url = manifest.sequences[0].canvases[0].thumbnail || manifest.sequences[0].canvases[0].images[0].resource || null;
    }
    // iiif v3
    else if(manifest.thumbnail || manifest.items) {   
      url = manifest.thumbnail[0] || manifest.items[0].thumbnail || null;
    }
  }
  catch(error) {
    Logger.module().error("Error getting iiif manifest thumbnail url: " + error);
  }

  return url;
}

export const getAudioVideoThumbnailUrl = (manifest) => {
  let url = null;

  // iiif v2
  if(manifest.mediaSequences || manifest.sequences) {
    url = 
    manifest.mediaSequences[0].elements[0].thumbnail || 
    manifest.sequences[0].canvases[0].thumbnail || 
    manifest.sequences[0].canvases[0].images[0].resource || null;
  }
  // iiif v3
  else if(manifest.thumbnail || manifest.items) {   
    url = manifest.thumbnail[0] || manifest.items[0].thumbnail || null;
  }

  return url;
}

export const getTextThumbnailUrl = (manifest) => {
  let url = null;

  if(manifest.sequences) {
    url = manifest.sequences[0].canvases[0].thumbnail || manifest.sequences[0].canvases[0].content[0].body || null;
  }
  // iiif v3
  else if(manifest.thumbnail || manifest.items) {   
    url = manifest.thumbnail[0] || manifest.items[0].thumbnail || null;
  }

  return url;
}

export const getImageResourceUrl = (manifest) => {
  let url = null;

  try {
    // iiif v2
    if(manifest.sequences) {
      url = manifest.sequences[0].canvases[0].images[0].resource;
    }
    // iiif v3
    else if(manifest.items) {   
      url = manifest.items[0].items[0].items[0].body;
    }
  }
  catch(error) {
    Logger.module().error("Error getting iiif manifest resource url: " + error);
  }

  return url;
}

export const getAudioVideoResourceUrl = (manifest) => {
  let url = null;

  try {
    // iiif v2
    if(manifest.mediaSequences || manifest.sequences) {
      mediaResource = manifest.mediaSequences[0].elements[0] || manifest.sequences[0].canvases[0].content[0].body;
    }
    // iiif v3
    else if(manifest.items) {   
      mediaResource = manifest.items[0].items[0].items[0].body;
    }
  }
  catch(error) {
    Logger.module().error("Error getting iiif manifest resource url: " + error);
  }

  return url;
}

export const getTextResourceUrl = (manifest) => {
  let url = null;

   try {
    // iiif v2
    if(manifest.sequences) {
      mediaResource = manifest.sequences[0].canvases[0].content[0].body;
    }
    // iiif v3
    else if(manifest.items) {   
      mediaResource = manifest.items[0].rendering[0] || manifest.items[0].items[0].items[0].body;
    }
  }
  catch(error) {
    Logger.module().error("Error getting iiif manifest resource url: " + error);
  }

  return url;
}