<script>
    import Item_Display from '../components/Item_Display.svelte';
    import Item_Viewer from '../templates/partials/Item_Viewer.svelte';

    export let data = {};
</script>

<Item_Display item={data} template={Item_Viewer} />
