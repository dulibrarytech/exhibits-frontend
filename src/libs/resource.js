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
    const getResourceUri = (filename = "null", exhibitId = null) => {
        let path = exhibitId ? `${exhibitId}/` : "";

        return `${resourceLocation}/${path}${filename}`;
    }

    /**
     * 
     */
    const getItemResourceUri = (item) => {
        let {is_member_of_exhibit = null, media = "null"} = item;

        let path = is_member_of_exhibit ? `${is_member_of_exhibit}/` : "";
        let filename = media;

        return `${resourceLocation}/${path}${filename}`;
    }

    /**
     * 
     */
    const getItemThumbnailImageUri = (item) => {
        let {is_member_of_exhibit = null, thumbnail = "null"} = item;

        let path = is_member_of_exhibit ? `${is_member_of_exhibit}/` : "";
        let filename = thumbnail;

        return `${resourceLocation}/${thumbnailImageLocation}/${path}${filename}`;
    }

    /**
     * 
     */
    const getIIIFImageUrl = (item, width=null, height=null) => {
        let dimensions = "full";
        if(width || height) {
            dimensions = `${width || ""},${height || ""}`;
        }

        // let {is_member_of_exhibit = null, media = "null"} = item;
        // let folder = is_member_of_exhibit ? `${is_member_of_exhibit}_` : "";
        // let filename = `${folder}${media}`;
        let filename = getImageServerFilename(item);

        console.log("TEST iiif url:", `${Configuration.iiifImageServerUrl}/iiif/2/${filename}/full/${dimensions}/0/default.jpg`)

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
    const getPdfPreviewImageUrl = (item, width=null, height=null) => {
        return getIIIFImageUrl(item, width, height);
    }

    /**
     * 
     */
    // const getImageDerivativeUrl = (args) => {
    const getImageDerivativeUrl = (item, args) => {
        let url;

        // let {is_member_of_exhibit = null, media = "null"} = item;
        // let folder = is_member_of_exhibit ? `${is_member_of_exhibit}_` : "";
        // let filename = `${folder}${media}`;
        let filename = getImageServerFilename(item);

        let {
            type="resize", 
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
    // const getImageTileSourceUrl = (filename="null") => {
    const getImageTileSourceUrl = (item) => {
        // let {is_member_of_exhibit = null, media = "null"} = item;
        // let folder = is_member_of_exhibit ? `${is_member_of_exhibit}_` : "";
        // let filename = `${folder}${media}`;
        let filename = getImageServerFilename(item);

        return `${Configuration.iiifImageServerUrl}/iiif/2/${filename}/info.json`;
    }

    const getImageServerFilename = (item) => {
        let {is_member_of_exhibit = null, media = "null"} = item;
        let folder = is_member_of_exhibit ? `${is_member_of_exhibit}_` : "";
        return `${folder}${media}`;
    }

    return {
        getResourceUri,
        getItemResourceUri,
        getItemThumbnailImageUri,
        getIIIFImageUrl,
        getAudioPreviewImageUrl,
        getVideoPreviewImageUrl,
        getPdfPreviewImageUrl,
        getImageDerivativeUrl,
        getImageTileSourceUrl
    }
})()