<script>
    import { onMount } from 'svelte';

    /* Import test modules */
    import Text_Item_test from './components/Text_Item_test.svelte';
    import Media_Item_test from './components/Media_Item_test.svelte';

    export let currentRoute;

    const modules = {
        Text_Item_test,
        Media_Item_test
    }

    let component;
    let componentName="";

    const init = async () => {
        componentName = currentRoute.namedParams.componentName ?? "";
        component = modules[`${componentName}_test`];
        if(!component) console.error(`Could not find component ${componentName}`);
    }

    onMount(async () => {
        init();
    });
</script>

{#if component}:
    <h1>Test {componentName}</h1>

    <div class="test-component">
        <svelte:component this={component} />
    </div>
{:else}
    <h3>Module not found</h3>
{/if}

<style>
    .test-component {
        border-style: solid;
        border-width: 1px;
        border-color: #e5e3e1;
        margin-top: 2em;
    }
</style>