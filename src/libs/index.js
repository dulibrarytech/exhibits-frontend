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

'use strict'

import { Configuration } from '../config/config.js';
import axios from 'axios';

/**
 * Exhibits@DU: Elastic index interface module
 * 
 * Fetch data from elastic api or exhibits app backend api
 */
export const index = (() => {
    var {exhibitsIndexDomain, exhibitsIndexName} = Configuration;

    /**
     * getExhibits()
     * 
     * Fetches all exhibits, return
     * 
     * @returns {Object} exhibits - array of all exhibits
     */
    const getExhibits = async () => {
        let exhibits = [];
        
        try {
            // Test
            let response = await axios.get('http://localhost:5678/api/v1/exhibit');

            // TODO
            // let response = await axios.get(`${exhibitsIndexDomain}/exhibitsIndexName/_search`, {query: '*'});
            // TODO backend api
            // let data = await axios.get([get all exhibits endpoint])
            
            exhibits = response.data;
        }
        catch(e) {
            console.error(e);
        }
        
        return exhibits;
    }

    /**
     * getExhibit()
     * 
     * Fetches the exhibit data object and exhibit item array from the backend api, and combines them into a single object
     * 
     * @param {string} id 
     * 
     * @typedef {Object} exhibit
     * @property {Object} data - exhibit data
     * @property {Object} items - exhibit item array
     * 
     * @returns exhibit
     */
    const getExhibit = async (id) => {
        let exhibit = null;

        try {
            // Test
            let response = await axios.get(`http://localhost:5678/api/v1/exhibits/${id}`);
            let data = response.data;

            // TODO no index api, direct index request
            // let data = await axios.get(`${exhibitsIndexDomain}/exhibitsIndexName/_search`, {query: {id field == id}});
            // TODO backend api
            // let data = await axios.get([get exhibit (data) endpoint])

            // Test
            response = await axios.get(`http://localhost:5678/api/v1/exhibits/${id}/items`);
            let items = response.data;

            // TODO
            // let sections = await axios.get(`${exhibitsIndexDomain}/exhibitsIndexName/_search`, {query: {'is_member_of': id});
            // TODO backend api
            // let data = await axios.get([get exhibit items endpoint])

            exhibit = {data, items};
        }
        catch(e) {
            console.error(e);
        }

        return exhibit;
    }

    return {
        getExhibits,
        getExhibit
    }
})()
