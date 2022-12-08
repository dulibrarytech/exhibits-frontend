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
 * Media helper functions
 * media_helpers.js
 * 
 * Functions to retrieve data from or provide info about media items 
 */
'use strict' 

import { Settings } from '../config/settings.js';

/**
 * 
 * @param {string} mimeType : The item mime type 
 */
export const getItemTypeForMimeType = (mimeType) => {
    let type = null;
    let types = $Settings.itemTypes;

    console.log("getItemTypeForMimeType mtype in", mimeType)
    console.log("Settings types:", types)

    for(let key in types) {
        console.log("Settings mimeTypes: ", key, types[key])
        if(types[key].includes(mimeType)) {
            type = key;
        }
    }

    if(!type) console.error(`Item type could not be determined. Mime type: ${mimeType}`);

    return type;
}

/**
 * 
 * @param {string} filename : Filename including extension
 */
export const getItemTypeForFileExtension = (filename) => {
    let type = null;
    let extensions = $Settings.fileExtensions;
    let extension = filename.substring( filename.lastIndexOf('.') );
    console.log("Extension from filename:", extension)

    for(let key in extensions) {
        console.log("Settings extensions: ", key, extensions[key])
        if(extensions[key].includes(extension)) {
            type = key;
        }
    }

    if(!type) console.error(`Item type could not be determined. Resource: ${filename}`);

    return type;
}