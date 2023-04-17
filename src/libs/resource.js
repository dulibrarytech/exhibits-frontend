'use strict'

import { Configuration } from '../config/config.js';
import axios from 'axios';

/**
 * Exhibits@DU: Resource access interface module
 * 
 * Fetch or stream resources from local filesystem or a remote api
 */
export const Resource = (() => {
    var {resourceLocation} = Configuration;

    /**
     * 
     */
    const getUrl = (filename) => {
        let url = "";
        url = `${resourceLocation}/${filename}`; // local folder for dev
        return url;
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
        fetchFile,
        streamFile,
        getInfo
    }
})()