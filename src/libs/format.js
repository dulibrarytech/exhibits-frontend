'use strict'

import { Settings } from '../config/settings';
import { Cache } from '../libs/cache';

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

