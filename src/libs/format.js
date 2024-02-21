'use strict'

import { Settings } from '../config/settings';
import { Cache } from '../libs/cache';
import { stripHtmlTags } from '../libs/data_helpers';

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

export const formatSearchResultValue = (node, data = {}) => {
    let {result = {}, terms = []} = data;
    let value = node.innerHTML;

    /* Format all values */
    if(value.length > 0) {
        value = stripHtmlTags(value)
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
    let pattern, matches;
    let updatedText = text;
     
    terms.forEach((term) => {
        pattern = new RegExp(`${term}`, "gi");
        matches = text.match(pattern);

        if(matches) {
            let highlightedText = "";
            
            matches.forEach((matchText) => {
                highlightedText = `<span class="text-highlight">${matchText}</span>`;
                updatedText = updatedText.replace(matchText, highlightedText);
            });
        }
    });

    return updatedText;
}

