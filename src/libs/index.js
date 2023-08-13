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

    const INDEX_API_DOMAIN = 'http://localhost:5678/api/v1';
    const EXHIBIT_ENDPOINT = INDEX_API_DOMAIN + '/exhibit';

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
            let response = await axios.get(EXHIBIT_ENDPOINT);
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
     */
    const searchIndex = () => {

    }

    return {
        getExhibits,
        getExhibit,
        searchIndex
    }
})()
