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
import * as Logger from './logger.js';

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
    if(!type) Logger.module().error(`Item type could not be determined. Mime type: ${mimeType}`);

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
    if(!type) Logger.module().error(`Item type could not be determined by file extension. Resource uri: ${filename}`);

    return type;
}

/**
 * Get the file extension
 * @param {string} filename : Filename including extension
 */
export const getFileExtension = (filename) => {
    return filename.substring( filename.lastIndexOf('.')+1 );
}