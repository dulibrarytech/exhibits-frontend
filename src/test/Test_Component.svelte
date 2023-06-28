<script>
    import { onMount } from 'svelte';

    /* Import test modules */
    import Text_Display_test from './components/Text_Display_test.svelte';
    import Media_Display_test from './components/Media_Display_test.svelte';
    import Media_Item_test from './components/Media_Item_test.svelte';
    import Repository_Item_test from './components/Repository_Item_test.svelte';
    import IIIF_Item_test from './components/IIIF_Item_test.svelte';
    import IIIF_Viewer_test from './components/IIIF_Viewer_test.svelte';
    import Image_Viewer_test from './components/Image_Viewer_test.svelte';
    import Audio_Player_test from './components/Audio_Player_test.svelte';
    import Video_Player_test from './components/Video_Player_test.svelte';
    import Vertical_Scroll_test from './components/Vertical_Scroll_test.svelte';
    import Vertical_Timeline_test from './components/Vertical_Timeline_test.svelte';

    export let currentRoute;

    const modules = {
        Text_Display_test,
        Media_Display_test,
        Media_Item_test,
        Repository_Item_test,
        IIIF_Item_test,
        IIIF_Viewer_test,
        Image_Viewer_test,
        Audio_Player_test,
        Video_Player_test,
        Vertical_Scroll_test,
        Vertical_Timeline_test
    }

    let component;
    let componentName="";

    const init = async () => {
        componentName = currentRoute.namedParams.name ?? "";
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
        padding: 2em
    }

    :global(.test) {
        width: 100%;
        border-style: solid;
    }
</style>