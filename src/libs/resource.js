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

export const Resource = (() => {

    let {
        exhibitsApiDomain,
        exhibitsApiKey

    } = Configuration;

    const EXHIBIT_ENDPOINT = exhibitsApiDomain + '/exhibit';

    const verifyResourceFile = async ({is_member_of_exhibit, media}) => {
        let resourceFound = false;

        let url = `${EXHIBIT_ENDPOINT}/${is_member_of_exhibit}/resource/${media}?verify=true`;

        try {
            let {data} = await axios.get(url);
            resourceFound = data;
        }
        catch(error) {
            Logger.module().error(`Error verifying resource file. Url: '${url}': ${error}`);
        }

        return resourceFound;
    }

    return {
        verifyResourceFile
    };
})()