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

import { Configuration } from '../config/config.js';
import { Index } from './index.js';

export const Search = (() => {

    var {   
        
    } = Configuration;

    /**
     * search()
     * 
     * @param {string} [terms = ""] - search terms, as csv string
     * @param {string} [exhibitId = ""] - exhibit id, if search is scoped to an exhibit
     * 
     * @returns 
     */
    const execute = async (terms, boolean, fields, exhibitId) => {
        let data = {
            terms: terms.toLowerCase().split(','),
            boolean,
            fields: fields.split(',')
        }

        return await Index.searchIndex(data, exhibitId); // async, then (redirect?) to results page with results array* (array could be crosswalked here to a format that works better for Search_Results.svelte)
    }

    return {
        execute
    }

})()