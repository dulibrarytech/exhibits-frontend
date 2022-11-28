/**
 * repository_interface.js
 * implements DigitalDU repository frontend
 * 
 * Functions for interaction with the digital object repository api
 */

'use strict'

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
    function getItem(id) { }

    /*
     * Returns the datastream url to the item resource
     *
     * @param {string} id - The item id
     */
    function getDatastreamUrl(id) { };

    /* Implementation */

    repositoryIndexDomain = ELASTIC_SERVER_REPOSITORY;
    repositoryIndexName = ELASTIC_INDEX_REPOSITORY;
    repositoryDomain = REPOSITORY_DOMAIN;

    getItem = (id) => {
        
    }

    getDatastreamUrl = (id) => {
        return `${repositoryDomain}/datastream/${id}/object`;
    }

    return {
        getItem,
        getDatastreamUrl
    }

})()
