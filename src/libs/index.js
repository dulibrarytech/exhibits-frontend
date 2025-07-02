'use strict'

import axios from 'axios';
import { URLQueryParams } from "object-in-queryparams";
import * as Logger from './logger.js';
import { sanitizeExhibitHtmlFields, sanitizeExhibitItemHtmlFields, getInnerText } from '../libs/exhibits_data_helpers';
import { ENTITY_TYPE } from '../config/global-constants';
import { Configuration } from '../config/config.js';

/**
 * Dev index interface module
 * 
 * Fetches data from test data server
 */
export const Index = (() => {

    let {
        exhibitsApiDomain,
        exhibitsApiKey

    } = Configuration;

    const EXHIBIT_ENDPOINT = exhibitsApiDomain + '/exhibit';
    const SEARCH_ENDPOINT = exhibitsApiDomain + '/search';

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

            exhibits?.forEach((exhibit) => {
                sanitizeExhibitHtmlFields(exhibit);
            })
        }
        catch(error) {
            Logger.module().error(`Error fetching exhibits. Server: '${EXHIBIT_ENDPOINT}': ${error}`);
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
    const getExhibit = async (id, isAdmin = false) => {
        let exhibit = null, response;

        let apiKey = isAdmin ? `?key=${exhibitsApiKey}` : "";
        let dataUrl = `${EXHIBIT_ENDPOINT}/${id}${apiKey}`;
        let itemsUrl = `${EXHIBIT_ENDPOINT}/${id}/items${apiKey}`;

        try {
            response = await axios.get(dataUrl); 
            let data = response?.data || {};
            sanitizeExhibitHtmlFields(data);

            response = await axios.get(itemsUrl);
            let items = response?.data || [];
            for(let item of items) {
                sanitizeExhibitItemHtmlFields(item);
            }

            exhibit = {data, items};
        }
        catch(error) {
            Logger.module().error(`Error fetching exhibit data. Server: '${EXHIBIT_ENDPOINT}': ${error}`);
        }

        return exhibit;
    }

    /**
     * searchIndex()
     * 
     * @typedef {object} searchData
     * @property {object} [terms = []]
     * @property {string} [boolean = "or"]
     * @property {object} [fields = []]
     * @property {string} [page = "1"]
     * @property {object} [facets = []]
     * @property {string} [type = "item"]
     * 
     * @param {string} [exhibitId = null] - exhibit uuid. If null, all exhibits are searched. If present, search is scoped to that exhibit
     * 
     * @returns results array from elastic response data
     */
    const searchIndex = async (searchData = {}, exhibitId = null) => {    
        let terms = searchData.terms?.toString();
        let page = searchData.page || 1;
        let facets = searchData.facets || null;
        let type = searchData.type || ENTITY_TYPE.ITEM;

        let queryParams = new URLQueryParams({
            q: terms,
            f: facets || undefined,
            page,
            type: type || undefined
        });

        let url = `${SEARCH_ENDPOINT}?${queryParams}`;
        if(exhibitId) url = url.concat(`&exhibitId=${exhibitId}`);

        try {
            let {data} = await axios.get(url);
            let {results = [], aggregations = null, resultCount = null} = data;

            for(let result of results) {
                
                if(result.type == ENTITY_TYPE.EXHIBIT) {
                    result = sanitizeExhibitHtmlFields(result);
                }
                else if(result.type == ENTITY_TYPE.ITEM) {
                    result = sanitizeExhibitItemHtmlFields(result);
                }
            }

            return {results, aggregations, resultCount}; 
        }
        catch(error) {
            let status = error?.response?.status || "unknown";
            Logger.module().error(`Could not retrieve data from index. Url: ${url} ${error} Request status: ${status}`);
            return {};
        }
    }

    return {
        getExhibits,
        getExhibit,
        searchIndex
    }
})()