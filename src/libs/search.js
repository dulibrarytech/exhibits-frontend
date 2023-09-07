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
 * Search functions
 * search.js
 */

'use strict'

import { Configuration } from '../config/config.js';
import axios from 'axios';

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
    const search = async (terms = "", exhibitId = null) => {
        // gets terms from search box (A: in array, constructed in Search_Box component, B: as string, constructed in sb comp, as comma sep vals)
        // create data object for index::searchIndex():
        // terms array, individual terms or single string 
        // boolean, use default, user control tbd
        // fields - array, use title, description, text now. user control tbd

        // call index::searchIndex(data, exhibitId) async, then (redirect?) to results page with results array* (array could be crosswalked here to a format that works better for Search_Results.svelte)
    }

    return {
        search
    };

});