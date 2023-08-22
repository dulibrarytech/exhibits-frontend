'use strict'

import { Settings } from '../config/settings';
import { Configuration } from '../config/config.js';

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

    var {
        thumbnailImageHeight,
        thumbnailImageWidth

    } = Settings;

    /**
     * 
     */
    const getUrl = (filename="null") => { // TODO rename to getFilePath()
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

    const getImageTileSourceUrl = (filename="null") => {
        return `${Configuration.iiifImageServerUrl}/iiif/2/${filename}/info.json`;
    }

    const getImageThumbnailUrl = (filename="null") => {
        return `${Configuration.iiifImageServerUrl}/iiif/2/${filename}/full/${thumbnailImageWidth},${thumbnailImageHeight}/0/default.jpg`;
    }

    const getPdfThumbnailUrl = (filename="null") => {
        return `${Configuration.iiifImageServerUrl}/iiif/2/${filename}/full/${thumbnailImageWidth},${thumbnailImageHeight}/0/default.jpg`;
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
        getImageThumbnailUrl,
        getPdfThumbnailUrl,
        fetchFile,
        streamFile,
        getInfo
    }
})()