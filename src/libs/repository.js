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
 * Digital repository interface
 * repository.js
 */

'use strict'

import axios from 'axios';
import { Configuration } from '../config/config.js';

const SEARCH_RESULT_PAGE_SIZE = 30;

export const Repository = (() => {
    let {
        exhibitsApiDomain,
        exhibitsApiKey

    } = Configuration;

    /**
    * fetches the item data from the repository
    *
    * @param {string} id - The item id
    */
    const getItemData = async (id) => {
        let url = `${exhibitsApiDomain}/repository/data/${id}`;
        return new Promise(function(resolve, reject) {
            axios.get(url)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    }

    /**
     *
     * gets item data and resource file from the repository
     * writes the resource file to local resource storage if it is not present
     * 
     * @param {string} repositoryItemId - The repository item id 
     * @param {string} exhibitItemId - The exhibit item id of exhibit item that includes the repository item data and resource
     * 
     */
    const getItem = (repositoryItemId, exhibitItemId) => {
        let url = `${exhibitsApiDomain}/repository/item/${repositoryItemId}?key=${exhibitsApiKey}`;
        return new Promise(function(resolve, reject) {
            axios.post(url, {exhibitItemId})
                .then(function (response) {
                    resolve(response.data)
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    }

    const searchRepository = async (queryData = {}) => {
        let { 
            query = "", 
            facets = null 

        } = queryData;

        let queryString = `q=${query}`;

        for(let key in facets) {
            queryString = queryString.concat(`&f[${key}][]=${facets[key].replace(/ /g, '+')}&pageSize=${SEARCH_RESULT_PAGE_SIZE}`); 
        }

        let url = `${exhibitsApiDomain}/repository/search`;
        return new Promise(function(resolve, reject) {
            axios.post(url, {queryString})
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    }

    return {
        getItemData,
        getItem,
        searchRepository
    };
})()
