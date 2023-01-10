<script>
    import Text_Content from './Text_Content.svelte';

    export let item = {};

    let text = item.text || "";

    $: {
        // TODO Remove script tags, other dangerous entities
    }
</script>

<div class="item">
    <h4>Text Item</h4>
    <Text_Content content={text} />
</div>