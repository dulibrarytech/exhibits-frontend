 /**
    Copyright 2022 University of Denver

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.

    You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
    
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
 */

/**
 * Exhibits@du
 *
 * Media helper functions
 * media_helpers.js
 * 
 * Functions to retrieve data from or provide info about media items 
 */
'use strict' 

import { Settings } from '../config/settings.js';
import { Resource } from '../libs/resource';

import {ITEM_TYPE} from '../config/global-constants';

/**
 * Get the image type for a mime type
 * @param {string} mimeType : The item mime type 
 */
export const getItemTypeForMimeType = (mimeType) => {
    let type = null;
    let types = Settings.mimeTypes;

    for(let key in types) {
        if(types[key].includes(mimeType)) {
            type = key;
        }
    }
    if(!type) console.error(`Item type could not be determined. Mime type: ${mimeType}`);

    return type;
}

/**
 * Get the image type by file extension
 * @param {string} filename : Filename including extension
 */
export const getItemTypeForFileExtension = (filename) => {
    let type = null;
    let extensions = Settings.fileExtensions;
    let extension = filename.substring( (filename.lastIndexOf('.')+1) );

    for(let key in extensions) {
        if(extensions[key].includes(extension)) {
            type = key;
        }
    }
    if(!type) console.error(`Item type could not be determined by file extension. Resource uri: ${filename}`);

    return type;
}

/**
 * getExhibitThumbnailUrl
 */
export const getExhibitThumbnailUrl = (exhibit) => {
    let thumbnail = null;
    let  {thumbnail_image=null, hero_image=null} = exhibit;

    if(!thumbnail_image) {
        thumbnail = Resource.getImageDerivativeUrl({
            type: 'crop',
            filename: hero_image || "",
            width: "400",
            height: "400"
        });
    }
    else {
        thumbnail = Resource.getUrl(thumbnail_image);
    }

    return thumbnail;
}

/**
 * getExhibitThumbnailUrl
 */
export const getItemThumbnailUrl = (item) => {
    let thumbnail = null;
    let  {thumbnail_image = null} = item;

    let {thumbnailImageLocation} = Settings;

    const THUMBNAIL_ICON = Settings.thumbnailIcon;
    const THUMBNAIL_PATH = `${thumbnailImageLocation}`;

    if(thumbnail_image) {
        thumbnail = `${THUMBNAIL_PATH}/${thumbnail_image}`;
    }
    else {
        let {item_type = null} = item;

        switch(item_type) {
            case ITEM_TYPE.REPO:
                thumbnail = getRepositoryThumbnailUrl(item) || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.DEFAULT}`;
                break;

            case ITEM_TYPE.IMAGE:
            case ITEM_TYPE.LARGE_IMAGE:
                thumbnail = getImageThumbnailUrl(item) || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.IMAGE}`;
                break;

            case ITEM_TYPE.AUDIO:
                thumbnail = getAudioThumbnailUrl(item) || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.AUDIO}`;
                break;

            case ITEM_TYPE.VIDEO:
                thumbnail = getVideoThumbnailUrl(item) || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.VIDEO}`;
                break;

            case ITEM_TYPE.PDF:
                thumbnail = getPdfThumbnailUrl(item) || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.PDF}`;
                break;

            case ITEM_TYPE.EXTERNAL_SOURCE:
                thumbnail = getExternalThumbnailUrl(item) || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.DEFAULT}`;
                break;

            default:
                console.error(`Invalid item type: ${item_type}`);
                thumbnail = `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.DEFAULT}`;
                break;
        }
    }

    return thumbnail;
}

const getRepositoryThumbnailUrl = (item) => {
    let id = item.url || null;
    return id ? Repository.getItemTNDatastreamUrl(id) : null;
}

const getImageThumbnailUrl = (item) => {
    let id = item.url || null;
    return id ? Resource.getImageThumbnailUrl(id) : null;
}

const getAudioThumbnailUrl = (item) => {
    return null;
}

const getVideoThumbnailUrl = (item) => {
    return null;
}

const getPdfThumbnailUrl = (item) => {
    let id = item.url || null;
    return id ? Resource.getPdfThumbnailUrl(id) : null;
}

const getExternalThumbnailUrl = (item) => {
    return item.url || null;
}