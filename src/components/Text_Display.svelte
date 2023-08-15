<script>
    import Text_Item from './Text_Item.svelte';

    export let item;
    export let title=null;
</script>

<Text_Item {item} {title} />