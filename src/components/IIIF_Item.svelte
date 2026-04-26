<script>
    import {
        ITEM_TYPE
    } from '../config/global-constants';

    export let item; 
    export let template;
    export let args;

    const VIEWER_METADATA = { // TODO move to settings? (data layer)
        title: "title"
    }

    let { type = null, metadata = {} } = args;

    let _manifest = null; 
    let _viewerMetadata = {};

    $: {
        init();
    }

    const init = () => {

        if(item.manifest) {
            _manifest = item.manifest;

            item.media = getManifestResourceUrl(_manifest) || "";
            item.thumbnail = getManifestThumbnailUrl(_manifest) || "";

            item.is_iiif_item = true;

            /* Add metadata fields to viewer metadata display */
            for(let field in VIEWER_METADATA) {
                if(metadata[ VIEWER_METADATA[field] ]) _viewerMetadata[ field ] = metadata[ VIEWER_METADATA[field] ];
            }
        }
    }

    const getManifestResourceUrl = (manifest) => {
        let mediaUrl = null;
        const itemType = item[ Settings.exhibitItemDataFields.ITEM_TYPE ] || "undefined";

        let mediaResource;
        if(itemType == ITEM_TYPE.IMAGE || itemType == ITEM_TYPE.LARGE_IMAGE) {

            try {
                // iiif v2
                if(manifest.sequences) {
                    mediaResource = manifest.sequences[0].canvases[0].images[0].resource;
                }
                // iiif v3
                else if(manifest.items) {   
                    mediaResource = manifest.items[0].items[0].items[0].body;
                }
                
                mediaUrl = mediaResource['@id'] || mediaResource.id || null;
            }
            catch(error) {
                Logger.module().error("Error getting iiif manifest resource url: " + error);
            }
        }
        else if(itemType == ITEM_TYPE.AUDIO || itemType == ITEM_TYPE.VIDEO) {
            try {
                // iiif v2
                if(manifest.mediaSequences || manifest.sequences) {
                    mediaResource = manifest.mediaSequences[0].elements[0] || manifest.sequences[0].canvases[0].content[0].body;
                }
                // iiif v3
                else if(manifest.items) {   
                    mediaResource = manifest.items[0].items[0].items[0].body;
                }
                
                mediaUrl = mediaResource['@id'] || mediaResource.id || null;
            }
            catch(error) {
                Logger.module().error("Error getting iiif manifest resource url: " + error);
            }
        }
        else if(itemType == ITEM_TYPE.PDF) {
            try {
                // iiif v2
                if(manifest.sequences) {
                    mediaResource = manifest.sequences[0].canvases[0].content[0].body;
                }
                // iiif v3
                else if(manifest.items) {   
                    mediaResource = manifest.items[0].items[0].items[0].body;
                }
                
                mediaUrl = mediaResource['@id'] || mediaResource.id || null;
            }
            catch(error) {
                Logger.module().error("Error getting iiif manifest resource url: " + error);
            }
        }

        return mediaUrl;
    }

    const getManifestThumbnailUrl = (manifest) => {
        let thumbnailUrl = null;
        const itemType = item[ Settings.exhibitItemDataFields.ITEM_TYPE ] || "undefined";

        let thumbnailResource;
        if(itemType == ITEM_TYPE.IMAGE || itemType == ITEM_TYPE.LARGE_IMAGE) {

            try {
                // iiif v2
                if(manifest.sequences) {
                    thumbnailResource = manifest.sequences[0].canvases[0].thumbnail || manifest.sequences[0].canvases[0].images[0].resource || null;
                }
                // iiif v3
                else if(manifest.thumbnail || manifest.items) {   
                    thumbnailResource = manifest.thumbnail[0] || manifest.items[0].thumbnail || null;
                }
            }
            catch(error) {
                Logger.module().error("Error getting iiif manifest thumbnail url: " + error);
            }
        }
        else if(itemType == ITEM_TYPE.AUDIO || itemType == ITEM_TYPE.VIDEO) {
            // iiif v2
            if(manifest.mediaSequences || manifest.sequences) {
                thumbnailResource = 
                manifest.mediaSequences[0].elements[0].thumbnail || 
                manifest.sequences[0].canvases[0].thumbnail || 
                manifest.sequences[0].canvases[0].images[0].resource || null;
            }
            // iiif v3
            else if(manifest.thumbnail || manifest.items) {   
                thumbnailResource = manifest.thumbnail[0] || manifest.items[0].thumbnail || null;
            }
        }
        else if(itemType == ITEM_TYPE.PDF) {
            // iiif v2
            if(manifest.sequences) {
                thumbnailResource = manifest.sequences[0].canvases[0].thumbnail || manifest.sequences[0].canvases[0].content[0].body || null;
            }
            // iiif v3
            else if(manifest.thumbnail || manifest.items) {   
                thumbnailResource = manifest.thumbnail[0] || manifest.items[0].thumbnail || null;
            }
        }

        return thumbnailUrl;
    }       
</script>

<div class="iiif-item">
    <!-- verify boolean for content state -->
    <svelte:component this={template} {item} {args} on:click-item on:mount-template-item on:load-error />
</div>