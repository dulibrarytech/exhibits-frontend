<script>
    import { onMount } from 'svelte';
    import { Configuration } from '../config/config';
    import {RUNTIME_ENV} from '../config/global-constants';

    /* Import test views */
    import Exhibit_test from './views/Exhibit_test.svelte';

    export let currentRoute;

    const modules = {
        Exhibit_test
    }

    let view;
    let viewName="";

    let {
        runtimeEnvironment
    } = Configuration;

    if(runtimeEnvironment != RUNTIME_ENV.DEV) {
        window.location.replace('/404');
    }

    const init = async () => {
        viewName = currentRoute.namedParams.name ?? "";
        view = modules[`${viewName}_test`];
        if(!view) console.error(`Could not find view ${viewName}`);
    }

    onMount(async () => {
        init();
    });
</script>

{#if view}:
    <h1>Test {viewName}</h1>
    <div class="test-view">
        <svelte:component this={view} />
    </div>
{:else}
    <h3>View module not found</h3>
{/if}

<style>
    .test-view {
        border-style: solid;
        border-width: 1px;
        border-color: #e5e3e1;
        margin-top: 2em;
        /* padding: 2em */
    }

    :global(.test) {
        width: 100%;
        border-style: solid;
    }
</style>