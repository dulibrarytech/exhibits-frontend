<script>
    import Text_Content from '../templates/partials/Text_Content.svelte';

    export let item = {};
    export let title = null;

    var text = "";
    var textElement;

    $: {
        text = item.text || "";
    }
</script>

<div class="text-item" bind:this={textElement} >
    {#if title}
        <div class="title">{title}</div>
        <hr>
        <br>
    {/if}
    <Text_Content content={text} />
</div>

<style>
.text-item {
    height: 100%;
}
</style>