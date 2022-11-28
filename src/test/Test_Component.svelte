<script>
    import { onMount } from 'svelte';

    import Text_Item_test from './components/Text_Item_test.svelte';
    import Media_Item_test from './components/Media_Item_test.svelte';

    // import {dataset} from './data/Text_Item.js';

    export let currentRoute;

    const modules = {
        Text_Item_test,
        Media_Item_test
    }

    console.log("Test component array", modules)

    let component;
    let componentName="";

    const init = async () => {
        componentName = currentRoute.namedParams.componentName ?? "";
        console.log("componentName arg:", componentName)
        component = modules[`${componentName}_test`];
        console.log("component:", component)
        if(!component) console.error(`Could not find component ${componentName}`);
    }

    onMount(async () => {
        init();
    });
</script>

{#if component}:
    <h1>Test {componentName}</h1>
{:else}
    <h3>Module not found</h3>
{/if}

<svelte:component this={component} />