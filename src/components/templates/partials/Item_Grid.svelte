<script>
    import Item_Preview from './Item_Preview.svelte';

    export let items = [];

    console.log("TEST grid items in:", items)
</script>

<div class="item-grid">
    {#each items as item}
        <div class="item">
            <Item_Preview {item} />
        </div>
    {/each}
</div>

<style>
    .item-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    .item {
        min-width: 22%;
        padding: 5px;
        width: 21%;
    }
</style>