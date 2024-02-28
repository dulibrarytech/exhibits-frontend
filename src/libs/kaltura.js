/**
 Copyright 2023 University of Denver

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
* Kaltura
*/

'use strict'

import { Settings } from '../config/settings';

export const Kaltura = (() => {

    var {   
        kalturaDomain,
        kalturaPartnerID,
        kalturaUI_ID,
        kalturaUniqueObjectID,
        kalturaThumbnailWidth,
        kalturaThumbnailHeight,
        kalturaFlavorId

    } = Settings;

    /**
     * 
     * @method getViewerContent
     * 
     * @param {string} entryId 
     * 
     * @returns 
     */
    const getEmbeddedViewerUrl = (entryId) => {
        return `${kalturaDomain}/p/${kalturaPartnerID}/sp/${kalturaPartnerID}00/embedIframeJs/uiconf_id/${kalturaUI_ID}/partner_id/${kalturaPartnerID}?iframeembed=true&playerId=${kalturaUniqueObjectID}&entry_id=${entryId}&flashvars[leadWithHTML5]=true`;
    }

    /**
     * @method getThumbnailUrl
     * 
     * @param {string} entryId 
     * 
     * @returns 
     */
    const getThumbnailUrl = (entryId) => {
        return `${kalturaDomain}/p/${kalturaPartnerID}/thumbnail/entry_id/${entryId}/width/${kalturaThumbnailWidth}/height/${kalturaThumbnailHeight}`;
    }

    /**
     * 
     * @method getStreamingMediaUrl
     * 
     * @param {string} entryId
     * 
     * @returns 
     */
    const getStreamingMediaUrl = (entryId) => {
        return `${kalturaDomain}/p/${kalturaPartnerID}/sp/0/playManifest/entryId/${entryId}/format/url/protocol/https/flavorParamId/${kalturaFlavorId}`;
    }

    return {
        getEmbeddedViewerUrl,
        getThumbnailUrl,
        getStreamingMediaUrl
    };
})()
