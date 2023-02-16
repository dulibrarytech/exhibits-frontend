<script>
    import Text_Content from './Text_Content.svelte';

    export let item = {};

    var text = "";

    const render = () => {
        text = item.text || "";

        // TODO Remove script tags, other dangerous entities
    }

    render();
</script>

<div class="item">
    <Text_Content content={text} />
</div>