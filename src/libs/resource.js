'use strict'

/*
 * Generate resource URIs for the Exhibits App modules
 */

import { Configuration } from '../config/config';
import { Settings } from '../config/settings';
import { Kaltura } from '../libs/kaltura';

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
        return `${resourceLocation}/${filename}`; // local folder for dev
    }

    /**
     * 
     */
    const getThumbnailFileUrl = (filename="null") => { // TODO rename to getFilePath()
        return `${resourceLocation}/${thumbnailImageLocation}/${filename}`; // local folder for dev
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
    }

    /**
     * 
     */
    const getAudioPreviewImageUrl = (item = {}, width, height) => {
        let url = null;
        let {kaltura_id = null} = item;

        if(kaltura_id) {
            url = Kaltura.getThumbnailUrl(kaltura_id);
        }

        return url;
    }

    /**
     * 
     */
    const getVideoPreviewImageUrl = (item = {}, width, height) => {
        let url = null;
        let {kaltura_id = null} = item;

        if(kaltura_id) {
            url = Kaltura.getThumbnailUrl(kaltura_id);
        }

        return url;
    }

    /**
     * 
     */
    const getPdfPreviewImageUrl = (filename="null", width=null, height=null) => {
        return getIIIFImageUrl(filename, width, height);
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