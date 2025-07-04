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
import { getHtmlIdString, stripHtmlTags, sanitizeHtmlString, decodeHtmlEntities, removeHtmlContent } from '../libs/data_helpers';
import { ENTITY_TYPE, ITEM_GRIDS } from '../config/global-constants';

/**
 * Find an item by id
 * @param {string} id - item 'uuid' value
 * @param {Array} items - array of exhibit item data objects
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

// TODO goes right to data helper, then remove this
export const sanitizeHtml = (string = "") => {
    return sanitizeHtmlString(string, {
        allowedTags: Settings.permittedHtmlTags
    });
}

// filterHtmlContent pass in Settings.permittedHtmlInnerTextTags => div,span,p
// replace all incode instances of data_helpers::stripHtmlTags
export const getInnerText = (htmlString = "") => {
    let textString;

    htmlString = removeHtmlContent(htmlString, Settings.permittedHtmlInnerTextTags);
    textString = stripHtmlTags(htmlString);
    textString = textString.trim().replace(/\s{2,}/g, ' ');

    return textString;
}

/**
 * 
 * @param {*} object - exhibit data object
 * 
 * Iterates html-allowed user fields: decodes html entities and sanitizes html string
 * 
 * @returns exhibit with decoded and sanitized fields
 */
export const sanitizeExhibitHtmlFields = (exhibit) => {
    for(let field of Settings.htmlFieldsExhibit) {
        if(exhibit[field]) {
            exhibit[field] = sanitizeHtml(exhibit[field]); // sanitizes all
            exhibit[field] = decodeHtmlEntities(exhibit[field]);
        }
    }   

    return exhibit;
};

/**
 * 
 * @param {*} object - exhibit item data object
 * 
 * Iterates html-allowed user fields: decodes html entities, and sanitizes html string
 *  
 * @returns item with decoded and sanitized fields
 */
export const sanitizeExhibitItemHtmlFields = (item) => {

    for(let field of Settings.htmlFieldsExhibitItem) {
        if(item[field]) {
            item[field] = sanitizeHtml(item[field]); // TODO goes right to data helper, add settings here
            item[field] = decodeHtmlEntities(item[field]);
        }
    } 

    if(item.items) {
        let items = item.items;
        for(let item of items) {
            sanitizeExhibitItemHtmlFields(item);
        }
    }

    return item;
};

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
 * Creates data structure to represent exhibit headings and subitems as sections
 * 
 * @param {Array} items - array of exhibit item data objects
 * 
 * @returns {Array} - array of page section data objects
 */
export const createExhibitPageSections = (items) => {

    let item = {};
    let headings = [];
    let heading = null;
    let subheading = null;
    let sectionStyles = null;

    for(let index in items) {
        item = items[index];
        
        let {type = "", title = null, text = "", uuid = ""}  = item;

        if(type == ENTITY_TYPE.EXHIBIT_HEADING) {
            
            // Push the previous heading, if any, to the heading array before building the current heading
            if(heading) headings.push(heading);

            heading = {
                id: getHtmlIdString(text),
                uuid,
                //text: stripHtmlTags(text),
                text: getInnerText(text),
                subheadings: []
            }

            item.anchorId = heading.id;

            if(item.styles) sectionStyles = item.styles; // use heading styles for current section
        }

        else if(type == ENTITY_TYPE.ITEM || ITEM_GRIDS.includes(type)) {

            // If this item is in a heading section, and it has a title, add a subheading
            if(heading && title) {
                subheading = {
                    id: getHtmlIdString(title),
                    uuid,
                    //text: stripHtmlTags(title)
                    text: getInnerText(title)
                }

                heading.subheadings.push(subheading);
                item.anchorId = subheading.id;
            }

            // Apply heading styles
            let styles = {
                item: item.styles
            }
            if(sectionStyles) {
                styles.heading = sectionStyles;
            }
            item.styles = styles;
        }

        // End case: push current heading to the headings array if this is the last item in the exhibit
        if(parseInt(index) == items.length-1) {
            if(heading) headings.push(heading);
        }
    }

    return headings;
}