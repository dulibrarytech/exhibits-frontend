<script>
    import { onMount } from 'svelte';

    import Text_Content from './Text_Content.svelte';

    export let item = {};
    export let title = null;

    var text = "";
    var textElement;

    const init = () => {
        text = item.text || "";
    }

    onMount(async () => {
        init();
    });
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
    height: 100%
}
</style>