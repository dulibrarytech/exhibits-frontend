<script>
    import { onMount } from 'svelte';
    import Repository_Item from './Repository_Item.svelte';

    import { ITEM_TYPE, USER_ROLE } from '../config/global-constants.js';

    import {createEventDispatcher} from 'svelte';

    export let item = null;
    export let id = null; // dom element id
    export let args = {};
    export let template = null;
    export let templateStyles = {};

    let {
        role

    } = args;

    let {uuid = "", is_repo_item = false, is_published = false} = item || {};
    let isRepoItem;

    var renderItem = false;

    const dispatch = createEventDispatcher();

    const init = () => {
        if(item) {

            isRepoItem = (is_repo_item == true); // UPDATE
            renderItem = (is_published || role == USER_ROLE.ADMIN);

            try {
                // TODO find out if this should be string or object by default, remove the 'typeof' condition
                if(item?.styles && typeof item.styles == 'string') item.styles = JSON.parse(item.styles);
            }
            catch(error) {
                console.error(`Error loading item styles: ${error}; uuid: ${uuid}`);
            }

            if(templateStyles?.heading && item.styles) item.styles['heading'] = templateStyles.heading;
        }
        else {
            console.error("Null item")
        }
    }

    init();

    onMount(async () => {
        if(is_published == 0) dispatch('mount-template-item', {type: "item"});
    });
</script>

{#if renderItem}
    {#if isRepoItem}
        <Repository_Item {id} {item} {args} {template} on:click-item on:mount-template-item />
    {:else}
        <svelte:component this={template} {id} {item} {args} on:click-item on:mount-template-item />
    {/if}

{:else}
    Rendering Item... 
{/if}