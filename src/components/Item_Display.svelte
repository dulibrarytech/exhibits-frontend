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

    ////
    // update
    ///////
    let {uuid, item_type, is_published = false} = item; // CUR
    //let {uuid, repo_item = false, is_published = false} = item; // UPDATE
    ////
    // end update
    ///////

    let isRepoItem;
    var renderItem = false;

    const dispatch = createEventDispatcher();

    const init = () => {
        ////
        // update
        ///////
        isRepoItem = (item_type == ITEM_TYPE.REPO); // CUR
        // isRepoItem = (repo_item == true); // UPDATE
        /////
        // end update
        ///////// 

        renderItem = item && (is_published || role == USER_ROLE.ADMIN);

        try {
            item.styles = JSON.parse(item.styles || "{}");
        }
        catch(error) {
            console.error(`Error loading item styles: ${error}; uuid: ${uuid}`);
        }

        if(templateStyles.heading) item.styles['heading'] = templateStyles.heading;
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
{/if}