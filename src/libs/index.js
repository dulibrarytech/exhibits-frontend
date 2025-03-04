'use strict'

import { Configuration } from '../config/config.js';
import axios from 'axios';
import { URLQueryParams } from "object-in-queryparams";
import * as Logger from './logger.js';
import { stripHtmlTags } from '../libs/data_helpers';
import { sanitizeExhibitHtmlFields, sanitizeExhibitItemHtmlFields } from '../libs/exhibits_data_helpers';
import { ENTITY_TYPE } from '../config/global-constants';

/**
 * Dev index interface module
 * 
 * Fetches data from test data server
 */
export const Index = (() => {

    const API_DOMAIN = Configuration.exhibitsApiDomain;
    const EXHIBIT_ENDPOINT = API_DOMAIN + '/exhibit';
    const STUDENT_EXHIBIT_ENDPOINT = API_DOMAIN + '/exhibit/student';
    const SEARCH_ENDPOINT = API_DOMAIN + '/search';

    /**
     * getExhibits()
     * 
     * Fetches all exhibits
     * 
     * @returns {Object} exhibits - array of all exhibits
     */
    const getExhibits = async () => {
        let exhibits = [];
        
        try {
            let {data} = await axios.get(EXHIBIT_ENDPOINT);
            exhibits = data;
        }
        catch(e) {
            Logger.module().error(`Error fetching exhibits. Server: '${EXHIBIT_ENDPOINT}': ${e}`);
            exhibits = null;
        }

        if(exhibits) {
            for(let index in exhibits) {
                sanitizeExhibitHtmlFields(exhibits[index]);
            }
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
        let exhibit = null, response;

        try {
            response = await axios.get(`${EXHIBIT_ENDPOINT}/${id}`);
            let data = response?.data || {};
            sanitizeExhibitHtmlFields(data);
            if(data.title) data.title_string = stripHtmlTags(data.title);

            response = await axios.get(`${EXHIBIT_ENDPOINT}/${id}/items`);
            let items = response?.data || [];
            for(let item of items) {
                sanitizeExhibitItemHtmlFields(item);
                if(item.title) item.title_string = stripHtmlTags(item.title);
            }

            exhibit = {data, items};
        }
        catch(e) {
            Logger.module().error(`Error fetching exhibit data. Server: '${EXHIBIT_ENDPOINT}': ${e}`);
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
        //getStudentCuratedExhibits,
        getExhibit,
        searchIndex
    }
})()