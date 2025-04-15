<script>
    import { onMount } from 'svelte';

    export let content = "";
    export let styles = null;

    let introductionElement;

    onMount(async () => {
        if(styles) {
            Object.assign(introductionElement.style, styles);
        }
    });
</script>

<div class="exhibit-introduction-section" bind:this={introductionElement}>
    <div class="exhibit-introduction container">
        {@html content}
    </div>
</div>

<style>
    .exhibit-introduction-section {
        height: 100%;

        /* inherit user-customizable styles from the exhibit */
        background-color: inherit;
        font-size: inherit;
        /* font-family: inherit;
        color: inherit; */
        color: var(--theme-color);
        font-family: var(--theme-font-family);
    }

    .exhibit-introduction {
        line-height: 1.45em;
        padding-top: 5.5vw;
        padding-bottom: 5.5vw;
    }

    :global(.exhibit-introduction a:hover) {
        cursor: pointer;
    }

    :global(.exhibit-introduction p) {
        margin-bottom: 1.9rem;
    }

    :global(.exhibit-introduction p:last-child) {
        margin-bottom: 0;
    }
</style>