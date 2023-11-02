'use strict'

import { Configuration } from '../config/config.js';
import { Settings } from '../config/settings.js';

export const Resource = (() => {
    let { 
        resourceLocation,
        iiifImageServerUrl
    
    } = Configuration;

    let {
        thumbnailImageLocation

    } = Settings;

    /**
     * 
     */
    const getFileUrl = (filename="null") => { // TODO rename to getFilePath()
        console.log("TEST getFileUrl: filename:", filename)
        return `${resourceLocation}/${filename}`; // local folder for dev
        // TODO stream from remote image server
    }

    /**
     * 
     */
    const getThumbnailFileUrl = (filename="null") => { // TODO rename to getFilePath()
        return `${resourceLocation}/${thumbnailImageLocation}/${filename}`; // local folder for dev
        // TODO stream from remote image server
    }

    /**
     * 
     */
    const getIIIFImageUrl = (filename="null", width=null, height=null) => {
        let dimensions = "full";
        if(width || height) {
            dimensions = `${width || ""},${height || ""}`;
        }

        return `${Configuration.iiifImageServerUrl}/iiif/2/${filename}/full/${dimensions}/0/default.jpg`;
        // TODO stream. Return null if stream status != 200
    }

    /**
     * 
     */
    const getAudioPreviewImageUrl = (filename="null") => {
        return null;
        // TODO stream. Return null if stream status != 200
    }

    /**
     * 
     */
    const getVideoPreviewImageUrl = (filename="null") => {
        return null;
        // TODO stream. Return null if stream status != 200
    }

    /**
     * 
     */
    const getPdfPreviewImageUrl = (filename="null", width=null, height=null) => {
        return getIIIFImageUrl(filename, width, height);
        // TODO stream. Return null if stream status != 200
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

    /**
     * 
     */
    const getImageTileSourceUrl = (filename="null") => {
        return `${Configuration.iiifImageServerUrl}/iiif/2/${filename}/info.json`;
    }

    return {
        getFileUrl,
        getThumbnailFileUrl,
        getIIIFImageUrl,
        getAudioPreviewImageUrl,
        getVideoPreviewImageUrl,
        getPdfPreviewImageUrl,
        getImageDerivativeUrl,
        getImageTileSourceUrl
    }
})()