<script>
    import { onMount } from 'svelte';

    import Text_Content from './Text_Content.svelte';

    export let item = {};

    var text = "";
    var styles = null;
    var textElement;

    const init = () => {
        text = item.text || "";
        styles = item.styles?.item_text || null;

        // TODO Remove script tags, other dangerous entities

        if(styles) setTheme();
    }

    const setTheme = () => {
        for(let style in styles) {
            textElement.style[style] = styles[style];  
        }
    }

    onMount(async () => {
        init();
    });
</script>

<div class="text-item" bind:this={textElement} >
    <Text_Content content={text} />
</div>

<style>
    .text-item {
        text-align: left;
        height: 100%;
    }
</style>