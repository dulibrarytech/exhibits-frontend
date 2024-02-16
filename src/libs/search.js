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
 * Search module
 * search.js
 */

'use strict'

import { ENTITY_TYPE } from '../config/global-constants.js';
import { Index } from './index.js';

export const Search = (() => {
    /**
     * search()
     * 
     * @param {string} [terms = ""] - search terms (csv string)
     * @param {string} [exhibitId = ""] - exhibit id. search will be scoped to the items in this exhibit
     * 
     * @returns 
     */
    const execute = async (data) => {
        let limitOptions = [];

        let {
            terms = [],
            boolean = 'AND',
            fields = [],
            facets = null,
            page = 1,
            exhibitId = null

        } = data

        /* get facet query data */
        if(Object.keys(facets).length > 0) {
            let converted = {};
            
            for(let {field, value} of facets) {
                if(field in converted == false) converted[field] = [];
                converted[field].push(value);
            }
            facets = converted;
        }
        else {
            facets = null;
        }

        /* execute the index search */
        let {results = [], aggregations = [], resultCount = null} = await Index.searchIndex({terms, boolean, fields, facets, page}, exhibitId);

        /* get result limiter options from results aggs */
        for(let field in aggregations) {
            let limitOption = {
                field,
                values: []
            };

            for(let {key = null, doc_count = 0} of aggregations[field]) {
                if(doc_count > 0) {
                    limitOption.values.push({
                        value: key, 
                        count: doc_count
                    });
                }
            }

            if(limitOption.values.length > 0) limitOptions.push(limitOption);
        }

        /* link the result to the exhibit/item */
        for(let result of results) {
            if(result.type == ENTITY_TYPE.EXHIBIT) {
                result.link = `/exhibit/${result.uuid}`;
            }
            else if(result.type == ENTITY_TYPE.ITEM) {
                result.link = `/exhibit/${result.is_member_of_exhibit}#${result.uuid}`;
            }
            else if(result.type == ENTITY_TYPE.GRID) {
                result.link = `/exhibit/${result.is_member_of_exhibit}#${result.uuid}`;
            }
        }

        return {results, limitOptions, resultCount};
    }

    return {
        execute
    }

})()