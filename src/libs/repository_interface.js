/**
 * repository_interface.js
 * implements DigitalDU repository frontend
 * 
 * Functions for interaction with the digital object repository api
 */

'use strict'

import { Configuration } from '../config/config.js';

export const repository = (() => {

    /* Interface attributes */

    /*
     * Domain of Elastic index for repository
     */
    var repositoryIndexDomain;

    /*
     * Name of Elastic index for repository
     */
    var repositoryIndexName;

    /*
     * Domain of repository
     */
    var repositoryDomain;

    /* Interface methods */

    /*
     * Fetches the item data from the repository
     *
     * @param {string} id - The item id
     */
    function getItemData(id) { }

    /*
     * Returns the datastream url to the item resource
     *
     * @param {string} id - The item id
     */
    function getDatastreamUrl(id) { };

    /* Implementation */
    ( {repositoryIndexDomain, repositoryIndexName, repositoryDomain} = Configuration );

    getItemData = (id) => {
        // Axios fetch from ES server (libes04)
        let url = `${repositoryIndexDomain}/${repositoryIndexName}/q=pid:${id}`;
        console.log("TEST index url", url)

        // Can get from digitaldu endpoint if implemented in the future
    }

    getDatastreamUrl = (id) => {
        return `${repositoryDomain}/datastream/${id}/object`;
    }

    return {
        getItemData,
        getDatastreamUrl
    }

})()
