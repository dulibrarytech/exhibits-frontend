'use strict'

import { Configuration } from '../config/config.js';
import { decodeHtmlEntities, sanitizeHtmlString } from '../libs/data_helpers';
import axios from 'axios';

/**
 * Dev index interface module
 * 
 * Fetches data from test data server
 */
export const Index = (() => {
    const API_DOMAIN = Configuration.exhibitsApiDomain;
    const EXHIBIT_ENDPOINT = API_DOMAIN + '/exhibit';
    const SEARCH_ENDPOINT = API_DOMAIN + '/search';

    /**
     * 
     * @param {*} object - any object
     * 
     * Iterates object keys and decodes entities, and sanitizes html 
     * 
     * @returns false
     */
    const sanitizeObjectData = (object) => {
        Object.keys(object).forEach(function(key, index) {
            if(typeof object[key] == 'string') {
                object[key] = sanitizeHtmlString( decodeHtmlEntities(object[key]) );
            }
        });
    }

    /**
     * getExhibits()
     * 
     * Fetches all exhibits
     * 
     * @returns {Object} exhibits - array of all exhibits
     */
    const getExhibits = async (isAdmin = false) => {
        let exhibits = [];
        
        try {
            let response = await axios.get(EXHIBIT_ENDPOINT);
            exhibits = response.data;

            for(let exhibit of exhibits) sanitizeObjectData(exhibit);

            if(isAdmin != true) {
                exhibits = exhibits.filter((exhibit) => {
                    return exhibit.is_published || false;
                });
            }
        }
        catch(e) {
            console.error(`Error fetching exhibits. Server: '${EXHIBIT_ENDPOINT}': ${e}`);
            exhibits = null;
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
            let response = await axios.get(`${EXHIBIT_ENDPOINT}/${id}`);
            let data = response.data;

            response = await axios.get(`${EXHIBIT_ENDPOINT}/${id}/items`);
            let items = response.data;

            sanitizeObjectData(data)
            for(let item of items) sanitizeObjectData(item);

            exhibit = {data, items};
        }
        catch(e) {
            console.error(e);
        }

        return exhibit;
    }

    /**
     * searchIndex()
     * 
     * @typedef {object} data
     * @property {object} [terms = []]
     * @property {string} [boolean = "or"]
     * @property {object} [fields = []]
     * 
     * @param {string} [exhibitId = null] - exhibit uuid. If null, all exhibits are searched. If present, search is scoped to that exhibit
     * 
     * @returns results array from elastic response data
     */
    const searchIndex = async (data = {}, exhibitId = null) => {
        let results = [];
        
        let terms = data.terms.toString();
        let page = data.page;
        let url = `${SEARCH_ENDPOINT}?q=${terms}&page=${page}`; 
        
        if(exhibitId) url = url.concat(`&exhibitId=${exhibitId}`);

        try {
            let response = await axios.get(url);
            results = response.data || [];
        }
        catch(error) {
            console.error(`Could not retrieve data from index. Url: ${url} Error: ${error} Request status: ${error.response.status}`);
        }

        for(let result of results) sanitizeObjectData(result);

        return results;
    }

    return {
        getExhibits,
        getExhibit,
        searchIndex
    }
})()
