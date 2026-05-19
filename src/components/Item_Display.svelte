<script>
    import { Settings } from '../config/settings';
    import IIIF_Item from './IIIF_Item.svelte';
    import * as Logger from '../libs/logger.js';

    import { 
        getItemLinks 
    } from '../libs/exhibits_data_helpers';

    export let item = null;
    export let id = null; // dom element id
    export let args = {};
    export let template = null;

    const {
        itemDisplayLinks,
        itemDisplayLinksRepositoryItem,
    } = Settings;

    const {
        is_repo_item = false,
        repository_data = {},
        media_iiif = null,
    } = item;

    const init = () => {

        // get links for item display
        let links = getItemLinks(item, itemDisplayLinks);

        // get links for repository item if applicable and add to item links for display in viewer
        if(is_repo_item) {
            if(!repository_data) {Logger.module().error("Item is linked to repository item but repository data is missing")}
            else {
                links = links.concat( getItemLinks(repository_data, itemDisplayLinksRepositoryItem) );
            }
        }
        item.links = links;
    }

    const onLoadError = async (event) => {
        const {uuid} = item;
        Logger.module().error(`Error loading item resource: Item id: ${uuid}`);
    }

    init();
</script>

<div class="item-display">
    {#if media_iiif}
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