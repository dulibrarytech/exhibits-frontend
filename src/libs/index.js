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

export const index = (() => {
    var {exhibitsIndexDomain, exhibitsIndexName} = Configuration;

    const getAllExhibits = async () => {
        let exhibits = [];
        
        try {
            // Test
            let response = await axios.get('http://localhost:5678/api/v1/exhibits');

            // TODO
            // let response = await axios.get(`${ELASTIC_URL}/ELASTIC_INDEX/_search`, {query: '*'});
            
            exhibits = response.data;
        }
        catch(e) {
            console.error(e);
        }
        
        return exhibits;
    }

    const getExhibitById = async (id) => {
        let exhibit = null;

        try {
            // Test
            let response = await axios.get(`http://localhost:5678/api/v1/exhibits/${id}`);
            let data = response.data;

            // TODO
            // let data = await axios.get(`${exhibitsIndexDomain}/exhibitsIndexName/_search`, {query: {id field == id}});

            // Test
            response = await axios.get(`http://localhost:5678/api/v1/exhibits/${id}/items`);
            let items = response.data;

            // TODO
            // let sections = await axios.get(`${exhibitsIndexDomain}/exhibitsIndexName/_search`, {query: {'is_member_of': id});

            exhibit = {data, items};
        }
        catch(e) {
            console.error(e);
        }

        return exhibit;
    }

    return {
        getAllExhibits,
        getExhibitById
    }
})()
