<script>
    import { createEventDispatcher } from 'svelte';
    import { Resource } from '../libs/resource';
    import * as Logger from '../libs/logger.js';
    
    export let id = null; // dom element id
    export let item = {};
    export let args = {};
    export let template = null;

    let _repositoryData;
    let _renderTemplate;

    console.log("TEST repo item into RI component:", item)

    const dispatch = createEventDispatcher();

    const init = async () => {
        _renderTemplate = false;
        _repositoryData = item.repository_data;

        console.log("TEST repo item data:", _repositoryData)

        try {
            // TODO verify all repo item fields (in repository_data)

            item.data_display = getDataDisplay(_repositoryData);
            _renderTemplate = true;
        }
        catch(error) {
            Logger.module().error(`Error creating repository item data display: Item id: ${item.uuid} Error: ${error}`);
            dispatch('mount-template-item', {type: "item"});
        }

        if(_renderTemplate == false) Logger.module().error(`Can't render repository item: Item id: ${item.uuid} Repository item id: ${_repositoryData.id || "null"}`);
    }

    // get the data for the exhibit item viewer
    const getDataDisplay = (repositoryData) => {
        let display = [];

        let {
            link_to_item = "null", 
            link_to_collection = "null", 
            collection_name = "null",
            collection_id = "null",
            local_identifier = "null"

        } = repositoryData;

        // add local identifier
        display.push({
            "label": null,
            "value": local_identifier
        });

        // add link to object
        display.push({
            "label": null,
            "value": `<a href="${link_to_item}" target="_blank">Record in the University Libraries' Digital Repository</a>`
        });

        // add link to collection
        if(collection_id) {
            display.push({
                "label": null,
                "value": `<a href="${link_to_collection}" target="_blank">${collection_name || "Parent Collection"}</a>`
            });
        }

        return display;
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