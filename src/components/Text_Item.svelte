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

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class="text-item" tabindex="0" bind:this={textElement}>
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