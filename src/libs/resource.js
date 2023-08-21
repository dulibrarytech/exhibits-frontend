'use strict'

import { Configuration } from '../config/config.js';
import axios from 'axios';

/**
 * Exhibits@DU: Resource access interface
 * 
 * Fetch or stream resources from local filesystem or remote api (wasabi, cantaloupe)
 */
export const Resource = (() => {
    var { 
        resourceLocation,
        iiifImageServerUrl
    
    } = Configuration;

    /**
     * 
     */
    const getUrl = (filename) => {
        return `${resourceLocation}/${filename}`; // local folder for dev
    }

    /**
     * 
     */
    const getImageDerivativeUrl = (args) => {
        let url;

        let {
            type="resize", 
            filename=null, 
            width="", 
            height="",
            offsetX="0",
            offsetY="0"

        } = args;

        switch(type) {
            case 'resize':
                url = `${iiifImageServerUrl}/iiif/2/${filename}/full/${width},${height}/0/default.jpg`;
                break;

            case 'crop':
                url = `${iiifImageServerUrl}/iiif/2/${filename}/${offsetX},${offsetY},${width},${height}/max/0/default.jpg`
        }

        return url;
    }

    const getImageTileSourceUrl = (filename) => {
        return `${Configuration.iiifImageServerUrl}/iiif/2/${filename}/info.json`;
    }

    /**
     * 
     */
    const fetchFile = () => {}

    /**
     * 
     */
    const streamFile = () => {}

    /**
     * 
     */
    const getInfo = () => {}

    return {
        getUrl,
        getImageDerivativeUrl,
        getImageTileSourceUrl,
        fetchFile,
        streamFile,
        getInfo
    }
})()