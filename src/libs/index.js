'use strict'

import { Configuration } from '../config/config.js';
import { sanitizeObjectData } from '../libs/data_helpers';
import axios from 'axios';
import { URLQueryParams } from "object-in-queryparams";

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
     * getExhibits()
     * 
     * Fetches all exhibits
     * 
     * @returns {Object} exhibits - array of all exhibits
     */
    const getExhibits = async (isAdmin = false) => {
        let exhibits = [];
        
        try {
            let {data} = await axios.get(EXHIBIT_ENDPOINT);
            exhibits = data;

            sanitizeObjectData(exhibits);

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
            let data = sanitizeObjectData(response.data);

            response = await axios.get(`${EXHIBIT_ENDPOINT}/${id}/items`);
            let items = sanitizeObjectData(response.data);

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
    const searchIndex = async (searchData = {}, exhibitId = null) => {    
        let terms = searchData.terms?.toString();
        let page = searchData.page || 1;
        let facets = searchData.facets || null;

        let queryParams = new URLQueryParams({
            q: terms,
            f: facets || undefined,
            page
        });

        let url = `${SEARCH_ENDPOINT}?${queryParams}`;
        if(exhibitId) url = url.concat(`&exhibitId=${exhibitId}`);

        try {
            let {data} = await axios.get(url);
            let {results = [], aggregations = null, resultCount = null} = data;

            for(let result of results) sanitizeObjectData(result);

            return {results, aggregations, resultCount}; 
        }
        catch(error) {
            console.error(`Could not retrieve data from index. Url: ${url} ${error} Request status: ${error.response.status}`);

            return {};
        }
    }

    return {
        getExhibits,
        getExhibit,
        searchIndex
    }
})()