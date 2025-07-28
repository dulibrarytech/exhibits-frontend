<script>
    import Text_Content from '../templates/partials/Text_Content.svelte';

    export let item = {};
    export let text = null;

    var textContent = "";
    var textElement;

    $: {
        textContent = text || item.text || "";
    }
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class="text-item" bind:this={textElement}>
    <Text_Content content={textContent} />
</div>

<style>
.text-item {
    height: 100%;
}

:global(.text-item p:last-child) {
    margin-bottom: 0;
}
</style>