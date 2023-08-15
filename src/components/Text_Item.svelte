<script>
    import { onMount } from 'svelte';

    import Text_Content from './Text_Content.svelte';

    export let item = {};

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
    <Text_Content content={text} />
</div>

<style>

</style>