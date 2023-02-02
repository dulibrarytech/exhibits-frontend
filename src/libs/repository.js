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
 * repository_interface.js
 * 
 * Functions for retrieving data from external digital repository
 */

'use strict'

import { Configuration } from '../config/config.js';
import axios from 'axios';

export const Repository = (() => {
    var {   repositoryDomain,
            repositoryDatastreamEndpoint,
            repositoryTNDatastreamEndpoint,
            repositoryItemDataEndpoint
            
        } = Configuration;

    /*
    * Fetches the item data from the repository
    *
    * @param {string} id - The item id
    */
    const getItemData = async (id) => {
        let data = [];
        let url = `${repositoryDomain}${(repositoryItemDataEndpoint.replace("{item_id}", id))}`;

        try {
            let response = await axios.get(url);
            ({data} = response);
        }
        catch(e) {
            throw e;
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
        let url = getItemDatastreamUrl(id);

        try {
            stream = await axios.get(url);
        }
        catch(e) {
            console.error(e);
        }
        
        return stream;
    }

    const getItemDatastreamUrl = (id) => {
        return `${repositoryDomain}${(repositoryDatastreamEndpoint.replace("{item_id}", id))}`;
    }

    const getItemTNDatastreamUrl = (id) => {
        return `${repositoryDomain}${(repositoryTNDatastreamEndpoint.replace("{item_id}", id))}`;
    }

    const getItemIIIFManifestUrl = (id) => {
        let url = null;
        if(id) {
            url = iiifManifestUrl.replace('{item_id}', id);
        }
        return url;
    }

    return {
        getItemData,
        getItemDatastream,
        getItemDatastreamUrl,
        getItemTNDatastreamUrl,
        getItemIIIFManifestUrl
    };
})()
