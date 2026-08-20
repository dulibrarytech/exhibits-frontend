<script>
    import { Settings } from '../config/settings';
    import IIIF_Item from './IIIF_Item.svelte';
    import * as Logger from '../libs/logger.js';

    import { 
        getDisplayLinks 
    } from '../libs/exhibits_data_helpers';

    export let item = null;
    export let id = null; // dom element id
    export let args = {};
    export let template = null;

    const {
        itemDisplayLinks,
        itemDisplayLinksRepositoryItem,
    } = Settings.links;

    const {
        repository_data: repositoryData = {},
        media_iiif:      mediaIIIF = null,
    } = item;

    const init = () => {

        // add external links to the item display
        let links = getDisplayLinks(item, itemDisplayLinks);
        if(repositoryData) {
            links = links.concat( getDisplayLinks(repositoryData, itemDisplayLinksRepositoryItem) );
        }
        item.external_links = links;
    }

    const onLoadError = async (event) => {
        const {uuid} = item;
        Logger.module().error(`Error loading item resource: Item id: ${uuid}`);
    }

    init();
</script>

<div class="item-display">
    {#if mediaIIIF}
        <IIIF_Item {item} {template} {args} on:click-item on:mount-template-item on:load-error={onLoadError} />
    {:else}
        <svelte:component this={template} {id} {item} {args} on:click-item on:mount-template-item on:load-error={onLoadError} />
    {/if}
</div>

<style>
    .item-display {
        width: 100%;
        height: 100%;
    }
</style>