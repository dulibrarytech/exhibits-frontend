<script>
    import { createEventDispatcher } from 'svelte';
    import { Resource } from '../libs/resource';
    import { Repository } from '../libs/repository';
    import * as Logger from '../libs/logger.js';
    
    export let id = null; // dom element id
    export let item = {};
    export let args = {};
    export let template = null;

    let _repositoryData;
    let _renderTemplate;

    const dispatch = createEventDispatcher();

    const init = async () => {
        _renderTemplate = false;
        _repositoryData = item.repository_data;

        if(!_repositoryData) {
            Logger.module().error(`Error retrieving repository item data: Item id: ${item.uuid}`);
            dispatch('mount-template-item', {type: "item"});
            return false;
        }

        try {
            item.data_display = Repository.getMetadataDisplay(_repositoryData);
            _renderTemplate = true;
        }
        catch(error) {
            Logger.module().error(`Error creating repository item data display: Item id: ${item.uuid} Error: ${error}`);
            dispatch('mount-template-item', {type: "item"});
        }

        if(_renderTemplate == false) Logger.module().error(`Can't render repository item: Item id: ${item.uuid} Repository item id: ${_repositoryData.id || "null"}`);
    }

    const onLoadError = async (event) => {
        _renderTemplate = false;

        let {is_member_of_exhibit, media} = item;
        let fileFound = await Resource.verifyResourceFile({is_member_of_exhibit, media});

        if(fileFound == false) {
            Logger.module().info(`Repository item local resource file not found. Exhibit item: ${item.uuid} Repository item id: ${_repositoryData.id}`);
        }
        else {
            Logger.module().error(`Error loading repository item resource: Exhibit item: ${item.uuid} Repository item id: ${_repositoryData.id}`);
        }
    }

    init();
</script>

{#if _renderTemplate}
    <div class="repository-item">
        <svelte:component this={template} {id} {item} {args} on:click-item on:mount-template-item on:image-loaded on:load-error={onLoadError} />
    </div>

{:else}
    <!-- <div class="message">
        <p>Loading item, please wait...</p>
    </div> -->

{/if}

<style>
    .message {
        background: white;
        padding: 5px;
        border-style: solid;
        border-color: black;
        border-width: 1px;
    }

    .repository-item {
        height: 100%;
    }
</style>