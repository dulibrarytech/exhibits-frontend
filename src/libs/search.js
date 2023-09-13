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
import { Settings } from '../config/settings.js';

export const Search = (() => {
    //let resultFields = Settings.searchResultDisplayFields;

    /**
     * search()
     * 
     * @param {string} [terms = ""] - search terms (csv string)
     * @param {string} [exhibitId = ""] - exhibit id. search will be scoped to the items in this exhibit
     * 
     * @returns 
     */
    const execute = async (terms, boolean, fields, exhibitId, page) => {
        let results = [];

        let data = {
            terms: terms.toLowerCase().split(','),
            boolean,
            fields: fields.split(','),
            page
        }

        let response = await Index.searchIndex(data, exhibitId);

        // update the response data, test fields, etc
        //let result;
        for(let item of response) {
            // result = {};
            // for(let field in resultFields) {
            //     result[field] = item[ resultFields[field] ] || ""
            // }
            // result.url = item.url || null;
            // results.push(result);
            results.push(item);
        }

        console.log("TEST search.js returning results:", results)

        return results;
    }

    return {
        execute
    }

})()