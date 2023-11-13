<script>
    import Item_Display from '../components/Item_Display.svelte';
    import Item_Viewer from '../templates/partials/Item_Viewer.svelte';

    export let data = {};
</script>

<div class="modal-item-display">
    <Item_Display item={data} template={Item_Viewer} />
</div>

<style>
    .modal-item-display {
        height: 100%;
    }

    :global(.modal-item-display .item-viewer .text-section) {
        height: 69%;
    } 
</style>