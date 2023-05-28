'use strict'

import { Configuration } from '../config/config.js';
import axios from 'axios';

/**
 * Exhibits@DU: Resource access interface
 * 
 * Fetch or stream resources from local filesystem or a remote api
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
            length="400", 
            width="400",
            offsetX="0",
            offsetY="0"

        } = args;

        switch(type) {
            case 'resize':
                url = `${iiifImageServerUrl}/iiif/2/${filename}/full/${length},${width}/0/default.jpg`;
                break;

            case 'crop':
                url = `${iiifImageServerUrl}/iiif/2/${filename}/${offsetX},${offsetY},${length},${width}/max/0/default.jpg`
        }

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
        getImageDerivativeUrl,
        fetchFile,
        streamFile,
        getInfo
    }
})()