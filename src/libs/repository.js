/**
 * Repository API functions for fetching item data and searching the repository
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
     * @param {object} queryData - object containing query and facets for repository search
     * @returns - search results from the repository search endpoint
     * 
     * queryData object structure:
     * {
     *   query: string,
     *   facets: {
     *     field_name: facet_value,
     *     ...
     *   }
     * }
     */
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
        searchRepository,
    };
})()
