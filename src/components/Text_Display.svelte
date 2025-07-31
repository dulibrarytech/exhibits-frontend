<script>
    import Text_Item from './Text_Item.svelte';

    export let item;
    export let title=null;
</script>

<div class="text-display">
    {#if title}
        <div class="title">{title}</div>
        <hr>
        <br>
    {/if}
    <Text_Item {item} />
</div>
