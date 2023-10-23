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
import { Settings } from '../config/settings.js';
import { getItemTypeForMimeType } from '../libs/media_helpers';
import {ITEM_TYPE} from '../config/global-constants';

export const Repository = (() => {
    var {   
            repositoryDomain,
            
        } = Configuration;

    var {
        repositoryObjectDataEndpoint,
        repositoryDatastreamUrl,
        repositoryThumbnailDatastreamEndpoint,
        repositoryImageDatastreamEndpoint,
        repositoryObjectDatastreamEndpoint

    } = Settings;

    /**
    * Fetches the item data from the repository
    *
    * @param {string} id - The item id
    */
    const getItemData = async (id) => {

        return new Promise(function(resolve, reject) {
            let url = `${repositoryDomain}${(repositoryObjectDataEndpoint.replace("{item_id}", id))}`;

            axios.get(url)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (e) {
                    reject(e);
                })
                .finally(function () {
                    // always executed
                });

        });
    }

    /**
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
        return `${repositoryDomain}${(repositoryDatastreamUrl.replace("{item_id}", id))}/${repositoryObjectDatastreamEndpoint}`;
    }

    const getItemThumbnailDatastreamUrl = (id) => {
        return `${repositoryDomain}${(repositoryDatastreamUrl.replace("{item_id}", id))}/${repositoryThumbnailDatastreamEndpoint}`;
    }

    const getItemImageDatastreamUrl = (id) => {
        return `${repositoryDomain}${(repositoryDatastreamUrl.replace("{item_id}", id))}/${repositoryImageDatastreamEndpoint}`;
    }

    const getItemIIIFManifestUrl = (id) => {
        let url = null;
        if(id) {
            url = iiifManifestUrl.replace('{item_id}', id);
        }
        return url;
    }

    const getPreviewImageUrl = async (id) => {
        let url = null;
        let object = await getItemData(id);

        let mimeType = object.mime_type;
        let itemType = getItemTypeForMimeType(mimeType) || "null";

        switch(itemType) {
            case ITEM_TYPE.IMAGE: // image ds
                url = getItemImageDatastreamUrl(id);
                break;

            case ITEM_TYPE.LARGE_IMAGE: // image ds
                url = getItemImageDatastreamUrl(id);
                break;

            case ITEM_TYPE.AUDIO: // null (previews use placeholder image)
                url = getItemThumbnailDatastreamUrl(id);
                break;

            case ITEM_TYPE.VIDEO: // null
                url = getItemThumbnailDatastreamUrl(id);
                break;

            case ITEM_TYPE.PDF: // pdf ds
                //url = getItemImageDatastreamUrl(id);
                url = getItemThumbnailDatastreamUrl(id);
                break;

            default:
                console.error(`Invalid item type: ${itemType}, repository item mime type: ${mimeType}`);
                break;
        }

        return url;
    }

    return {
        getItemData,
        getItemDatastream,
        getItemDatastreamUrl,
        getItemThumbnailDatastreamUrl,
        getItemImageDatastreamUrl,
        getItemIIIFManifestUrl,
        getPreviewImageUrl
    };
})()
