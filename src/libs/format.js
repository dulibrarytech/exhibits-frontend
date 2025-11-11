'use strict'

import { Settings } from '../config/settings';
import { Cache } from '../libs/cache';
import { decodeHtmlEntities } from './data_helpers';
import { getInnerText } from './exhibits_data_helpers';

export const formatStripHtmlTags = (node) => {
    node.innerText = getInnerText(node.innerText);
}

export const formatFacetField = (node) => {
    let field = node.innerText.trim();

    if(field in Settings.facetLabels) {
        node.innerText = Settings.facetLabels[field];
    }
}

export const formatFacetValue = (node, field) => {
    let value = node.innerText.trim();

    if(field == 'is_member_of_exhibit') {
        node.innerText = Cache.getExhibitById(value)?.title || value;
    }
    else if(value in Settings.facetValueLabels) {
        node.innerText = Settings.facetValueLabels[value];
    }
}

export const getFacetFieldLabel = (field) => {
    if(field in Settings.facetLabels) {
        field = Settings.facetLabels[field];
    }
    return field;
}

export const getFacetValueLabel = (value) => {
    if(field in Settings.facetValueLabels) {
        value = Settings.facetValueLabels[value];
    }
    return value;
}

export const formatSearchResultValue = (node, data = {}) => {
    let {result = {}, terms = []} = data;
    let value = decodeHtmlEntities(node.innerHTML);

    // console.log("TEST result after decode entities:", value)

    /* Format all values */
    if(value.length > 0) {
        value = value.replace(/<\/div>/g, " </div>");
        value = value.replace(/<\/span>/g, " </span>");

        value = getInnerText(value)
        value = highlightTerms(terms, value);
    }

    /* Update the exhibit link value to display the exhibit title */
    if(node.classList.contains('exhibit-link')) {
        value = Cache.getExhibitById(result.is_member_of_exhibit)?.title || "";
    }

    /* assign formatted value to the element */
    node.innerHTML = value;
}

/**
 * Add highlight html tags to enclose the terms found in the text body
 * 
 * @param {object} terms  - array of tokenized terms 
 * @param {string} text - the text to add the highlight tags
 * @returns text with highlight tags inserted 
 */
const highlightTerms = (terms, text) => {
    
    let pattern = new RegExp(`${terms.join('|')}`, "gi");

    text = text.replace(pattern, (matched) => {
        return `<span class='text-highlight'>${matched}</span>`;
    });

    return text;
}

