/**
 * repository_interface.js
 * implements DigitalDU repository frontend
 * 
 * Functions for interaction with the digital object repository api
 */

'use strict'

import { Configuration } from '../config/config.js';
import axios from 'axios';

export const repository = (() => {
    var {   repositoryDomain,
            repositoryDatastreamEndpoint, 
            repositoryItemDataEndpoint

        } = Configuration;

    /*
    * Fetches the item data from the repository
    *
    * @param {string} id - The item id
    */
    const getItemData = async (id) => {
        let data = [];
        let url = `${repositoryDomain}/${(repositoryItemDataEndpoint.replace("{item_id}", id))}`;

        console.log("TEST ddu data url", url)

        try {
            data = await axios.get(url);
        }
        catch(e) {
            console.error(e);
        }

        return data;
    }

    /*
    * Returns the item resource datastream
    *
    * @param {string} id - The item id
    */
    const getItemDatastream = async (id) => {
        let stream = null;
        let url = `${repositoryDomain}/${(repositoryDatastreamEndpoint.replace("{item_id}", id))}`;

        console.log("TEST ddu datastream url", url)

        try {
            stream = await axios.get(url);
        }
        catch(e) {
            console.error(e);
        }
        
        return stream;
    }

    return {
        getItemData,
        getItemDatastream
    };
})()
