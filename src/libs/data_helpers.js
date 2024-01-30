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
import { stripHtml } from "string-strip-html";
import { encode, decode } from 'html-entities';

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
 * Strips all html tags - Preserves inner content
 * 
 * @param {string} string : a string
 * @param {allowedTags} object : array of tag names to retain in the string
 * 
 * @returns the string with html tags removed
 */
export const stripHtmlTags = (string) => {
    return string ? stripHtml(string).result : string;
}

/**
 * Permits non reactive html tags - Removes 'script' and other reactive tags
 * see https://github.com/apostrophecms/sanitize-html: sanitizeHtml() for list of allowed tags
 * 
 * @param {string} string : a string
 * 
 * @returns the string with html tags removed
 */
export const sanitizeHtmlString = (string) => {
    //return sanitizeHtml(string) // TODO why is this stripping style attributes?
    return string.replace(/<script>(.*?)<\/script>/g, "");
}

/**
 * Converts html entities to html elements
 * @param {string} string : a string with entities
 * 
 * @returns the string with html entities converted to elements
 */
export const decodeHtmlEntities = (string) => {
    return decode(string);
}

/**
 * Converts html elements to html entities
 * @param {string} string : a string with html elements
 * 
 * @returns the string with html elements converted to entities
 */
export const encodeHtmlEntitles = (string) => {
    return encode(string);
}

/**
 * Removes all html tags and inner content
 * @param {string} string : a string
 * 
 * @returns the string with html tags removed
 */
export const stripDisallowedHtmlContent = (string) => {
    //return string ? string.replace(/<.+>(.*?)<\/.+>/gi, "") : null;

    return sanitizeHtml( decode(string), {
        allowedTags: Settings.allowedTags
    });
}

/**
 * Removes curly braces, square brackets, colon, and greater/less than characters
 * Disables any object/array structures in a url
 * 
 * @param {string} string : a string
 * 
 * @returns the string with html tags/content and object characters removed
 */
export const stripHtmlAndObjectCharacters = (string) => {
    return stripHtmlTags(string).replace(/[{}\[\]:<>]/gi, "");
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

/**
 * Creates an html element id string
 * Converts all characters to lowercase, replaces spaces with '-' character, removes all non alphanumeric characters
 * 
 * @param {string} string - the string to convert to id string format
 * @returns - converted string
 */
export const getHtmlIdString = (string) => {
    return string.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]*/g, "").toLowerCase();
}

/**
 * 
 * @param {*} object - any object
 * 
 * Iterates object keys and decodes entities, and sanitizes html 
 * 
 * @returns false
 */
export const sanitizeObjectData = (object) => {
    Object.keys(object).forEach(function(key, index) {

        if(typeof object[key] == 'string') {
            object[key] = sanitizeHtmlString( decodeHtmlEntities(object[key]) );
        }
        else if(typeof object[key] == 'object') {
            sanitizeObjectData(object[key]); // object/array of objects
        }
    });

    return object;
}