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
 * Data helper functions
 * data_helpers.js
 * 
 * Functions to provide data manipulation
 */
'use strict' 

import { Settings } from '../config/settings.js';

import sanitizeHtml from 'sanitize-html';

/**
 * Find an item by id
 * @param {string} id - item 'uuid' value
 * 
 * @returns {object} item - item with uuid matching the input id
 */
export const getItemById = (id, items) => {
    let item = null, gridItem = null;

    /* find if an item uuid matches id */
    item = items.find((item) => {

        /* look if the item contains an 'items' array. If it does, see if any items in the array have a uuid which matches id */
        gridItem = item.items?.find((childItem) => {
            return childItem.uuid == id;
        })

        return item?.uuid == id || gridItem?.uuid == id;
    });
    
    return gridItem || item;
}

/**
 * Removes all html tags and inner content
 * @param {string} string : a string
 * 
 * @returns the string with html tags removed
 */
export const stripDisallowedHtmlContent = (string) => {
    return sanitizeHtml( decode(string), {
        allowedTags: Settings.allowedTags
    });
}

/**
 * Iterates a style object and removes any invalid style properties
 * Accepted properties are defined in settings.userThemeStyles
 * 
 * @param {object} styles - user theme style object
 * 
 * @returns {object} styles - the styles object with all unrecognized styles removed
 */
export const validateUserThemeStyles = (styles) => {
    for(let style in styles) {
        if(Settings.userThemeStyles.includes(style) === false) delete styles[style];
    }

    return styles;
}