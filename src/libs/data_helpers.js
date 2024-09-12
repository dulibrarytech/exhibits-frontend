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
 * Data helper functions
 * 
 * data_helpers.js
 */
'use strict' 

import { stripHtml } from "string-strip-html";
import { encode, decode } from 'html-entities';
import randomInteger from 'random-int';

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

/**
 * 
 * 
 * @param {Number} count - int - size of random number array
 * @param {Number} max - int - size of random number array
 * 
 * @returns - random number array of size {count}, random numbers are between 0 and {max}
 */
export const getRandomNumberArray = (count=0, max=0) => {
    let randomNumbers = [];

    if(count < max) {
        let randomInt;

        while(count > 0) {
            randomInt = randomInteger(max);
            
            if(randomNumbers.includes(randomInt) == false) {
                randomNumbers.push(randomInt)
                count--;
            }   
        }
    }

    return randomNumbers;
}

/**
 * 
 */
export const convertPxValuesToEm = (htmlString = "", baseFontSize = 16) => {
    let pattern = /[0-9]+px/g;
    let pixelValues = htmlString.match(pattern);

    if(pixelValues) {
        let numericValue, emValue, emStringValue;
        pixelValues = [...pixelValues];
        
        for(let pixelStringValue of pixelValues) {
            numericValue = parseInt(pixelStringValue.match(/[0-9]+/)[0]);
            emValue = numericValue / baseFontSize;
            emStringValue = emValue.toString() + "em";
            htmlString = htmlString.replace(pixelStringValue, emStringValue)
        }
    }

    return htmlString;
}