'use strict'

import { Settings } from '../config/settings';
import { Configuration } from '../config/config.js';

import {ENTITY_TYPE, ITEM_TYPE} from '../config/global-constants';

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

    /**
     * getThumbnailUrl
     */
    const getThumbnailUrl = (entity) => {
        if(entity.type == ENTITY_TYPE.EXHIBIT) {
            return getExhibitThumbnailUrl(entity);
        }
        else if(entity.type = ENTITY_TYPE.EXHIBIT_ITEM) {
            return getItemThumbnailUrl(entity);
        }
    }

    /**
     * getExhibitThumbnailUrl
     */
    const getExhibitThumbnailUrl = (exhibit) => {
        let thumbnail = null;
        let  {thumbnail_image=null, hero_image=null} = exhibit;

        if(!thumbnail_image) {
            thumbnail = Resource.getImageDerivativeUrl({
                type: 'crop',
                filename: hero_image || "",
                width: "400",
                height: "400"
            });
        }
        else {
            thumbnail = Resource.getUrl(thumbnail_image);
        }

        return thumbnail;
    }

    /**
     * getItemThumbnailUrl
     */
    const getItemThumbnailUrl = (item) => {
        let thumbnail = null;
        let  {thumbnail_image = null} = item;

        let {thumbnailImageLocation} = Settings;

        const THUMBNAIL_ICON = Settings.thumbnailIcon;
        const THUMBNAIL_PATH = `${thumbnailImageLocation}`;

        if(thumbnail_image) {
            thumbnail = `${THUMBNAIL_PATH}/${thumbnail_image}`;
        }
        else {
            let {item_type = null} = item;

            switch(item_type) {
                case ITEM_TYPE.REPO:
                    thumbnail = getRepositoryThumbnailUrl(item.url) || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.DEFAULT}`;
                    break;

                case ITEM_TYPE.IMAGE:
                case ITEM_TYPE.LARGE_IMAGE:
                    thumbnail = getImageThumbnailUrl(item.url) || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.IMAGE}`;
                    break;

                case ITEM_TYPE.AUDIO:
                    thumbnail = getAudioThumbnailUrl(item.url) || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.AUDIO}`;
                    break;

                case ITEM_TYPE.VIDEO:
                    thumbnail = getVideoThumbnailUrl(item.url) || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.VIDEO}`;
                    break;

                case ITEM_TYPE.PDF:
                    thumbnail = getPdfThumbnailUrl(item.url) || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.PDF}`;
                    break;

                case ITEM_TYPE.EXTERNAL_SOURCE:
                    thumbnail = getExternalThumbnailUrl(item) || `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.DEFAULT}`;
                    break;

                default:
                    console.error(`Invalid item type: ${item_type}`);
                    thumbnail = `${THUMBNAIL_PATH}/${THUMBNAIL_ICON.DEFAULT}`;
                    break;
            }
        }

        return thumbnail;
    }

    const getRepositoryThumbnailUrl = (uuid=null) => {
        return uuid ? Repository.getItemTNDatastreamUrl(id) : null;
    }

    const getImageThumbnailUrl = (filename="null") => {
        return `${Configuration.iiifImageServerUrl}/iiif/2/${filename}/full/${thumbnailImageWidth},${thumbnailImageHeight}/0/default.jpg`;
    }

    const getPdfThumbnailUrl = (filename="null") => {
        return `${Configuration.iiifImageServerUrl}/iiif/2/${filename}/full/${thumbnailImageWidth},${thumbnailImageHeight}/0/default.jpg`;
    }

    const getAudioThumbnailUrl = (filename="null") => {
        return null;
    }

    const getVideoThumbnailUrl = (filename="null") => {
        return null;
    }

    const getExternalThumbnailUrl = (item) => {
        return item.url || null;
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
        getAudioThumbnailUrl,
        getVideoThumbnailUrl,
        getThumbnailUrl,
        getExhibitThumbnailUrl,
        getItemThumbnailUrl,
        fetchFile,
        streamFile,
        getInfo
    }
})()