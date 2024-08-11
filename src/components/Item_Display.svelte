<script>
    import Repository_Item from './Repository_Item.svelte';

    export let item = null;
    export let id = null; // dom element id
    export let args = {};
    export let template = null;

    let {is_repo_item = false} = item || {};

    var isRepoItem;

    const init = () => {
        if(item) {
            isRepoItem = (is_repo_item == true);
        }
        else {
            console.error("Null item")
        }
    }

    init();
</script>

{#if isRepoItem}
    <Repository_Item {id} {item} {args} {template} on:click-item on:mount-template-item />
{:else}
    <svelte:component this={template} {id} {item} {args} on:click-item on:mount-template-item />
{/if}