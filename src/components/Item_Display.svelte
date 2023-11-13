<script>
    import Repository_Item from './Repository_Item.svelte';

    import { ITEM_TYPE } from '../config/global-constants.js';

    export let item = null;
    export let id = null; // dom element id
    export let args = {};
    export let template = null;

    let {item_type} = item;

    let isRepoItem = (item_type == ITEM_TYPE.REPO);
</script>

{#if item && template}
    {#if isRepoItem}
        <Repository_Item {id} {item} {args} {template} on:click-item on:mount />
    {:else}
        <svelte:component this={template} {id} {item} {args} on:click-item on:mount />
    {/if}
{:else}
    <h5>Loading item...</h5>
{/if}