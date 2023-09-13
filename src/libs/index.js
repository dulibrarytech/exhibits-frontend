'use strict'

import { Configuration } from '../config/config.js';
import axios from 'axios';

/**
 * Dev index interface module
 * 
 * Fetches data from test data server
 */
export const Index = (() => {
    var {exhibitsIndexDomain, exhibitsIndexName} = Configuration;

    const INDEX_API_DOMAIN = exhibitsIndexDomain;
    const EXHIBIT_ROUTE = INDEX_API_DOMAIN + '/exhibit';
    const SEARCH_ROUTE = INDEX_API_DOMAIN + '/search';

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
            let response = await axios.get(EXHIBIT_ROUTE);
            exhibits = response.data;
        }
        catch(e) {
            console.error(`Could not connect to index at '${INDEX_API_DOMAIN}': ${e}`);
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
            // TODO use endpoint const as in getExhibits()
            let response = await axios.get(`http://localhost:5678/api/v1/exhibit/${id}`);
            let data = response.data;

            response = await axios.get(`http://localhost:5678/api/v1/exhibit/${id}/items`);
            let items = response.data;

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
        // [impl:]
        // build elastic DSL query object with data (terms, bool, fields) *if id => add the 'is_member_of_exhibit=id' clause to the query array AND type=item. IF no id, use item=exhibit*
        // if(exhibitId) {
        // }
        // else {
        // }
        // call elastic async (as in other f()s here) and return results array (array extracted from elastic response object => response.hits.hits, length => response.hits.total.value)
        // let url = "" // es api
        // [end impl]

        // [dev:]
        let terms = data.terms.toString();
        let page = data.page;
        let url = `http://localhost:5678/api/v1/search?q=${terms}&page=${page}`; 
        if(exhibitId) url = url.concat(`&exhibitId=${exhibitId}`);
        // [end dev]

        try {
            let response = await axios.get(url);
            results = response.data || [];
        }
        catch(error) {
            console.error(`Could not retrieve data from index. Url: ${url} Error: ${error} Request status: ${error.response.status}`);
        }

        return results;
    }

    return {
        getExhibits,
        getExhibit,
        searchIndex
    }
})()
