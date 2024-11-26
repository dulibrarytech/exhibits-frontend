<script>
    'use strict'
    
    import { Settings } from '../config/settings';
    import { Resource } from '../libs/resource';

    export let exhibit = {};
    export let width = null;
    export let height = null;

    let titleTextElement;

    let exhibitId;
    let exhibitPath;
    let thumbnail;
    //let heroImage;
    let title;
    let subtitle;
    let styles;

    const EXHIBIT_THUMBNAIL_WIDTH = "400";
    const EXHIBIT_THUMBNAIL_HEIGHT = "400";
    const PLACEHOLDER_IMAGE = Settings.exhibitDefaultImage;

    $: init();

    const init = () => {
        exhibitId = exhibit.uuid;
        exhibitPath = `/exhibit/${exhibit.uuid}`;
        thumbnail = exhibit.thumbnail_image || null;
        //heroImage = exhibit.hero_image || null;
        title = exhibit.title || "";
        subtitle = exhibit.subtitle || "";
        styles = exhibit.styles?.hero || {};

        if(!width) width = EXHIBIT_THUMBNAIL_WIDTH;
        if(!height) height = EXHIBIT_THUMBNAIL_HEIGHT;

        if(thumbnail) {
            thumbnail = Resource.getResourceUri(thumbnail, exhibitId);
        }
        else {
            // thumbnail = Resource.getImageDerivativeUrl({
            //     type: 'crop',
            //     //filename: heroImage || "no-image-available",
            //     width,
            //     height
            // });
            thumbnail = Resource.getResourceUri(PLACEHOLDER_IMAGE);
        }
    }
</script>

<div class="exhibit-preview">
    <!-- {#if exhibitPath} -->
        <a href={exhibitPath} bind:this={titleTextElement}> 
            <div class="exhibit-thumbnail">
                <img src={thumbnail || ""} alt={title} title={title} onerror="this.onerror=null;this.src='{Resource.getResourceUri(PLACEHOLDER_IMAGE)}';" /> <!-- no exhibit id -->
            </div>
        </a>
    <!-- {/if} -->
</div>

<style>
    .exhibit-preview a {
        text-decoration: none;
        font-size: 1.4em;
    }

    .exhibit-preview a,
    .exhibit-preview a:visited {
        color: white;
    }

    .exhibit-thumbnail {
        position: relative;
    }

    .exhibit-thumbnail > img {
        width: 100%;
        height: 100%;
        position: relative;
        border-radius: 5px;
    }
</style>