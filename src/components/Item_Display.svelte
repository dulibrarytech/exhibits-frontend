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

    let {item_type, is_published = false} = item;
    let itemStyles;
    let isRepoItem;
    var renderItem = false;

    const dispatch = createEventDispatcher();

    const init = () => {
        isRepoItem = (item_type == ITEM_TYPE.REPO);
        renderItem = item && (is_published || role == USER_ROLE.ADMIN);

        itemStyles = JSON.parse(item.styles || "{}");
        if(templateStyles.heading) itemStyles['heading'] = templateStyles.heading;
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