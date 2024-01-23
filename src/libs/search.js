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
    const execute = async (terms, boolean, fields, exhibitId, page) => {
        let facets = [];

        let data = {
            terms,
            boolean,
            fields,
            page
        }

        let {results = [], aggregations = []} = await Index.searchIndex(data, exhibitId);

        for(let field in aggregations) {
            let facet = {
                field,
                types: []
            };

            for(let {key, doc_count} of aggregations[field]) {
                facet.types.push({
                    value: key, 
                    count: doc_count
                });
            }

            facets.push(facet);
        }

        return {results, facets};
    }

    return {
        execute
    }

})()