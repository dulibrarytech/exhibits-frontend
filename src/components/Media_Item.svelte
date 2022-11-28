<script>
    import { onMount } from 'svelte';

    import { index } from '../libs/elastic-index';
    import {repository} from '../libs/repository_interface';
    
    import IIIF_Viewer from './IIIF_Viewer.svelte';
    import Image_Viewer from './Image_Viewer.svelte';
    import Audio_Player from './Audio_Player.svelte';
    import Video_Player from './Video_Player.svelte';
    import PDF_Viewer from './PDF_Viewer.svelte';
    import Embed_Iframe_Item from './Embed_Iframe_Item.svelte'; // Uses "url" value
    import Embed_Code_Item from './Embed_Code_Item.svelte'; // Uses "code" value

    export let item;

    var url;
    var mediaComponent = null;

    console.log("Media_Item item in:", item)

    const init = () => {
        let type = item.item_type || null;

        switch(type) {
            case "repo":
                mediaComponent = getRepositoryItemComponent(item);
                break;

            case "image":
                mediaComponent = Image_Viewer; // In-component Determine src url: if "image" field construct uri to storage, if "url" field, use uri provided
                break;

            case "audio":
                mediaComponent = getAudioItemComponent(item); // f(): "url"->use [Audio_Player]<audio> html element src=url; "code"->use [Embed_Code_Item]; "kaltura_id" use [Kaltura_Player]
                // url = ? Set here? Would req more logic. Or, set global in above f()
                break;

            case "video":
                mediaComponent = getVideoItemComponent(item);
                break;

            case "pdf":
                mediaComponent = PDF_Viewer;
                break;

            case "external":
                mediaComponent = Embed_Iframe_Item;
                break;
        }

        if(mediaComponent) console.log("Selected media component", mediaComponent)
        else console.error("Invalid item type, could not determine media element");
    }

    const getRepositoryItemComponent = async (item) => {
        let component = null;

        if(item.is_iiif) {
            component = IIIF_Viewer; // Builds iiif manifest url, pass into child UV viewer
        }
        else {

            try {
                let dduItem = await repository.getItem(item.url || ""); // repository.getItem() OR repository.getDatastreamUrl(repo_uuid)

                // Get item type

                // Select component (viewer/player) by type (image, large_image, audio, video, pdf)
            }
            catch(e) {
                console.error(e);
            }

            return component;
        }
    }

    const getAudioItemComponent = (item) => {

    }

    const getVideoItemComponent = (item) => {

    }

    onMount(async () => {
        init();
    });
</script>

<h5>Media Item</h5>

{#if mediaComponent}
    <svelte:component this={mediaComponent} {item} {url} />
{:else}
    <h3>Loading content...</h3>
{/if}